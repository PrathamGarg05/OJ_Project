import api from "./api.js";

export const getProblems = () => api.get('/problems');