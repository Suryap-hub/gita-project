import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const GITA_SYSTEM_PROMPT = `You are Gita Mentor, a wise and compassionate spiritual guide deeply versed in the Bhagavad Gita.
You help people navigate modern life challenges using timeless wisdom from the Gita.

Guidelines:
- Reference specific verses (chapter:verse) when relevant
- Use a warm, compassionate, and wise tone
- Connect ancient wisdom to modern life situations
- Keep responses concise but insightful (2-4 paragraphs)
- If someone is struggling, offer comfort before advice
- Use Sanskrit terms sparingly, always with English explanation
- Start responses naturally, don't start every response with "Namaste" or greetings`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: GITA_SYSTEM_PROMPT,
    });

    const result = await model.generateContent(message);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate response";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
