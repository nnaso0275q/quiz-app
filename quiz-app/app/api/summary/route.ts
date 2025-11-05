import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const { articlePromt, summary } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: articlePromt,
    config: {
      systemInstruction: ` You have to make a short summary of the submitted content within 5 sentences. ${summary}`,
    },
  });
  console.log(response.text);
  return NextResponse.json({ message: response.text });
}

// import { GoogleGenAI } from "@google/genai";
// import { NextRequest, NextResponse } from "next/server";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export async function POST(req: NextRequest) {
//   try {
//     const { inputText } = await req.json();

//     if (!inputText) {
//       return NextResponse.json(
//         { error: "inputText is required" },
//         { status: 400 }
//       );
//     }

//     const response = await ai.models.generateContent({
//       model: "meta-llama/Llama-3.1-8B-Instruct",
//       content: `Extract only the ingredients from this food description and return them as a simple comma-separated list without any explanation.
// Food description: ${inputText}
// Ingredients:`,

//     });

//     return NextResponse.json({
//       text: generatedText.trim(),
//     });
//   } catch (error) {
//     console.log("Error generating text:", error);
//     return NextResponse.json(
//       { error: "Failed to generate text" },
//       { status: 500 }
//     );
//   }
// }
