import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
export const PROBLEM_SERVICE_URL = process.env.PROBLEM_SERVICE_URL;