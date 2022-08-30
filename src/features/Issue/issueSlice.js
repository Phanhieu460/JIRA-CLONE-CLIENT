import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openNotification } from "../../util/notification";
import issueService from "./issueService";

const userLogin = JSON.parse(localStorage.getItem('user'))
const initialState = {
  issues: [],
  issue:[],
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
      const token = userLogin.accessToken;
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
  async (id, thunkAPI) => {
    try {
      const token = userLogin.accessToken;
      return await issueService.getIssues(token, id);
      
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
      const token = userLogin.accessToken;
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
export const updateIssue = createAsyncThunk(
  "issues/update",
  async (dataUpdate, thunkAPI) => {
    try {
      const token = userLogin.accessToken;
      const response = await issueService.updateIssue(dataUpdate,dataUpdate.id, token);
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
export const searchIssue = createAsyncThunk(
  "issues/search",
  async (dataSearch, thunkAPI) => {
    try {
      const token = userLogin.accessToken;
      return await issueService.searchIssue(dataSearch, token);
      
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
        state.issues = null
      })
      .addCase(getIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIssues.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload.allIssue;
      })
      .addCase(getIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.issues = null;
      })
      .addCase(deleteIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
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
      })
      .addCase(updateIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload;
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.issues= null
      })
      .addCase(searchIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload.issue;
      })
      .addCase(searchIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.issues= null
      })
  },
});

export const { reset } = issueSlice.actions;
export default issueSlice.reducer;
