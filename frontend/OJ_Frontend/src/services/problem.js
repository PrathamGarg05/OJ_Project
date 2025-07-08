import api from "./api.js";

export const getProblems = () => api.get('/problems');

export const getProblemDetails = (id) =>api.get(`/problems/${id}`);

export const getSampleTestCase = (id) => api.get(`/problems/${id}/testcases/sample`);

export const getHint = (id) => api.get(`/problems/${id}/hint`);

export const getBoilerplate = (id, language) => api.get(`/problems/${id}/boilerplate/${language}`);

export const getAiReview = (id, code) => api.post(`/problems/${id}/ai-review`, {code});