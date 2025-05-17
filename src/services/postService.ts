import httpClient from '../lib/httpClient';

export const postService = {
  /** GET /post/all */
  getAll: () => httpClient.get('/post/all').then(r => r.data),

  /** GET /post/{id} */
  getById: (id: number) => httpClient.get(`/post/${id}`).then(r => r.data),

  /** GET /post/username/{username} */
  getByUsername: (username: string) =>
    httpClient.get(`/post/username/${username}`).then(r => r.data),

  /** GET /post/userid/{id} */
  getByUserId: (userId: number) =>
    httpClient.get(`/post/userid/${userId}`).then(r => r.data),

  /** GET /post/{username}/{bookName}/{num} */
  getByPath: (username: string, bookName: string, num: number) =>
    httpClient.get(`/post/${username}/${bookName}/${num}`).then(r => r.data),

  /** POST /post/save */
  save: (dto: any) => httpClient.post('/post/save', dto).then(r => r.data),

  /** DELETE /post/delete/{id} */
  remove: (id: number) => httpClient.delete(`/post/delete/${id}`).then(r => r.data),
};
