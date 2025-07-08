import { GEMINI_API_KEY, USER_SERVICE_URL } from "../config/serverConfig.js";
import * as ProblemRepo from "../repositories/problemRepo.js";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

export const getHint = async(problemId, userId) => {
    const problem = await ProblemRepo.getProblemById(problemId);
    const ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY
    });
    if(!problem) {
        throw new Error("Problem not found");
    }
    try{
        const user = await axios.patch(`${USER_SERVICE_URL}/api/v1/users/${userId}/hint`);
        console.log(user);
        if(user.status === 429){
            throw {
                message: "Daily hint limit reached",
                status: StatusCodes.TOO_MANY_REQUESTS
            };
        }
        
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `
            You are a helpful assistant that can generate hints for a given problem.
            The problem statement is: ${problem.description}
            Only guide, don't give the full solution.
            Don't give any other text, just the hint.
            Provide very short hint, like in leetcode, atmost 15 words.
            you can probably hint about the algorithm or technique to use.
            `,
          });
          return response.text;
    } catch(error){
        throw error;
    }
};

export const getBoilerplate = async(problemId, language) => {
    const problem = await ProblemRepo.getProblemById(problemId);
    if(!problem) {
        throw new Error("Problem not found");
    }
    const ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY
    });
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `
            You are a helpful assistant that can generate boilerplate(header files and main function) for a given problem.
            The problem statement is: ${problem.description}
            The language is: ${language}
            Give only header files, and main function with input format as given in the problem statement.
            Dont give the solution, just the boilerplate.
            like in cpp, give only the header files and main function, dont give the complete solution.
            similarily in java, give only the header files and main function, dont give the complete solution.
            similarily in python, give only the header files and main function, dont give the complete solution.
            `,
          });
          return response.text;
    } catch(error){
        throw error;
    }
};      

export const getAiReview = async(problemId, code) => {
    const problem = await ProblemRepo.getProblemById(problemId);
    if(!problem) {
        throw new Error("Problem not found");
    }
    const ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY
    });
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `
            You are a helpful assistant that can review a given code for a given problem.
            The problem statement is: ${problem.description}
            The code is: ${code}
            Give a crisp review of the code, and suggest improvements.
            Don't give the solution, just a crisp review.
            Don't give any other text, just the review.
            give the review in markdown format.
            `,
        });
        return response.text;
    } catch(error){
        throw error;
    }
}