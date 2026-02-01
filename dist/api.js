"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSyncerApi = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class PostSyncerApi {
    constructor(apiKey) {
        const token = apiKey || process.env.POSTSYNCER_API_KEY;
        if (!token) {
            throw new Error('POSTSYNCER_API_KEY is required. Set it in .env or pass it as an argument.');
        }
        this.client = axios_1.default.create({
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
    async createPost(data) {
        const response = await this.client.post('/posts', data);
        return response.data;
    }
    async getAccounts() {
        try {
            const response = await this.client.get('/accounts');
            return response.data;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.PostSyncerApi = PostSyncerApi;
