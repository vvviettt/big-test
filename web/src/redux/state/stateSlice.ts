import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  showLoginForm: boolean;
  showRegisterForm: boolean;
  showChangeInfoForm: boolean;
  redirectPath?: string;
}

const initialState: StateType = {
  showLoginForm: false,
  showRegisterForm: false,
  showChangeInfoForm: false,
};

const stateSlice = createSlice({
  name: "global-state",
  initialState,
  reducers: {
    closeAuth: (state: StateType) => {
      state.showLoginForm = false;
      state.showRegisterForm = false;
      state.showChangeInfoForm = false;
    },
    showLoginFormChange(state: StateType, action: PayloadAction<boolean>) {
      state.showLoginForm = action.payload;
    },
    showRegisterFormChange(state: StateType, action: PayloadAction<boolean>) {
      state.showRegisterForm = action.payload;
    },
    showChangeInfoFormChange(state: StateType, action: PayloadAction<boolean>) {
      state.showChangeInfoForm = action.payload;
    },
    redirectPath(state: StateType, action: PayloadAction<string>) {
      state.redirectPath = action.payload;
    },
  },
});
export const stateReducer = stateSlice.reducer;
export const {
  closeAuth,
  showLoginFormChange,
  showRegisterFormChange,
  showChangeInfoFormChange,
} = stateSlice.actions;
