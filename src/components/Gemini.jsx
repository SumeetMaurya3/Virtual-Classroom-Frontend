import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// Replace with your actual API key

const getGeminiSummary = async (message) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Define a structured prompt
    const prompt = `Summarize this in under 100 words and explain simply, don't use any asterasks only use comma and fullstops in the sentence, if its a question answer in simple language under 100 words short paragraph, if its a random sentence explain the sentence like a teacher would under 150 words, don't here is the message :- "${message}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return "Error generating summary.";
  }
};

export default getGeminiSummary;
