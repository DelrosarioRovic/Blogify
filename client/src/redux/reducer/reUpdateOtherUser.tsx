// refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

const refreshOtherUserData = createSlice({
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

export const { incrementRefreshCount } = refreshOtherUserData.actions;

export default refreshOtherUserData.reducer;
