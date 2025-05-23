import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllPosts } from '../../services/PostService';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Thunk to fetch posts with sorting (Popular, Recent, etc.)
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (sort = 'Popular', thunkAPI) => {
    try {
      const response = await fetchAllPosts(sort);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch posts');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Add reducers for voting or comment count updates later if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error loading posts';
      });
  },
});

export default postSlice.reducer;
