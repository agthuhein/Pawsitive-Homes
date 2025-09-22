import axios from 'axios';

const setAuthToken = axios.create({
  baseURL: 'http://localhost:4000', // backend server
});

// Attach token automatically
setAuthToken.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default setAuthToken;
