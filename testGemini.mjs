import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const result = await model.generateContent({
  contents: [{ role: "user", parts: [{ text: "Hello from Gemini 2.0!" }] }],
});

console.log(result.response.text());
