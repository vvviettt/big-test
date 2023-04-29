import axios, {AxiosError} from 'axios';
import {ConstantVariable} from '../config/constant';

export const httpClient = axios.create({
  baseURL: ConstantVariable.ApiUrl,
});

httpClient.interceptors.request.use(async config => {
  const {default: store} = await import('../redux/store');
  config.headers.Authorization = 'Bearer ' + store.getState().auth.accessToken;
  return config;
});

httpClient.interceptors.response.use(
  async res => {
    if (res.status == 401) {
    }
    return res;
  },
  async e => {
    if ((e as AxiosError).response?.status === 401) {
      const {default: store} = await import('../redux/store');
      const {logout} = await import('../redux/user/auth.slice');
      store.dispatch(logout());
    }
  },
);
