import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { openNotification } from '../../util/notification'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  users: [],
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
export const getAllUser = createAsyncThunk('auth/user', async (_, thunkAPI) => {
  try {
    const response = await authService.getAll()
    return response
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

//Get User By Id
export const getUserById = createAsyncThunk('auth/userId', async (userId, thunkAPI) => {
  try {
    const response = await authService.getUserById(userId)
    return response
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
// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const response = await authService.register(user)
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
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await authService.login(user)
    if (response.success) {
      openNotification("success", "Success", response.message);
      return response;
    } else {
      openNotification("error", "Error", response.message);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const updateUser = createAsyncThunk(
  "user/update",
  async (dataUpdate, thunkAPI) => {
    try {
      const response = await authService.updateUser(dataUpdate,dataUpdate.id);
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = action.payload.message
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = action.payload.message
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
        state.message = action.payload.message
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.users = null
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = action.payload.message
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = action.payload.message
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer