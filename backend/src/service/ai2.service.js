// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiKey } from "../constant/constant.js";

const genAI = new GoogleGenerativeAI(geminiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
    You are a professional english teacher.
    You help students improve their reading skills.
    You help students improve their speaking skills.
    A student will give you topic that they find facinating. 
    And you need to give them some sort of paragraph about that topic.
    The paragraph in about 450 words.
    It should be written in such a way that it will help students improve their reading skills.
    The paragraph should be written in such a way that it will help students improve their speaking skills.
    And at the end of every paragraph, you need to give 3-5 words with their meanings revolving around the topic they choose.
    Here's the format:

    Topic: [Topic]
    Paragraph: [Paragraph]
    Words for today: [Words]

    Make sure that the reponse you give is not more then 50 words.
  `,
});

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);

  console.log(result.response.text());
  return result.response.text();
}

export default generateContent;
