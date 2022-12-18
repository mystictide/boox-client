import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginActive: false,
  registerActive: false,
  photoActive: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loginActive = false;
    },
    resetRegisterState: (state) => {
      state.registerActive = false;
    },
    updateLoginState(state) {
      state.loginActive = !state.loginActive;
    },
    updateRegisterState(state) {
      state.registerActive = !state.registerActive;
    },
    updatePhotoState(state) {
      state.photoActive = !state.photoActive;
    },
  },
});

export const {
  resetLoginState,
  resetRegisterState,
  updateLoginState,
  updateRegisterState,
  updatePhotoState,
} = modalSlice.actions;
export default modalSlice.reducer;
