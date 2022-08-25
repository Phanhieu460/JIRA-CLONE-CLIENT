import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "./projectService";


const initialState = {
    projects: [],
    message: '',
    isSuccess: false,
    isError: false
}

export const createProject = createAsyncThunk('project/create',async (projectData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.accessToken
        return await projectService.createProject(projectData, token)
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
    'project/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.accessToken
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
    'project/getAll',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.accessToken
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
        })
    },
  })
  
  export const { reset } = projectSlice.actions
  export default projectSlice.reducer