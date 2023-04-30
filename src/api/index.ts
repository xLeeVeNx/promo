import axios from 'axios';

const token = btoa('maslovai:Z2xoq8DT8FYHWg2C');

const headers = {
  'Content-Type': 'application/json',
  common: {
    Authorization: `Basic ${token}`,
  },
};

export const baseURL = 'https://89pnjapffh.execute-api.eu-west-1.amazonaws.com';

export const axiosInstance = axios.create({
  baseURL,
  headers,
});
