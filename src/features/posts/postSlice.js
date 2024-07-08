import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchPostsApi,
  fetchPostApi,
  addPostApi,
  updatePostApi,
  deletePostApi,
} from './api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const data = await fetchPostsApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId, thunkAPI) => {
    try {
      const data = await fetchPostApi(postId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch post');
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (postData, thunkAPI) => {
    try {
      const data = await addPostApi(postData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (postData, thunkAPI) => {
    try {
      const data = await updatePostApi(postData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, thunkAPI) => {
  try {
    await deletePostApi(postId);  
    return postId;  
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to delete post');
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.post = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload.data;
        // toast.success('Posts fetched successfully');
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to fetch posts: ${action.payload}`);
      })
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload.data;
        // toast.success('Post fetched successfully');
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to fetch post: ${action.payload}`);
      })
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload.data.post);
        toast.success(`${action.payload.data.message}`);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to add post: ${action.payload}`);
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.posts.findIndex((post) => post._id === action.payload.data._id);
        if (index !== -1) {
          state.posts[index] = action.payload.data;
        }
        toast.success('Post updated successfully');
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to update post: ${action.payload}`);
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        toast.success('Post deleted successfully');
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to delete post: ${action.payload}`);
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
