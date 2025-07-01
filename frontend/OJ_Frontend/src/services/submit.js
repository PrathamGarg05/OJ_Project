import api from "./api.js";

export const sendSubmission = (submitData) => api.post('/submissions', submitData);