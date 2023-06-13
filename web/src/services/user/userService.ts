import { AxiosError } from "axios";
import { LoginFormData } from "../../components/LoginForm/LoginForm";
import { AxiosClient } from "../axiosConfig";
import { LoginResponse, UserInformationResponse } from "./userInterface";
import { ChangeInfoFormData } from "../../components/ChangInfoForm";

export const loginApi = async (data: LoginFormData): Promise<LoginResponse> => {
  try {
    const res = await AxiosClient.post("/auth/sign-in", {
      ...data,
      rememberMe: true,
    });
    return res.data as LoginResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data["message"];
    }
    // eslint-disable-next-line no-throw-literal
    throw "Đăng nhập không thành công.";
  }
};
export const registerApi = () => {};

export const getMe = async (): Promise<UserInformationResponse> => {
  try {
    const res = await AxiosClient.get("/user");
    return res.data["user"] as UserInformationResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw (
        error.response?.data["message"] ?? error.response?.data["messages"][0]
      );
    }
    // eslint-disable-next-line no-throw-literal
    throw "Lỗi";
  }
};

export const changeUserInfo = async (
  data: ChangeInfoFormData
): Promise<UserInformationResponse> => {
  try {
    const res = await AxiosClient.patch("/user/info", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data["user"] as UserInformationResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw (
        error.response?.data["message"] ?? error.response?.data["messages"][0]
      );
    }
    // eslint-disable-next-line no-throw-literal
    throw "Lỗi";
  }
};
