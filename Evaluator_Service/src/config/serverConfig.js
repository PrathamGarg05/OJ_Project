import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3002;
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1' ;
export const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;
export const SOCKET_SERVICE = process.env.SOCKET_SERVICE;
export const PROBLEM_URL = process.env.PROBLEM_URL;
