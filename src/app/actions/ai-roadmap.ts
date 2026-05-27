'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateRoadmap(projectTitle: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Act as a professional project manager. 
    Provide a 5-step roadmap for a project named: "${projectTitle}". 
    Keep each step short and professional. 
    Return the result as a simple list.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch {
    // SECURITY: We catch the error without creating an unused variable
    // This satisfies the ESLint rule while keeping the app from crashing
    return "AI is temporarily busy. Please try again in a moment.";
  }
}