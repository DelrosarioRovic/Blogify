// refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

const refreshUserData = createSlice({
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

export const { incrementRefreshCount } = refreshUserData.actions;

export default refreshUserData.reducer;
