import api from "./api.js";

export const login = (loginData) => api.post('/users/login', loginData);