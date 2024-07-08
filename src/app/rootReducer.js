import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/posts/postSlice';
import userReducer from '../features/user/userSlice';
import commentReducer from '../features/comments/commentSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  comments: commentReducer,
  user: userReducer,
});

export default rootReducer;
