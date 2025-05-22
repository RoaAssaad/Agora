import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: '',
  email: '',
  aura: 0,
  profileImage: '',
  created_at: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, username, email, aura, profileImage, created_at } = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
      state.aura = aura;
      state.profileImage = profileImage;
      state.created_at = created_at;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const { login, logout, updateProfileImage } = userSlice.actions;
export default userSlice.reducer;
