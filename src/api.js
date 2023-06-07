// api.js

import axios from 'axios';

const host = window.location.hostname === "localhost" ? process.env.REACT_APP_API_BASE_URL : "api";

const apiClient = axios.create({
  baseURL: host,
});

export default apiClient;