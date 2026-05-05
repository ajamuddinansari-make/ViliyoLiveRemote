import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api-backend-live.viliyo.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default API;