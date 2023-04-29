import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "./interfaces/post.type";
import { StatusFetch } from "../../enums/StatusFetch.enum";

interface PostStateType {
  postsFollowing: Post[];
  postsForYou: Post[];
  postTypes: "FOR_YOU" | "FOLLOWING";
  loadPostStatus: StatusFetch;
}

const initialState: PostStateType = {
  postsForYou: [],
  postsFollowing: [],
  postTypes: "FOR_YOU",
  loadPostStatus: StatusFetch.INITIAL,
};

export const changePostType = createAsyncThunk<void, "FOR_YOU" | "FOLLOWING">(
  "post",
  (payload) => {}
);

const postSlice = createSlice<PostStateType, {}>({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changePostType.pending, (state, action) => {
      const arg = action.meta.arg;
      if (state.postTypes != arg) {
        state.postTypes = arg;
      }
    });

    builder.addCase(changePostType.fulfilled, (state, action) => {});
    builder.addCase(changePostType.rejected, (state, action) => {});
  },
});

export const postReducer = postSlice.reducer;
