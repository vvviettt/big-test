import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {StatusFetch} from '../../enums/StatusFetch.enum';
import {changeUserInfo, getMe, loginApi} from '../../services/user/userService';
import {
  LoginResponse,
  UserInformationResponse,
} from '../../services/user/userInterface';
import {
  showChangeInfoFormChange,
  showLoginFormChange,
} from '../state/stateSlice';
// import {ChangeInfoFormData} from '../../components/ChangInfoForm';
import {LoginFormData} from '../../screens/auth/LoginScreen/LoginForm';

interface UserState {
  user?: UserInformationResponse;
  signInStatus: StatusFetch;
  signUpStatus: StatusFetch;
  getMeStatus: StatusFetch;
  changeInfoStatus: StatusFetch;
  isLoggedIn: boolean;
  token?: string;
}

const initialState: UserState = {
  user: undefined,
  signInStatus: StatusFetch.INITIAL,
  signUpStatus: StatusFetch.INITIAL,
  getMeStatus: StatusFetch.INITIAL,
  changeInfoStatus: StatusFetch.INITIAL,
  isLoggedIn: false,
};

export const signInAction = createAsyncThunk<
  LoginResponse,
  LoginFormData,
  {
    rejectValue: string;
  }
>('user/signIn', async (data, {rejectWithValue, dispatch}) => {
  try {
    const response: LoginResponse = await loginApi(data);
    dispatch(getUserInfo());
    return response;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});
export const getUserInfo = createAsyncThunk<
  UserInformationResponse,
  void,
  {
    rejectValue: string;
  }
>('user/info', async (_, {rejectWithValue}) => {
  try {
    return await getMe();
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const changeUserInfoAction = createAsyncThunk<
  UserInformationResponse,
  ChangeInfoFormData,
  {
    rejectValue: string;
  }
>('user/change-info', async (data, {rejectWithValue, dispatch}) => {
  try {
    const res = await changeUserInfo(data);
    dispatch(showChangeInfoFormChange(false));
    return res;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

const signUpAction = createAsyncThunk('user/signUp', () => {});
const logOutAction = createAsyncThunk('user/logOut', () => {});

const userSlice = createSlice<UserState, any>({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state: UserState) => {
      state.user = undefined;
      state.token = undefined;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    //Handle sign in action
    builder.addCase(signInAction.pending, state => {
      state.signInStatus = StatusFetch.LOADING;
    });
    builder.addCase(signInAction.fulfilled, (state, payload) => {
      state.signInStatus = StatusFetch.LOADING;
      state.token = payload.payload.accessToken;
      state.isLoggedIn = true;
    });
    builder.addCase(signInAction.rejected, state => {
      state.signInStatus = StatusFetch.LOADING;
    });
    //Handle sign up action
    builder.addCase(signUpAction.pending, () => {});
    builder.addCase(signUpAction.fulfilled, () => {});
    builder.addCase(signUpAction.rejected, () => {});
    //Handle log out  action
    builder.addCase(logOutAction.pending, () => {});
    builder.addCase(logOutAction.fulfilled, () => {});
    builder.addCase(logOutAction.rejected, () => {});

    //Handle get user information
    builder.addCase(getUserInfo.pending, state => {
      state.getMeStatus = StatusFetch.LOADING;
    });
    builder.addCase(getUserInfo.fulfilled, (state, {payload}) => {
      state.getMeStatus = StatusFetch.SUCCESS;
      state.user = payload;
      state.isLoggedIn = true;
    });
    builder.addCase(getUserInfo.rejected, state => {
      state.getMeStatus = StatusFetch.FAIL;
      state.user = undefined;
    });
    //Change user info
    builder.addCase(changeUserInfoAction.pending, state => {
      state.changeInfoStatus = StatusFetch.LOADING;
    });
    builder.addCase(changeUserInfoAction.fulfilled, (state, {payload}) => {
      state.changeInfoStatus = StatusFetch.SUCCESS;
      state.user = payload;
      toast.error('Cập nhật thành công.');
    });
    builder.addCase(changeUserInfoAction.rejected, (state, {payload}) => {
      state.changeInfoStatus = StatusFetch.FAIL;
      toast.error(payload ?? 'Cập nhật thất bại.');
    });
  },
});

export const userReducer = userSlice.reducer;
export const {clearUser} = userSlice.actions;
