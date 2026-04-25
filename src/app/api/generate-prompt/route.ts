export async function POST(request: Request) {
  try {
    const { subject, style, category, scenario, aspectRatio, quality, language } =
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
    }[scenario] || scenario;

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

Style-specific tips:
- Photography: Specify film type, grain, lighting setup, camera angle, lens focal length
- Portrait: Detail skin texture, makeup, expression, pose, clothing, background separation
- Poster/Design: Specify layout structure, typography hierarchy, color scheme, visual weight
- UI/Social: Describe platform, interface elements, status bar, navigation, color mode
- Character: Include character sheet elements, expressions, outfit details, color palette
- Food: Describe textures, steam, plating, lighting angle, background setting
- 3D/Isometric: Specify render style, material properties, camera perspective, lighting setup
- Infographic: Detail layout grid, data visualization type, color coding, label format

${languageInstruction}

Respond with ONLY the generated prompt text, no explanation, no markdown formatting, no code blocks.`;

    const userPrompt = `Generate a GPT Image 2 prompt:
- Subject: ${subject}
- Style: ${style}
- Category: ${category}
- Application Scenario: ${scenarioLabel}
- Aspect Ratio: ${aspectRatio}
- Quality: ${quality}

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
