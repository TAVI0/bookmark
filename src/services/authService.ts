import httpClient from '../lib/httpClient';

export const authService = {
  /** POST /auth/login */
  login: (credentials: { username: string; password: string }) =>
    httpClient.post('/auth/login', credentials).then(r => r.data),

  /** GET /auth/getUserByJWT/{jwt} */
  getUserByJWT: (jwt: string) =>
    httpClient.get(`/auth/getUserByJWT/${jwt}`).then(r => r.data),
};
