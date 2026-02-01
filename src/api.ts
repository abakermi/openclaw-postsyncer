import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class PostSyncerApi {
  private client: any;

  constructor(apiKey?: string) {
    const token = apiKey || process.env.POSTSYNCER_API_KEY;
    if (!token) {
      throw new Error('POSTSYNCER_API_KEY is required. Set it in .env or pass it as an argument.');
    }

    this.client = axios.create({
      baseURL: 'https://postsyncer.com/api/v1',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getWorkspaces() {
    const response = await this.client.get('/workspaces');
    return response.data;
  }

  async getPosts() {
    const response = await this.client.get('/posts');
    return response.data;
  }

  async createPost(data: any) {
    const response = await this.client.post('/posts', data);
    return response.data;
  }

  async getAccounts() {
      try {
        const response = await this.client.get('/accounts');
        return response.data;
      } catch (e) {
          throw e;
      }
  }
}
