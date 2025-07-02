import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1' ;
export const MONGO_URL = process.env.MONGO_URL;
export const API_GATEWAY = process.env.API_GATEWAY;