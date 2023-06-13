import { UserInformationResponse } from "../user/userInterface";

export interface PostResponse {
  id: string;
  owner: UserInformationResponse;
  content: string;
  images: string[];
  survey: {
    label: string;
    vote: string[];
  }[];
  surveyTime: number;
  likes: string[];
  comments: CommentResponse[];
  commentTotal: number;
  createdAt: number;
  updatedAt: number;
}

export interface GetMyPostResponse {
  posts: PostResponse[];
  total: number;
}

export interface CommentResponse {
  id: string;
  content: string;
  likes?: string[];
  owner: UserInformationResponse;
}
