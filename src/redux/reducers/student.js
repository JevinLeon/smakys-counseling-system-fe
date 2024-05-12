import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  student: null,
  isLoading: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setStudents, setStudent, setIsLoading } = studentSlice.actions;

export default studentSlice.reducer;
