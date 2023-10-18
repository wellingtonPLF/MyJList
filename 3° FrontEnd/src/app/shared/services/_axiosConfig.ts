import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8000/',
  baseURL: 'http://192.168.0.8:8000/',
  withCredentials: true,
  headers: {
    'X-CSRF-Token': '{{ csrftoken }}',
    'Content-Type': 'application/json'
  },
});

export default api;
