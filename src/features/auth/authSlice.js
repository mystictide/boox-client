import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const user = cookies.get("user");

const initialState = {
  user: user ? user : null,
  isError: false,
  isSettingsError: false,
  isSuccess: false,
  isSettingsSuccess: false,
  isLoading: false,
  isLoggedOut: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await authService.register(user);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await authService.login(user);
    if (response.status === 500) {
      return thunkAPI.rejectWithValue(response);
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async () => await authService.logout()
);

export const UpdateEmail = createAsyncThunk(
  "user/update/email",
  async (reqData, thunkAPI) => {
    try {
      const response = await authService.updateEmail(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ChangePassword = createAsyncThunk(
  "user/change/password",
  async (reqData, thunkAPI) => {
    try {
      const response = await authService.changePassword(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ManageAddress = createAsyncThunk(
  "user/manage/addresses",
  async (reqData, thunkAPI) => {
    try {
      const response = await authService.manageAddress(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetAddresses = createAsyncThunk(
  "user/get/addresses",
  async (reqData, thunkAPI) => {
    try {
      const response = await authService.getAddresses(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLoggedOut = false;
      state.message = "";
    },
    resetSettings: (state) => {
      state.isSettingsError = false;
      state.isSettingsSuccess = false;
      state.message = "";
    },
    update: (state) => {
      state.user = JSON.parse(cookies.get("user"));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedOut = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isLoggedOut = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.userLookup = null;
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isLoggedOut = true;
      }).addCase(UpdateEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSettingsError = false;
        state.isSettingsSuccess = true;
      })
      .addCase(UpdateEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSettingsSuccess = false;
        state.isSettingsError = true;
        state.message = action.payload;
      })
      .addCase(ChangePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSettingsError = false;
        state.isSettingsSuccess = true;
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSettingsSuccess = false;
        state.isSettingsError = true;
        state.message = action.payload;
      })
      .addCase(ManageAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ManageAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSettingsError = false;
        state.isSettingsSuccess = true;
      })
      .addCase(ManageAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isSettingsSuccess = false;
        state.isSettingsError = true;
        state.message = action.payload;
      })
      .addCase(GetAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSettingsError = false;
        state.isSettingsSuccess = true;
      })
      .addCase(GetAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.isSettingsSuccess = false;
        state.isSettingsError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetSettings, update } = authSlice.actions;
export default authSlice.reducer;
