import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openNotification } from "../../util/notification";
import issueService from "./issueService";

const initialState = {
  issues: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Issue
export const createIssue = createAsyncThunk(
  "issues/create",
  async (issueData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      const response = await issueService.createIssue(issueData, token);

      if (response.success) {
        openNotification("success", "Success", response.message);
        return response;
      } else {
        openNotification("error", "Error", response.message);
      }
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

// Get user Issues
export const getIssues = createAsyncThunk(
  "issues/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await issueService.getIssues(token);
      
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

// Delete user Issue
export const deleteIssue = createAsyncThunk(
  "issues/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      const response = await issueService.deleteIssue(id, token);
      if (response.success) {
        openNotification("success", "Success", response.message);
        return response;
      } else {
        openNotification("error", "Error", response.message);
      }
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

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload;
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload;
      })
      .addCase(getIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        console.log('slice', state.issues);
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = [state.issues].filter(
          (issue) => issue._id !== action.payload.id
        );
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = issueSlice.actions;
export default issueSlice.reducer;
