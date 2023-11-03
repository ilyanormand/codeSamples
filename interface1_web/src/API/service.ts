import $api, { API_URL } from './http';
import { AxiosResponse } from 'axios';

export default class Service {
  static async auth(code: string): Promise<AxiosResponse> {
    return await $api.post('/api/auth', code);
  }
}
