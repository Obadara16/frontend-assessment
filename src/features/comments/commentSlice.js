import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCommentApi, getCommentsApi, updateCommentApi, deleteCommentApi } from './api';

const initialState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const createComment = createAsyncThunk('comments/createComment', async ({ postId, commentData }, thunkAPI) => {
  try {
    const response = await createCommentApi(postId, commentData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to create comment');
  }
});

export const getComments = createAsyncThunk('comments/getComments', async (postId, thunkAPI) => {
  try {
    const response = await getCommentsApi(postId);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch comments');
  }
});

export const updateComment = createAsyncThunk('comments/updateComment', async ({ commentId, commentData }, thunkAPI) => {
  try {
    const response = await updateCommentApi(commentId, commentData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to update comment');
  }
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId, thunkAPI) => {
  try {
    await deleteCommentApi(commentId);
    return commentId; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to delete comment');
  }
});

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload.comment);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.comments.findIndex((comment) => comment._id === action.payload.comment._id);
        if (index !== -1) {
          state.comments[index] = action.payload.comment;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.filter((comment) => comment._id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
