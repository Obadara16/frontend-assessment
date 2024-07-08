import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi } from './api';
import { logout } from '../auth/authSlice'; // Import the logout action
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      const data = await getUserApi(token);
      return data;
    } catch (error) {
      if (error.status_code === 401) {
        thunkAPI.dispatch(logout()); 
      }
      return thunkAPI.rejectWithValue(error.message || 'Failed to get user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetUser: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    logoutUser: (state) => {
      state.user = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data; 
        // toast.success('User data fetched successfully');
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to get user data: ${action.payload}`);
      });
  },
});

export const { resetUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
