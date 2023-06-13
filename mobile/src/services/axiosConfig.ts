import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AxiosClient = axios.create({
  baseURL: 'http://192.168.45.228:2023/api',
});

AxiosClient.interceptors.request.use(
  async config => {
    const token = (await AsyncStorage.getItem('@storage_Key')) ?? '';
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
  // {synchronous: true},
);

AxiosClient.interceptors.response.use(
  response => {
    if (
      response.config.url === '/auth/sign-in' &&
      !!response.data.accessToken
    ) {
      AsyncStorage.setItem('@storage_Key', response.data.accessToken);
    }

    return response;
  },
  error => {
    console.log(error);

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        // store.dispatch({type: 'clearUser'});
      }
    }
    throw error;
  },
);
