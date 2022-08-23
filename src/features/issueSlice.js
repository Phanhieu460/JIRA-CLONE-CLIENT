import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const issueSlice =createSlice({
  name: "issues",
  initialState,
  reducers: {
    createIssue: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { createIssue } = issueSlice.actions;

export default issueSlice.reducer;
