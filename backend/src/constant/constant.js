import { config } from "dotenv";
config();

export const email = process.env.EMAIL;
export const password = process.env.PASSWORD;
export const secretKey = process.env.SECRET_KEY || "lms";
export const port = process.env.PORT;
export const dbUrl = process.env.DB_URL;
export const geminiKey = process.env.GOOGLE_GEMINI_KEY;
export const geminiKey2 = process.env.GOOGLE_GEMINI_KEY_2;
