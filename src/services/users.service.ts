import { api } from '@/lib/api';
import { User, PaginatedResponse, Post } from '@/types';

export const usersService = {
  async getMe(): Promise<User> {
    const { data } = await api.get('/api/v1/auth/me');
    return data;
  },

  async getById(id: string): Promise<User> {
    const { data } = await api.get(`/api/v1/users/${id}`);
    return data;
  },

  async getPostsByUser(userId: string, page = 1, limit = 10) {
    const { data } = await api.get(
      `/api/v1/posts/user/${userId}?page=${page}&limit=${limit}`,
    );
    return data; // retorna { data: [], meta: {} }
  },

  async getFollowers(userId: string): Promise<any[]> {
    const { data } = await api.get(`/api/v1/users/${userId}/followers`);
    return data;
  },

  async getFollowing(userId: string): Promise<any[]> {
    const { data } = await api.get(`/api/v1/users/${userId}/following`);
    return data;
  },

  async follow(userId: string): Promise<void> {
    await api.post(`/api/v1/users/${userId}/follow`);
  },

  async unfollow(userId: string): Promise<void> {
    await api.delete(`/api/v1/users/${userId}/unfollow`);
  },

  async update(data: Partial<User>): Promise<User> {
    const { data: updated } = await api.patch(`/api/v1/users/${data.id}`, data);
    return updated;
  },
};
