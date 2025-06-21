import api from "./api.js";

export const login = (loginData) => api.post('/users/login', loginData);

export const register = (registerData) => api.post('/users/register', registerData);