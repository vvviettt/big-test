import {AxiosError} from 'axios';
import {httpClient} from '../httpClient';

export const fetchUserInformation = () => {
  return new Promise<UserInformation>(async (resolve, reject) => {
    try {
      const res = await httpClient.get('/user');
      resolve(res.data.user);
    } catch (error) {
      reject((error as AxiosError).response?.data);
    }
  });
};
