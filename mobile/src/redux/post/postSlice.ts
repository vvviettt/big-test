import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {StatusFetch} from '../../enums/StatusFetch.enum';
import {
  addNewPost,
  getMyPosts,
  voteForSuvey,
  lovePost as lovePostApi,
  getComments as getCommentApi,
  commentApi,
} from '../../services/post/postService';
import {
  CommentResponse,
  GetMyPostResponse,
  PostResponse,
} from '../../services/post/postInterface';

interface PostStateType {
  postsFollowing: PostResponse[];
  postsForYou: PostResponse[];
  myPosts: PostResponse[];
  postTypes: 'FOR_YOU' | 'FOLLOWING';
  loadPostStatus: StatusFetch;
  newPostStatus: StatusFetch;
  getMyPostStatus: StatusFetch;
  total?: number;
  page: number;
  commentPage: number;
}

const initialState: PostStateType = {
  postsForYou: [],
  postsFollowing: [],
  myPosts: [],
  postTypes: 'FOR_YOU',
  loadPostStatus: StatusFetch.INITIAL,
  newPostStatus: StatusFetch.INITIAL,
  getMyPostStatus: StatusFetch.INITIAL,
  page: 0,
  commentPage: 0,
};

export const changePostType = createAsyncThunk<void, 'FOR_YOU' | 'FOLLOWING'>(
  'post',
  payload => {},
);

// export const newPostAction = createAsyncThunk<
//   void,
//   AddPostFormData,
//   {rejectValue: string}
// >('post/new-post', async (data, {rejectWithValue}) => {
//   try {
//     await addNewPost(data);
//     return;
//   } catch (error) {
//     rejectWithValue(error as string);
//   }
// });

export const getMyPost = createAsyncThunk<
  GetMyPostResponse,
  void,
  {
    rejectValue: string;
  }
>('post/my-post', async (data, {rejectWithValue, dispatch}) => {
  try {
    const res = await getMyPosts();
    return res;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const voteSuvey = createAsyncThunk<
  PostResponse,
  {postId: string; suveyIndex: number},
  {
    rejectValue: string;
  }
>('post/vote-for-suvey', async (data, {rejectWithValue}) => {
  try {
    return await voteForSuvey(data.postId, data.suveyIndex);
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const lovePost = createAsyncThunk<
  PostResponse,
  {postId: string},
  {
    rejectValue: string;
  }
>('post/love', async (data, {rejectWithValue}) => {
  try {
    return await lovePostApi(data.postId);
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const getComments = createAsyncThunk<
  CommentResponse[],
  {postId: string},
  {
    rejectValue: string;
  }
>('post/get-comments', async (data, {rejectWithValue}) => {
  try {
    return await getCommentApi(data.postId);
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const loadMoreComments = createAsyncThunk<
  CommentResponse[],
  {postId: string},
  {
    rejectValue: string;
  }
>('post/get-more-comments', async (data, {rejectWithValue}) => {
  try {
    return await getCommentApi(data.postId);
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const comment = createAsyncThunk<
  CommentResponse,
  {postId: string; content: string},
  {
    rejectValue: string;
  }
>('post/new-comment', async (data, {rejectWithValue}) => {
  try {
    return await commentApi(data.postId, data.content);
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

const postSlice = createSlice<PostStateType, {}>({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(changePostType.pending, (state, action) => {
      const arg = action.meta.arg;
      if (state.postTypes !== arg) {
        state.postTypes = arg;
      }
    });

    builder.addCase(changePostType.fulfilled, (state, action) => {});
    builder.addCase(changePostType.rejected, (state, action) => {});

    //New Post
    // builder.addCase(newPostAction.pending, (state, action) => {
    //   state.newPostStatus = StatusFetch.LOADING;
    // });
    // builder.addCase(newPostAction.fulfilled, (state, action) => {
    //   state.newPostStatus = StatusFetch.SUCCESS;
    //   // toast.success('Đăng bài thành công.');
    // });
    // builder.addCase(newPostAction.rejected, (state, action) => {
    //   state.newPostStatus = StatusFetch.FAIL;
    // });
    //Get My Post
    builder.addCase(getMyPost.pending, (state, action) => {
      state.getMyPostStatus = StatusFetch.LOADING;
    });
    builder.addCase(getMyPost.fulfilled, (state, action) => {
      state.getMyPostStatus = StatusFetch.SUCCESS;
      state.myPosts = action.payload.posts;
      state.page = 1;
      state.total = action.payload.total;
    });
    builder.addCase(getMyPost.rejected, (state, action) => {
      state.getMyPostStatus = StatusFetch.FAIL;
    });
    //Vote a suvey
    builder.addCase(voteSuvey.pending, (state, action) => {});
    builder.addCase(voteSuvey.fulfilled, (state, action) => {
      const index = state.myPosts.findIndex(
        val => (val.id = action.payload.id),
      );
      if (index > -1) {
        state.myPosts[index] = {...action.payload};
      }
    });
    builder.addCase(voteSuvey.rejected, (state, action) => {});

    builder.addCase(lovePost.fulfilled, (state, action) => {
      state.myPosts = state.myPosts.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    });

    //Get commnet
    builder.addCase(getComments.pending, (state, action) => {});
    builder.addCase(getComments.fulfilled, (state, action) => {
      console.log(action.payload);

      state.myPosts = state.myPosts.map(post => {
        if (post.id === action.meta.arg.postId) {
          return {...post, comments: action.payload};
        }
        return post;
      });
      state.commentPage = 1;
    });
    builder.addCase(getComments.rejected, (state, action) => {});

    builder.addCase(loadMoreComments.pending, (state, action) => {});
    builder.addCase(loadMoreComments.fulfilled, (state, action) => {
      state.myPosts = state.myPosts.map(post => {
        if (post.id === action.meta.arg.postId) {
          return {...post, comments: [...post.comments, ...action.payload]};
        }
        return post;
      });
      state.commentPage = state.commentPage + 1;
    });
    builder.addCase(loadMoreComments.rejected, (state, action) => {});

    builder.addCase(comment.pending, (state, action) => {});
    builder.addCase(comment.fulfilled, (state, action) => {
      state.myPosts = state.myPosts.map(post => {
        if (post.id === action.meta.arg.postId) {
          return {...post, comments: [...post.comments, action.payload]};
        }
        return post;
      });
      state.commentPage = state.commentPage + 1;
    });
    builder.addCase(comment.rejected, (state, action) => {});
  },
});

export const postReducer = postSlice.reducer;
