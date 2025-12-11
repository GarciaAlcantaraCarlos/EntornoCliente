import axios from 'axios';

export const AXIOS = axios.create({
  baseURL: 'http://192.168.1.175:8000/api',
})