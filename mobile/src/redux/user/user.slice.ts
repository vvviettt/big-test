import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchUserInformation = createAsyncThunk<unknown, string>(
  'user/info',
  () => {
    console.log('FETCH');
  },
);

const userSlice = createSlice({name: 'user', initialState: {}, reducers: {}});

export const userReducer = userSlice.reducer;
