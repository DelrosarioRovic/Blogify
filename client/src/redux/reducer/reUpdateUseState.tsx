// refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "refresh",
  initialState: {
    refreshCount: 0,
  },
  reducers: {
    incrementRefreshCount(state) {
      state.refreshCount += 1;
    },
  },
});

export const { incrementRefreshCount } = refreshSlice.actions;

export default refreshSlice.reducer;
