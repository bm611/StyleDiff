export const editFashionImage = async (
  sourceBase64: string,
  prompt: string,
  referenceBase64?: string
): Promise<string> => {
  const apiKey = (process.env.TOGETHER_API_KEY as string);

  if (!apiKey) {
    console.warn("Together API Key is missing. Make sure TOGETHER_API_KEY is set.");
    throw new Error("Together API Key is missing.");
  }

  // Refine the prompt to emphasize identity preservation
  const systemContext = `IDENTITY-PRESERVING VIRTUAL TRY-ON MODE: 
  The user wants to edit their outfit. 
  CRITICAL INSTRUCTION: You MUST keep the face, hair, skin tone, body shape, and pose of the person in the source image EXACTLY the same. 
  Only modify the clothing and accessories according to the user prompt. 
  Maintain photorealism and high resolution.`;

  const finalPrompt = `${systemContext}\n\nUser Request: ${prompt}${referenceBase64 ? "\n\nNote: Please refer to the style of the garments in the prompt description for the new outfit." : ""}`;

  try {
    const payload: any = {
      model: "black-forest-labs/FLUX.2-pro",
      prompt: finalPrompt,
      image_url: sourceBase64,
      width: 1024,
      height: 768,
      n: 1,
      response_format: "url"
    };

    const response = await fetch("https://api.together.xyz/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Together AI API error:", response.status, errorData);
      throw new Error(`Together AI API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    if (data.data && data.data[0]) {
      if (data.data[0].url) {
        return data.data[0].url;
      }
      if (data.data[0].b64_json) {
        return `data:image/png;base64,${data.data[0].b64_json}`;
      }
    }

    throw new Error("No image data returned from Together AI.");
  } catch (error) {
    console.error("Together AI image generation failed:", error);
    throw error;
  }
};
