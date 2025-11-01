// src/services/api.js
import axios from 'axios';
import { getAuthToken } from './auth';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

instance.interceptors.request.use(cfg => {
  const t = getAuthToken();
  if (t) cfg.headers['Authorization'] = `Bearer ${t}`;
  return cfg;
});

export default instance;
