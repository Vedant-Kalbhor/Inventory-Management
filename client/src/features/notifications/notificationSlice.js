import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notifications",
  initialState: { list: [] },
  reducers: {
    pushNotification(state, action) {
      state.list.unshift({
        id: Date.now(),
        read: false,
        timestamp: new Date(),
        ...action.payload
      });
    },
    markAllRead(state) {
      state.list.forEach(n => (n.read = true));
    }
  }
});

export const { pushNotification, markAllRead } = slice.actions;
export default slice.reducer;
