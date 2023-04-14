import axios from 'axios';
import {ConstantVariable} from '../config/constant';

export const httpClient = axios.create({
  baseURL: ConstantVariable.ApiUrl,
});
