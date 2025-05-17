import httpClient from '../lib/httpClient';

export const bookService = {
  /** GET /books/all */
  getAll: () => httpClient.get('/books/all').then(r => r.data),

  /** GET /books/{id} */
  getById: (id: number) => httpClient.get(`/books/${id}`).then(r => r.data),

  /** POST /books/save */
  save: (dto: any) => httpClient.post('/books/save', dto).then(r => r.data),

  /** DELETE /books/delete/{id} */
  remove: (id: number) => httpClient.delete(`/books/delete/${id}`).then(r => r.data),
};
