import api from "./api.js";

export const sendSubmission = (submitData) => api.post('/submissions', submitData);

export const getSubmissions = (userId, problemId) => api.get(`/submissions/${userId}/${problemId}`);

export const runProblem = (runData) => api.post('/run', runData);

export const getUserStats = (userId) => api.get(`/submissions/stats/${userId}`);