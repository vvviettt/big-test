import axios, { AxiosError } from "axios";
import store from "../redux/store";
import { error } from "console";
import { clearUser } from "../redux/user/userSlice";

export const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

AxiosClient.interceptors.request.use(function (config) {
  const token = store.getState()?.user?.token;
  console.log(token);

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        store.dispatch({ type: "clearUser" });
      }
    }
    throw error;
  }
);
