import {AxiosError} from 'axios';
import {httpClient} from '../httpClient';
import {LoginResponse} from './interfaces/LoginResponse.interface';

export const loginService = (
  email: string,
  password: string,
  rememberMe: boolean,
) => {
  return new Promise<LoginResponse>(async (resolve, reject) => {
    try {
      const res = await httpClient.post('/auth/sign-in', {
        email,
        password,
        rememberMe,
      });

      resolve(res.data);
    } catch (error) {
      reject((error as AxiosError).response?.data);
    }
  });
};
