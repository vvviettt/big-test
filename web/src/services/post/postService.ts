import { AxiosError } from "axios";
import { AddPostFormData } from "../../components/AddPostForm";
import { AxiosClient } from "../axiosConfig";
import {
  CommentResponse,
  GetMyPostResponse,
  PostResponse,
} from "./postInterface";

export const addNewPost = async (data: AddPostFormData) => {
  try {
    let form = new FormData();
    form.append("mode", data.privacy.toString());
    form.append("content", data.content);
    form.append("surveyTime", data.surveyTime.toString());
    if (data.survey) {
      data.survey.forEach((s) => {
        form.append("surveyOption", s!);
      });
    }
    const files: FileList = data.files as FileList;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        form.append("files", files.item(i)!);
      }
    }

    await AxiosClient.post("/post", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw (
        error.response?.data["message"] ?? error.response?.data["messages"][0]
      );
    }
    // eslint-disable-next-line no-throw-literal
    throw "Chưa thể đăng tin.";
  }
};

export const getMyPosts = async (limit: number = 10, page: number = 1) => {
  try {
    const res = await AxiosClient.get("/post/me", {
      params: { limit: limit, page: page },
    });

    return res.data as GetMyPostResponse;
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

export const voteForSuvey = async (
  postId: string,
  index: number
): Promise<PostResponse> => {
  try {
    const res = await AxiosClient.patch("/post/survey", {
      postId,
      index,
    });
    return res.data as PostResponse;
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

export const lovePost = async (postId: string): Promise<PostResponse> => {
  try {
    const res = await AxiosClient.patch("/post/love", {
      id: postId,
    });
    console.log(res.data);

    return res.data as PostResponse;
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

export const getComments = async (
  postId: string,
  limit: number = 10,
  page: number = 1
): Promise<CommentResponse[]> => {
  try {
    const res = await AxiosClient.get("/post/comments", {
      params: { limit: limit, page: page, postId },
    });

    return res.data.comments as CommentResponse[];
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

export const commentApi = async (
  postId: string,
  content: string
): Promise<CommentResponse> => {
  try {
    const res = await AxiosClient.post("/post/comment", {
      postId,
      content,
    });

    return res.data as CommentResponse;
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
