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
