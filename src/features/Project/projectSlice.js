import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../util/notification";
import projectService from "./projectService";

const userLogin = JSON.parse(localStorage.getItem('user'))
const initialState = {
    projects: [],
    project: [],
    message: '',
    isSuccess: false,
    isError: false
}

export const createProject = createAsyncThunk('project/create',async (projectData, thunkAPI) => {
    try {
        const token = userLogin.accessToken;
        const response = await projectService.createProject(projectData, token)
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
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
})
export const updateProject = createAsyncThunk('project/update', async (projectData,thunkAPI) => {
  try {
    const token = userLogin.accessToken;
    const response = await projectService.updateProject(projectData, token, projectData.params.id)
    if (response) {
      openNotification('success', 'Success', response.message)
      return response
    } else {
      openNotification("error", "Error", response.message);
    }
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString()

  return thunkAPI.rejectWithValue(message)
  }
})
export const getProject = createAsyncThunk(
    'project/getAllProject',
    async (_, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        return await projectService.getProject(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const getProjectById = createAsyncThunk(
    'project/getProjectById',
    async (id, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        return await projectService.getProjectById(id,token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const deleteProject = createAsyncThunk(
    "project/delete",
    async (id, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        const response = await projectService.deleteProject(id, token);
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

  export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createProject.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createProject.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.projects =action.payload
        })
        .addCase(createProject.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.projects = null
        })
        .addCase(getProject.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getProject.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.projects = action.payload
        })
        .addCase(getProject.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.projects = null

        }).addCase(getProjectById.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getProjectById.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.project = action.payload
        })
        .addCase(getProjectById.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.project = null

        })
        .addCase(updateProject.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateProject.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.projects = action.payload
        })
        .addCase(updateProject.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.projects = null

        })
        .addCase(deleteProject.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.projects = action.payload
        })
        .addCase(deleteProject.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.projects = null
        })
    },
  })
  
  export const { reset } = projectSlice.actions
  export default projectSlice.reducer