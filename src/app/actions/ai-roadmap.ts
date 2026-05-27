'use server'
import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateRoadmap(projectTitle: string) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: `Provide a 5-step roadmap for: ${projectTitle}` }],
      model: "llama-3.3-70b-versatile", 
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    // This part fixes the ESLint error by checking if 'error' is an actual Error object
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return `AI Error: ${errorMessage}`;
  }
}