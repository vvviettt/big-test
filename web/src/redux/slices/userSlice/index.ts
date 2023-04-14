import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInformation } from "./interfaces/UserInformation.interface";
import { StatusFetch } from "../../../enums/StatusFetch.enum";

interface UserState {
  user: UserInformation | undefined;
  signInStatus: StatusFetch;
  signUpStatus: StatusFetch;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: undefined,
  signInStatus: StatusFetch.INITIAL,
  signUpStatus: StatusFetch.INITIAL,
  isLoggedIn: false,
};

const signInAction = createAsyncThunk("user/signIn", () => {});
const signUpAction = createAsyncThunk("user/signUp", () => {});
const logOutAction = createAsyncThunk("user/logOut", () => {});

const userSlice = createSlice<UserState, any>({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Handle sign in action
    builder.addCase(signInAction.pending, () => {});
    builder.addCase(signInAction.fulfilled, () => {});
    builder.addCase(signInAction.rejected, () => {});
    //Handle sign up action
    builder.addCase(signUpAction.pending, () => {});
    builder.addCase(signUpAction.fulfilled, () => {});
    builder.addCase(signUpAction.rejected, () => {});
    //Handle log out  action
    builder.addCase(logOutAction.pending, () => {});
    builder.addCase(logOutAction.fulfilled, () => {});
    builder.addCase(logOutAction.rejected, () => {});
  },
});

export const userReducer = userSlice.reducer;
