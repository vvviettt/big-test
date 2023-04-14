export interface Post {
  ownerId: string;
  ownerName: string;
  ownerImagePath?: string;
  postId: string;
  postContent: string;
  postImages: string[];
  postLinks: string[];
  postTime: Date;
  postLikeNumber: string;
  postCommentNumber: string;
  postShareNumber: string;
}
