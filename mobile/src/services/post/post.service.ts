import {AxiosError} from 'axios';
import {NewPostFormData} from '../../redux/post/interfaces/NewPostFormData';
import {httpClient} from '../httpClient';

export const addNewPost = ({content, images, video}: NewPostFormData) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const res = await httpClient.post(
        '/post',
        {
          files: images,
          content,
          mode: 0,
        },
        {headers: {'Content-Type': 'multipart/form-data'}},
      );
      resolve(res.data);
    } catch (error) {
      reject((error as AxiosError).response?.data);
    }
  });
};
