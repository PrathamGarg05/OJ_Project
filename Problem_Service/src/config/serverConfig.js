import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGO_URL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const API_GATEWAY = process.env.API_GATEWAY;
export const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const USER_SERVICE_URL = process.env.USER_SERVICE_URL;