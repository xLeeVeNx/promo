import axios from 'axios';

const token = btoa(`${import.meta.env.VITE_USERNAME}:${import.meta.env.VITE_PASSWORD}`);

const headers = {
  'Content-Type': 'application/json',
  common: {
    Authorization: `Basic ${token}`,
  },
};

export const baseURL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
  headers,
});
