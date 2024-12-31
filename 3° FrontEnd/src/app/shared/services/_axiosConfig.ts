import { LocalStorageUtil } from '@utils/localStorage.util';
import axios from 'axios';

export let protocol = 'https://'
let baseURL = "http://localhost:8000"
const hostname = new LocalStorageUtil().getToken('backendHostname');

const api = axios.create({
  baseURL: hostname ? (hostname.includes(protocol) ? hostname : baseURL) : baseURL,
  headers: {
    'ngrok-skip-browser-warning': 1,
    'X-CSRF-Token': '{{ csrftoken }}',
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default api;
