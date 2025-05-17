import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10_000,
});

httpClient.interceptors.request.use(cfg => {
  const token = localStorage.getItem('jwtToken');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

httpClient.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err);
  },
);

export default httpClient;