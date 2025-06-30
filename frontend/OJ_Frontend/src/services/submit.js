import api from "./api.js";

export const sendSubmission = async(submitData) => api.post('/submissions');