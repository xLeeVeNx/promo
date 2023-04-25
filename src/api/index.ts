import axios from 'axios';
import * as process from 'process';

const token = btoa(`${import.meta.env.VITE_USERNAME}:${import.meta.env.VITE_PASSWORD}`);

const headers = {
  'Content-Type': 'application/json',
  common: {
    Authorization: `Basic ${token}`,
  },
};

export const baseURL = process.env.VITE_BASE_URL;
// if (!baseURL) {
//   console.error(
//     'You should create a .env file in the root directory if there is none and set the value to VITE_BASE_URL',
//   );
// }

export const axiosInstance = axios.create({
  baseURL,
  headers,
});
