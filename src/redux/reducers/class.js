import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [],
  _class: null,
  isLoading: false,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    setClass: (state, action) => {
      state._class = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setClasses, setClass, setIsLoading } = classSlice.actions;

export default classSlice.reducer;
