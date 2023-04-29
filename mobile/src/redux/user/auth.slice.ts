import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FetchStatus} from '../../enum/FetchStatus.enum';

import {loginService} from '../../services/user';
import {LoginFormState} from '../../screens/auth/LoginScreen/LoginForm';
import {LoginResponse} from '../../services/user/interfaces/LoginResponse.interface';
import {FetchError} from '../../interfaces/FetchError.interface';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

interface AuthState {
  loginFetchStatus: FetchStatus;
  registerFetchStatus: FetchStatus;
  accessToken?: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  loginFetchStatus: FetchStatus.INITIAL,
  registerFetchStatus: FetchStatus.INITIAL,
  isLoggedIn: false,
};

export const login = createAsyncThunk<
  LoginResponse,
  LoginFormState,
  {rejectValue: FetchError}
>('auth/login', async ({email, password}, {rejectWithValue}) => {
  try {
    const res = await loginService(email, password, true);
    return res;
  } catch (error) {
    return rejectWithValue(error as FetchError);
  }
});

const authSlice = createSlice<AuthState, any>({
  name: 'user/auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      console.log('logged out');
      state.isLoggedIn = false;
      state.accessToken = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loginFetchStatus = FetchStatus.SUBMIT_LOADING;
      console.log('ok');
    });
    builder.addCase(login.rejected, (state, {payload}) => {
      state.loginFetchStatus = FetchStatus.SUBMIT_FAIL;
      Toast.show({type: 'error', text1: payload?.message});
    });
    builder.addCase(login.fulfilled, (state, {payload}) => {
      state.loginFetchStatus = FetchStatus.SUBMIT_SUCCESS;
      state.accessToken = payload.accessToken;
      state.isLoggedIn = true;
    });
  },
});

export const {logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
