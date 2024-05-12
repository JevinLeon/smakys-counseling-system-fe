import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counselings: [],
  counseling: null,
  isLoading: false,
};

const counselingSlice = createSlice({
  name: "counseling",
  initialState,
  reducers: {
    setCounselings: (state, action) => {
      state.counselings = action.payload;
    },
    setCounseling: (state, action) => {
      state.counseling = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCounselings, setCounseling, setIsLoading } =
  counselingSlice.actions;

export default counselingSlice.reducer;
