import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginActive: false,
  registerActive: false,
  addressActive: false,
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
    resetAddressState: (state) => {
      state.addressActive = false;
    },
    updateLoginState(state) {
      state.loginActive = !state.loginActive;
    },
    updateRegisterState(state) {
      state.registerActive = !state.registerActive;
    },
    updateAddressState(state) {
      state.addressActive = !state.addressActive;
    },
    updatePhotoState(state) {
      state.photoActive = !state.photoActive;
    },
  },
});

export const {
  resetLoginState,
  resetRegisterState,
  resetAddressState,
  updateLoginState,
  updateRegisterState,
  updateAddressState,
  updatePhotoState,
} = modalSlice.actions;
export default modalSlice.reducer;
