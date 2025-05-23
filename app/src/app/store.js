import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postReducer from '../features/posts/postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

export const selectUser = (state) => state.user;
export const selectPosts = (state) => state.posts;

export default store;
