import {fetchUserInformation} from './../../services/user/user.service';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FetchStatus} from '../../enum/FetchStatus.enum';
import {FetchError} from '../../interfaces/FetchError.interface';

interface UserState {
  user?: UserInformation;
  loadUserInformationState: FetchStatus;
}

export const getUerInformation = createAsyncThunk<
  UserInformation | undefined,
  undefined
>('user/info', async (a: undefined, {rejectWithValue, dispatch}) => {
  try {
    return await fetchUserInformation();
  } catch (error) {
    return rejectWithValue(error);
  }
});

const userSlice = createSlice<UserState, any>({
  name: 'user',
  initialState: {
    loadUserInformationState: FetchStatus.INITIAL,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUerInformation.pending, state => {
      state.loadUserInformationState = FetchStatus.SUBMIT_LOADING;
    });
    builder.addCase(getUerInformation.fulfilled, (state, {payload}) => {
      state.loadUserInformationState = FetchStatus.SUBMIT_SUCCESS;
      state.user = payload;
    });
    builder.addCase(getUerInformation.rejected, (state, {payload}) => {
      console.log(payload);
      state.loadUserInformationState = FetchStatus.SUBMIT_FAIL;
    });
  },
});

export const userReducer = userSlice.reducer;
