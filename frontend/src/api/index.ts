import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

export const baseURL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
  headers,
});
