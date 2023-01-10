import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listingService from "./listingService";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const listing = cookies.get("listing");
const genres = cookies.get("genres");

const initialState = {
  listing: listing ? listing : null,
  genres: genres ? genres : null,
  isError: false,
  isSuccess: false,
  isPhotoUploaded: false,
  isLoading: false,
  message: "",
};

export const GetGenres = createAsyncThunk(
  "listing/get/genres",
  async (thunkAPI) => {
    try {
      const response = await listingService.getGenres();
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

export const UploadPhoto = createAsyncThunk(
  "listing/upload/photo",
  async (reqData, thunkAPI) => {
    try {
      const response = await listingService.uploadPhoto(reqData);
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

export const ManageListing = createAsyncThunk(
  "listing/manage",
  async (reqData, thunkAPI) => {
    try {
      const response = await listingService.manageListing(reqData);
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

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isPhotoUploaded = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(UploadPhoto.fulfilled, (state, action) => {
        state.isPhotoUploaded = true;
        state.listing = action.payload;
      })
      .addCase(ManageListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ManageListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listing = action.payload;
      })
      .addCase(ManageListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = listingSlice.actions;
export default listingSlice.reducer;
