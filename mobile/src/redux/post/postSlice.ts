import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FetchStatus} from '../../enum/FetchStatus.enum';
import {NewPostFormData} from './interfaces/NewPostFormData';
import {FetchError} from '../../interfaces/FetchError.interface';
import {addNewPost} from '../../services/post/post.service';

interface PostStateType {
  addNewPostStatus: FetchStatus;
}

const initialState: PostStateType = {
  addNewPostStatus: FetchStatus.INITIAL,
};

export const submitNewPost = createAsyncThunk<
  void,
  NewPostFormData,
  {rejectValue: FetchError}
>('post/create', async (data, {rejectWithValue}) => {
  try {
    return await addNewPost(data);
  } catch (error) {
    rejectWithValue(error as FetchError);
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(submitNewPost.pending, state => {
      state.addNewPostStatus = FetchStatus.SUBMIT_LOADING;
    });
    builder.addCase(submitNewPost.fulfilled, state => {
      console.log('ok');
      state.addNewPostStatus = FetchStatus.SUBMIT_SUCCESS;
    });
    builder.addCase(submitNewPost.rejected, state => {
      console.log('fail');
      state.addNewPostStatus = FetchStatus.SUBMIT_FAIL;
    });
  },
});

export const postReducer = postSlice.reducer;
