
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const MODEL_NAME = 'gemini-2.5-flash-image';

export const editFashionImage = async (
  sourceBase64: string,
  prompt: string,
  referenceBase64?: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  // Refine the prompt to emphasize identity preservation
  const systemContext = `IDENTITY-PRESERVING VIRTUAL TRY-ON MODE: 
  The user wants to edit their outfit. 
  CRITICAL INSTRUCTION: You MUST keep the face, hair, skin tone, body shape, and pose of the person in the source image EXACTLY the same. 
  Only modify the clothing and accessories according to the user prompt. 
  Maintain photorealism and high resolution.`;

  const parts = [
    {
      inlineData: {
        data: sourceBase64.split(',')[1],
        mimeType: 'image/png',
      },
    },
    {
      text: `${systemContext}\n\nUser Request: ${prompt}`
    }
  ];

  if (referenceBase64) {
    parts.push({
      inlineData: {
        data: referenceBase64.split(',')[1],
        mimeType: 'image/png',
      }
    });
    parts[1].text += "\n\nUse the provided reference garment image as the primary style source for the new outfit.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
    });

    let resultImageBase64 = '';
    
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          resultImageBase64 = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!resultImageBase64) {
      throw new Error("No image data returned from Gemini.");
    }

    return resultImageBase64;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
