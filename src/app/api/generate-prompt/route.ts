import ZAI from "z-ai-web-dev-sdk";

export async function POST(request: Request) {
  try {
    const { subject, style, category, aspectRatio, quality, language } =
      await request.json();

    if (!subject || !subject.trim()) {
      return Response.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const languageInstruction =
      language === "chinese"
        ? "Write the prompt in Chinese (中文)."
        : language === "japanese"
          ? "Write the prompt in Japanese (日本語)."
          : "Write the prompt in English.";

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
- Aspect Ratio: ${aspectRatio}
- Quality: ${quality}

Generate a detailed, professional prompt that would produce an excellent image. Be specific about every visual element.`;

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

    return Response.json({ prompt: generatedPrompt });
  } catch (error) {
    console.error("Error generating prompt:", error);
    return Response.json(
      { error: "Failed to generate prompt. Please try again." },
      { status: 500 }
    );
  }
}
