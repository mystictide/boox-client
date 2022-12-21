import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/helpers/modalSlice";
import validationReducer from "../features/auth/validationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalReducer,
    validation: validationReducer,
  },
});
