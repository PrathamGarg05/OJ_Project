import api from "./api.js";

export const login = (loginData) => api.post('/users/login', loginData);

export const register = (registerData) => api.post('/users/register', registerData);

export const myProfile = () => api.get('/users/me');

export const logout = () => api.post('/users/logout');

export const verifyEmail = (token) => api.post(`/users/verify-email?token=${token}`);