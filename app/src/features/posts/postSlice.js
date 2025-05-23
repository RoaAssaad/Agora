import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllPosts } from '../../services/PostService';
import { voteOnPost } from '../../services/VoteService';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Fetch posts with sorting
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

// Vote on a post and update the post state
export const voteOnPostThunk = createAsyncThunk(
  'posts/voteOnPost',
  async ({ postId, value }, thunkAPI) => {
    try {
      const data = await voteOnPost(postId, value);
      return { postId, value, updatedVoteCount: data.votes };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Vote failed');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
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
      })
      .addCase(voteOnPostThunk.fulfilled, (state, action) => {
        const { postId, value, updatedVoteCount } = action.payload;
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.userVote = value;
          post.votes = updatedVoteCount;
        }
      });
  },
});

export default postSlice.reducer;
