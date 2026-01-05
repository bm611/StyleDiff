export const editFashionImage = async (
  sourceBase64: string,
  prompt: string,
  referenceBase64?: string
): Promise<string> => {
  const apiKey = (process.env.TOGETHER_API_KEY as string) || (import.meta.env.VITE_TOGETHER_API_KEY as string);

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

  // Construct reference_images array
  // Index 0: Base Image (Person)
  // Index 1: Reference Image (Style) - if exists
  const reference_images = [sourceBase64];
  if (referenceBase64) {
    reference_images.push(referenceBase64);
  }

  let userInstruction = "";
  if (referenceBase64) {
      // User specific instruction: use the clothing style from index 1 into index 0
      userInstruction = `Transfer the clothing style from image 2 onto the person in image 1. ${prompt}`;
  } else {
      userInstruction = `The person from image 1. ${prompt}`;
  }

  const finalPrompt = `${systemContext}\n\n${userInstruction}`;

  try {
    const payload: any = {
      model: "black-forest-labs/FLUX.2-pro",
      prompt: finalPrompt,
      width: 1024,
      height: 768,
      reference_images: reference_images,
      response_format: "b64_json"
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
      if (data.data[0].b64_json) {
        return `data:image/png;base64,${data.data[0].b64_json}`;
      }
      if (data.data[0].url) {
        return data.data[0].url;
      }
    }

    throw new Error("No image data returned from Together AI.");
  } catch (error) {
    console.error("Together AI image generation failed:", error);
    throw error;
  }
};
