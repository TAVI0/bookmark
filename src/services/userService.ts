import httpClient from '../lib/httpClient';

export const userService = {
  /** GET /user/all */
  getAll: () => httpClient.get('/user/all').then(r => r.data),

  /** GET /user/id/{id} */
  getById: (id: number) => httpClient.get(`/user/id/${id}`).then(r => r.data),

  /** GET /user/username/{username} */
  getByUsername: (username: string) =>
    httpClient.get(`/user/username/${username}`).then(r => r.data),

  /** GET /user/userexist/{username} */
  exists: (username: string) =>
    httpClient.get(`/user/userexist/${username}`).then(r => r.data),

  /** POST /user/save */
  save: (dto: any) => httpClient.post('/user/save', dto).then(r => r.data),

  /** PUT /user/update */
  update: (dto: any) => httpClient.put('/user/update', dto).then(r => r.data),
};
