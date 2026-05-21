import { api } from '@/lib/api';
import { PaginatedResponse, Post } from '@/types';

export const postsService = {
  async getFeed(page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
    const { data } = await api.get(`/api/v1/feed?page=${page}&limit=${limit}`);
    return data;
  },

  async getAll(page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
    const { data } = await api.get(`/api/v1/posts?page=${page}&limit=${limit}`);
    return data;
  },

  async create(content: string, imageUrl?: string): Promise<Post> {
    const { data } = await api.post('/api/v1/posts', { content, imageUrl });
    return data;
  },

  async like(postId: string): Promise<void> {
    await api.post(`/api/v1/posts/${postId}/likes`);
  },

  async unlike(postId: string): Promise<void> {
    await api.delete(`/api/v1/posts/${postId}/likes`);
  },
};
