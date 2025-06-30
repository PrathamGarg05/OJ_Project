import api from "./api.js";

export const getProblems = () => api.get('/problems');

export const getProblemDetails = (id) =>api.get(`/problems/${id}`);