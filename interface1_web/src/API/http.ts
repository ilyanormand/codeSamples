import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { Auth } from '../types/Auth';

let url = process.env.REACT_APP_DEV_API_URL;

if (process.env.NODE_ENV === 'production' && window.location.host.search('anroit.com') === -1) {
  url = process.env.REACT_APP_PROD_API_URL;
}

const $api = axios.create({
  baseURL: url
});

$api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  error => error
);

$api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
    }

    throw error;
  }
);

export default $api;
export const API_URL = url;
