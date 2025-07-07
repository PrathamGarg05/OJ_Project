import api from "./api.js";

export const getProblems = () => api.get('/problems');

export const getProblemDetails = (id) =>api.get(`/problems/${id}`);

export const getSampleTestCase = (id) => api.get(`/problems/${id}/testcases/sample`);

export const getHint = (id) => api.get(`/problems/${id}/hint`);