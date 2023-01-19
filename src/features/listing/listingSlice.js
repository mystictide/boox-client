import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import listingService from "./listingService";

const cookies = new Cookies();
const listing = cookies.get("listing");
const genres = cookies.get("genres");

const initialState = {
  listing: listing ? listing : null,
  genres: genres ? genres : null,
  browser: null,
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

export const GetListing = createAsyncThunk(
  "listing/get/listing",
  async (reqData, thunkAPI) => {
    try {
      const response = await listingService.getListing(reqData);
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

export const FilteredListing = createAsyncThunk(
  "listing/filter",
  async (reqData, thunkAPI) => {
    try {
      const response = await listingService.filteredListing(reqData);
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

export const FilteredSelfListing = createAsyncThunk(
  "listing/filter/self",
  async (reqData, thunkAPI) => {
    try {
      const response = await listingService.filteredSelfListing(reqData);
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

export const DeleteListing = createAsyncThunk(
  "listing/delete",
  async (reqData, thunkAPI) => {
    try {
      const response = await listingService.deleteListing(reqData);
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
      })
      .addCase(DeleteListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listing = action.payload;
      })
      .addCase(DeleteListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listing = action.payload;
      })
      .addCase(GetListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(FilteredListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FilteredListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.browser = action.payload;
      })
      .addCase(FilteredListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(FilteredSelfListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FilteredSelfListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.browser = action.payload;
      })
      .addCase(FilteredSelfListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = listingSlice.actions;
export default listingSlice.reducer;
