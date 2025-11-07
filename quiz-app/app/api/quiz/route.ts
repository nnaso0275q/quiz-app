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
    return NextResponse.json({ quiz: [] });
  }

  quizJson = quizJson.replace(/```json|```/gi, "").trim();
  quizJson = quizJson.replace(/\n/g, " ");

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

  return NextResponse.json({ quiz: quizArray });
}
