import axios from 'axios';
import { getTokenFromLocalStorage } from '../token/localStorage';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

api.interceptors.request.use((config) => {
  config.headers.authorization = getTokenFromLocalStorage();

  return config;
});

export { api };
