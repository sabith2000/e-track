import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);

export const startCycle = (data) => API.post('/cycles/start', data);
export const closeCycle = (data) => API.post('/cycles/close', data);
export const getCycles = () => API.get('/cycles');

export const addReading = (data) => API.post('/readings', data);
export const getReadings = (cycleId) => API.get(`/readings/${cycleId}`);