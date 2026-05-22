import { api } from '@/lib/api';

export const aiService = {
  async suggestCaption(topic: string): Promise<string> {
    const response = await api.post('/api/v1/ai/caption', { topic });
    return response.data.caption;
  },
};
