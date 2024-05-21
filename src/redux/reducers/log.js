import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logs: [],
  isLoading: false,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLogs, setIsLoading } = logSlice.actions;

export default logSlice.reducer;
