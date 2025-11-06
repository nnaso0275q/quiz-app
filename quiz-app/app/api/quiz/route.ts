import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const { summary } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: summary,
    config: {
      systemInstruction: `Return the result as a valid JSON array of 5 objects, 
each containing: "question", "options" (array of 4 strings), and "correctAnswer".
No additional text, only JSON.

Summary: ${summary}`,
    },
  });

  let quizJson = response.text;

  console.log("Raw AI response:", response.text);

  if (!quizJson) {
    return NextResponse.json({ quiz: [] }); // эсвэл алдаа буцаах
  }

  // Markdown code block-ийг тайлах
  quizJson = quizJson.replace(/```json|```/gi, "").trim();
  quizJson = quizJson.replace(/\n/g, " "); // new line-г зайгаар солино

  // JSON parse хийх
  let quizArray: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[] = [];

  try {
    quizArray = JSON.parse(quizJson);
  } catch (error) {
    console.error("Failed to parse quiz JSON:", error);
    console.log("Cleaned AI response:", quizJson);
    return NextResponse.json({ quiz: [] });
  }

  // Frontend рүү массив хэлбэрээр дамжуулах
  return NextResponse.json({ quiz: quizArray });
}

//  import { GoogleGenAI } from "@google/genai";
// import { NextRequest, NextResponse } from "next/server";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export async function POST(req: NextRequest) {
//   const { summary, quiz } = await req.json();

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: summary,
//     config: {
//       systemInstruction: `Return the result as a valid JSON array of 5 objects,
// each containing: "question", "options" (array of 4 strings), and "correctAnswer".
// No additional text, only JSON.

//     Summary: ${quiz}`,
//     },
//   });
//   console.log(response.text);
//   return NextResponse.json({ message: response.text });
// }

// You are a quiz generator.
// Based on the following article summary, create 5 multiple-choice questions.
// Each question must have 4 answer options (A, B, C, D), and only one of them is correct.
// Mark the correct answer clearly.
