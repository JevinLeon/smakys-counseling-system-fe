import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUsers, setUser, setIsLoading } = userSlice.actions;

export default userSlice.reducer;
