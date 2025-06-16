import dotenv from "dotenv";
dotenv.config();

export const allowedOrigin = process.env.FRONT_API_URL.replace(/\/$/, "");
