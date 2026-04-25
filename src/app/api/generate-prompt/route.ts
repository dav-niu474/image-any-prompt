export async function POST(request: Request) {
  try {
    const { subject, style, category, scenario, aspectRatio, quality, language, scenarioParams } =
      await request.json();

    if (!subject || !subject.trim()) {
      return Response.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    const languageInstruction =
      language === "chinese"
        ? "Write the prompt in Chinese (中文)."
        : language === "japanese"
          ? "Write the prompt in Japanese (日本語)."
          : "Write the prompt in English.";

    const scenarioLabel = {
      "ecommerce": "E-commerce Product Photography",
      "social-media": "Social Media Content",
      "brand-design": "Brand Identity & Design",
      "advertising": "Advertising & Marketing",
      "education": "Educational & Infographic",
      "game-dev": "Game Development Assets",
      "interior-arch": "Interior & Architecture",
      "fashion-editorial": "Fashion Editorial",
      "food-beverage": "Food & Beverage Photography",
      "personal-art": "Personal Creative Art",
      "publishing": "Publishing & Editorial",
      "film-media": "Film & Media Production",
      "ui-ux": "UI/UX Design",
      "novel-cover": "Novel Cover Design",
    }[scenario] || scenario;

    // ─── Build scenario-specific instruction block ───
    const scenarioSpecificTips = buildScenarioTips(scenario, scenarioParams || {});

    const systemPrompt = `You are an expert GPT Image 2 prompt engineer. Based on the user's input, generate a detailed, high-quality prompt for GPT Image 2 image generation.

Key principles for great GPT Image 2 prompts:
- Be extremely specific about visual details (lighting, composition, colors, textures, materials)
- Include style references and aesthetic descriptors (e.g., "cinematic editorial style", "hyper-realistic commercial photography")
- Specify camera angles, lens types for photography (e.g., "35mm film photography", "85mm portrait lens", "isometric view")
- Include precise lighting descriptions (e.g., "soft butterfly lighting", "harsh direct flash", "golden hour backlighting")
- Mention aspect ratio and quality parameters (e.g., "3:4 aspect ratio", "8K resolution", "high detail")
- For text/typography, specify exact text content and font style
- For UI designs, describe specific interface elements in detail with exact labels
- Include negative constraints when needed (e.g., "avoid messy clutter", "no watermark", "no blurry textures")
- Use professional terminology (e.g., "knolling composition", "orthographic view", "tilt-shift effect")
- Describe color palettes precisely (e.g., "Forest Green dominant, Matte White, Kraft Paper Brown")

Application scenario: ${scenarioLabel}
- Tailor the prompt specifically for this use case
- Consider the target audience and platform for this scenario
- Include elements that make the output suitable for this application

${scenarioSpecificTips}

Style-specific tips:
- Photography: Specify film type, grain, lighting setup, camera angle, lens focal length
- Illustration: Detail art style, line work, color palette, composition, medium
- 3D Render: Specify render engine look, material properties, camera perspective, lighting setup, reflections
- Anime: Detail anime sub-genre, character proportions, color approach, background style
- Sketch: Specify medium (pencil/charcoal/ink), line weight, shading technique, paper texture
- Watercolor: Describe wash technique, color bleeding, paper grain, wet-on-wet vs dry brush
- Pixel Art: Specify resolution, color depth, dithering technique, retro platform reference
- Cyberpunk: Detail neon color scheme, holographic elements, rain effects, urban decay
- Chinese Ink: Describe brush stroke style, ink density, negative space, mounting format
- Minimalist: Specify negative space ratio, limited color count, geometric precision
- Poster/Typography: Detail layout grid, font hierarchy, visual weight, bleed area
- UI Design: Describe interface components, interaction states, spacing system, color tokens

${languageInstruction}

Respond with ONLY the generated prompt text, no explanation, no markdown formatting, no code blocks.`;

    const userPrompt = `Generate a GPT Image 2 prompt:
- Subject: ${subject}
- Style: ${style}
- Category: ${category}
- Application Scenario: ${scenarioLabel}
- Aspect Ratio: ${aspectRatio}
- Quality: ${quality}
${Object.keys(scenarioParams || {}).length > 0 ? `- Scenario Parameters: ${JSON.stringify(scenarioParams)}` : ""}

Generate a detailed, professional prompt that would produce an excellent image for the specified application scenario. Be specific about every visual element.`;

    // Use NVIDIA API with fallback model chain
    const nvidiaApiKey = process.env.NVIDIA_API_KEY;

    // Model priority chain - try models in order until one works
    const nvidiaModels = [
      { id: "meta/llama-3.3-70b-instruct", label: "NVIDIA Llama 3.3 70B" },
      { id: "nvidia/llama-3.1-nemotron-70b-instruct", label: "NVIDIA Nemotron 70B" },
      { id: "deepseek-ai/deepseek-v4-flash", label: "NVIDIA DeepSeek V4 Flash" },
    ];

    if (nvidiaApiKey) {
      for (const model of nvidiaModels) {
        try {
          const nvidiaResponse = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${nvidiaApiKey}`,
            },
            body: JSON.stringify({
              model: model.id,
              messages: [
                { role: "user", content: `${systemPrompt}\n\n${userPrompt}` },
              ],
              max_tokens: 1500,
              temperature: 0.8,
              top_p: 0.9,
            }),
          });

          if (nvidiaResponse.ok) {
            const data = await nvidiaResponse.json();
            const generatedPrompt = data.choices?.[0]?.message?.content;

            if (generatedPrompt) {
              return Response.json({
                prompt: generatedPrompt.trim(),
                model: model.label,
              });
            }
          }

          console.warn(`NVIDIA model ${model.id} failed with status ${nvidiaResponse.status}`);
        } catch (modelError) {
          console.warn(`NVIDIA model ${model.id} error:`, modelError);
        }
      }

      // All NVIDIA models failed, fall through to fallback
      console.warn("All NVIDIA models failed, using fallback");
    }

    // Fallback: Use z-ai-web-dev-sdk
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const result = await zai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1500,
      temperature: 0.8,
    });

    const generatedPrompt = result.choices[0].message.content;

    return Response.json({
      prompt: generatedPrompt,
      model: "GPT-4o Mini (Fallback)",
    });
  } catch (error) {
    console.error("Error generating prompt:", error);
    return Response.json(
      { error: "Failed to generate prompt. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Build scenario-specific prompt engineering tips based on the scenario
 * and its associated parameters.
 */
function buildScenarioTips(scenario: string, params: Record<string, string>): string {
  const tips: string[] = [];

  switch (scenario) {
    case "novel-cover": {
      tips.push("Novel Cover Design specific requirements:");
      tips.push("- The cover must have a strong visual focal point that immediately conveys the genre and mood");
      tips.push("- Leave appropriate negative space for the novel title and author name (typically top 15-25%)");
      tips.push("- Ensure the composition works as a thumbnail (clear silhouette, strong contrast, readable at small size)");

      const genre = params.novelGenre;
      if (genre) {
        const genreTips: Record<string, string> = {
          "xianxia": "Xianxia/Fantasy: Epic atmospheric scenes with floating elements, divine light, mythical creatures, ancient architecture, or a lone powerful figure. Color palette: deep blues, golds, emerald greens, crimson reds. Chinese fantasy painting with dramatic volumetric lighting",
          "romance-ancient": "Ancient Romance (古言): Elegant character portrait in historical hanfu, cherry blossoms, misty gardens, soft-focus aesthetic. Color palette: soft rose pink, warm cream, pale gold, misty jade green, lavender",
          "romance-modern": "Modern Romance (现言): Warm intimate scene, contemporary setting, soft lighting, dreamy bokeh. Color palette: warm cream, soft caramel, gentle gold, blush pink",
          "sci-fi": "Sci-Fi: Futuristic cityscapes, spacecraft, cyberpunk elements, holographic interfaces. Color palette: neon cyan, electric blue, deep purple, metallic silver",
          "mystery": "Mystery/Suspense: Moody dark atmosphere, shadows, silhouettes, rain, fog, solitary figure in dim light. Color palette: dark navy, charcoal, blood red accent, muted gold",
          "wuxia": "Wuxia: Bamboo forests, sword duels, ink wash aesthetics, martial arts action. Color palette: ink black, bamboo green-grey, rain silver, crimson accent",
          "apocalypse": "Apocalypse/Post-apocalyptic: Ruined cityscapes, overgrown vegetation, survival gear, golden-hour dust. Color palette: warm amber dust, desaturated olive, rust orange",
          "system-litrpg": "System/LitRPG: Holographic game panels, stat bars, level-up effects, real-world + game overlay. Color palette: neon cyan interface, golden particles, dark reality",
          "infinite-loop": "Infinite Loop: Reality fracturing, dimension breaking, glitch effects, boundary between worlds. Color palette: vivid rift colors, black void, white data fragments",
          "historical": "Historical/Military: Epic battle scenes, ancient warfare, mounted generals, war banners. Color palette: deep crimson, burnished gold, iron dark, amber sunset",
          "rebirth": "Rebirth/Time-travel: Split composition, mirror/reflection, dual timelines, past vs future. Color palette: cold blue-black past vs warm golden present",
          "light-novel": "Light Novel: Anime illustration, vibrant colors, dynamic poses, cute mascot, school+fantasy blend. Color palette: sky blue, cherry blossom pink, magical gold",
          "supernatural": "Supernatural Horror: Eerie abandoned temples, paper dolls, red lantern glow, unsettling atmosphere. Color palette: blood red glow, yellowed paper, absolute black",
          "farming": "Farming/Slice-of-life: Idyllic countryside, golden hour, vegetable gardens, thatched farmhouses. Color palette: warm golden green, earth brown, sunset gold",
          "political": "Political/Power: Still-life metaphor, chess pieces, tea sets, official documents, luxury textures. Color palette: rich mahogany, red accents, gold pen, deep burgundy",
          "esports": "Esports: Gaming setup, screen illumination, holographic game characters, arena backdrop. Color palette: dark arena, neon blue screen glow, team colors",
          "rules-horror": "Rules Horror: Aged paper with handwritten rules, red ink, scribbled-out lines, burnt edges, minimalist dread. Color palette: near-black background, aged yellow, blood red ink",
        };
        if (genreTips[genre]) tips.push(`- Genre style: ${genreTips[genre]}`);
      }

      const platform = params.platform;
      if (platform) {
        const platformTips: Record<string, string> = {
          "qidian": "Platform: Qidian (起点中文网) — favors bold, high-impact fantasy art with strong visual hooks. Title in bold calligraphic or impact font. Maximum readability as thumbnail",
          "jinjiang": "Platform: Jinjiang (晋江文学城) — favors elegant, dreamy, romantic aesthetics. Title in elegant flowing serif or calligraphy. Softer, more refined atmosphere",
          "fanqie": "Platform: Fanqie (番茄小说) — favors attention-grabbing, high-contrast designs that pop in a scrolling feed. Bold title, vivid colors, clear focal point",
          "general": "Platform: General — balanced design suitable for multiple platforms",
        };
        if (platformTips[platform]) tips.push(`- ${platformTips[platform]}`);
      }

      const composition = params.composition;
      if (composition) {
        const compTips: Record<string, string> = {
          "character-focus": "Composition: Character-focused — central character portrait, detailed outfit/face, background supports the character mood",
          "scene-focus": "Composition: Scene-focused — sweeping landscape or environment, character as small element, atmosphere drives the mood",
          "concept-design": "Composition: Concept-driven — symbolic objects, abstract visual metaphor, surreal elements that represent the story theme",
          "typography-focus": "Composition: Typography-led — large artistic title treatment, minimal imagery, bold font as the hero element, decorative accents",
        };
        if (compTips[composition]) tips.push(`- ${compTips[composition]}`);
      }

      tips.push("- Aspect ratio should typically be 2:3 or 3:4 for book covers (vertical portrait orientation)");
      break;
    }

    case "ecommerce": {
      tips.push("E-commerce Product Photography specific requirements:");

      const productType = params.productType;
      if (productType) {
        const ptTips: Record<string, string> = {
          "food-drink": "Food & Drink: Emphasize appetite appeal, freshness, condensation, steam, vibrant colors. Show texture and ingredient details",
          "beauty": "Beauty & Skincare: Focus on product texture, creaminess, translucency, luxury feel. Emphasize packaging details and premium materials",
          "electronics": "Electronics: Highlight sleek design, screen quality, ports, material finish. Use dramatic lighting to show surface quality",
          "clothing": "Clothing & Accessories: Show fabric drape, texture, stitching details. Emphasize fit and styling",
          "home": "Home & Living: Show product in context, emphasize material quality, craftsmanship, and lifestyle fit",
          "jewelry": "Jewelry: Macro-level detail, specular highlights, stone clarity, metal reflections. Use dramatic focused lighting",
        };
        if (ptTips[productType]) tips.push(`- ${ptTips[productType]}`);
      }

      const shootingStyle = params.shootingStyle;
      if (shootingStyle) {
        const ssTips: Record<string, string> = {
          "white-bg": "White background: Clean pure white backdrop, soft even lighting, no shadows on background, product is hero",
          "lifestyle": "Lifestyle scene: Product in real-life context, natural environment, warm ambient lighting, aspirational setting",
          "creative": "Creative composite: Dramatic lighting, floating elements, explosive particles, dynamic composition, surreal product presentation",
          "flat-lay": "Flat lay / Knolling: Top-down view, organized arrangement, matching accessories, consistent spacing, satisfying grid layout",
        };
        if (ssTips[shootingStyle]) tips.push(`- ${ssTips[shootingStyle]}`);
      }

      const background = params.background;
      if (background) {
        const bgTips: Record<string, string> = {
          "solid-color": "Solid color background: Clean single-color backdrop that complements product, gradient optional",
          "life-scene": "Life scene: Natural home/lifestyle environment, bokeh background, warm atmosphere",
          "studio-minimal": "Studio minimal: Simple studio setup, neutral tones, minimal props, professional lighting",
          "outdoor-natural": "Outdoor natural: Natural daylight, garden/urban setting, environmental context",
        };
        if (bgTips[background]) tips.push(`- ${bgTips[background]}`);
      }

      tips.push("- Product must be the clear focal point with sharp focus");
      tips.push("- Include accurate product details (labels, textures, materials)");
      break;
    }

    case "social-media": {
      tips.push("Social Media Content specific requirements:");

      const platform = params.platform;
      if (platform) {
        const pTips: Record<string, string> = {
          "xiaohongshu": "Xiaohongshu (小红书): Aesthetic, warm tones, lifestyle feel, slightly overexposed bright look, soft colors, delicate compositions. 3:4 ratio preferred",
          "douyin": "Douyin (抖音): Bold, eye-catching, high contrast, dynamic, works in vertical format. 9:16 ratio",
          "weibo": "Weibo: Versatile, can be editorial or casual, supports longer text overlay. Clear subject matter",
          "instagram": "Instagram: Clean aesthetic, curated feel, consistent color grading, aspirational quality. 1:1 or 4:5 ratio",
          "wechat": "WeChat Moments: Personal, authentic feel, not overly edited, warm and relatable. Various ratios",
        };
        if (pTips[platform]) tips.push(`- ${pTips[platform]}`);
      }

      const contentType = params.contentType;
      if (contentType) {
        const ctTips: Record<string, string> = {
          "selfie-portrait": "Selfie/Portrait: Flattering angle, natural skin texture, soft lighting, authentic expression",
          "lifestyle": "Lifestyle: Everyday moment, candid feel, warm atmosphere, personal story",
          "food-travel": "Food & Travel: Location atmosphere, local details, inviting food presentation, sense of place",
          "ootd": "OOTD: Full outfit visible, stylish pose, interesting background, fashion-forward composition",
          "scenery": "Scenery: Dramatic landscape, golden hour lighting, depth and scale, immersive atmosphere",
        };
        if (ctTips[contentType]) tips.push(`- ${ctTips[contentType]}`);
      }

      const mood = params.mood;
      if (mood) {
        const moodTips: Record<string, string> = {
          "fresh-natural": "Fresh & Natural: Bright, airy, light tones, natural light, clean composition, gentle colors",
          "retro-vintage": "Retro & Vintage: Film grain, warm tones, faded colors, nostalgic atmosphere, analog texture",
          "trendy-cool": "Trendy & Cool: High contrast, bold colors, edgy composition, modern aesthetic, striking visuals",
          "warm-healing": "Warm & Healing: Soft warm light, cozy atmosphere, gentle colors, comforting mood, intimate feel",
        };
        if (moodTips[mood]) tips.push(`- ${moodTips[mood]}`);
      }
      break;
    }

    case "brand-design":
    case "advertising":
    case "education":
    case "game-dev":
    case "interior-arch":
    case "fashion-editorial":
    case "food-beverage":
    case "personal-art":
    case "publishing":
    case "film-media":
    case "ui-ux": {
      tips.push(`${scenarioLabel} specific requirements:`);
      // Generic handling: include all selected params as context
      Object.entries(params).forEach(([key, value]) => {
        tips.push(`- ${key}: ${value}`);
      });
      break;
    }
  }

  return tips.length > 0 ? tips.join("\n") : "";
}
