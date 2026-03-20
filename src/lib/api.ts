import axios from 'axios';

const token = 'super-secret-doodle-token';
const baseURL = 'http://127.0.0.1:3000/api/v1';

export const CURRENT_USER = 'Sulaman';

export const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export interface Message {
  _id: string;
  message: string;
  author: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchMessages = async (params?: { limit?: number; after?: string; before?: string }) => {
  const { data } = await api.get<Message[]>('/messages', { params });
  return data;
};

export const createMessage = async (payload: { message: string; author: string }) => {
  const { data } = await api.post<Message>('/messages', payload);
  return data;
};
