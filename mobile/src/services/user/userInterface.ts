export interface LoginResponse {
  accessToken: string;
  message: string;
  status: number;
}

export interface UserInformationResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  postCount: number;
  followers: number;
  following: number;
  createdAt: number;
  description?: string;
}
