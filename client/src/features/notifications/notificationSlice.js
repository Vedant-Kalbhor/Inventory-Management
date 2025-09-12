import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'notifications',
  initialState: { list: [] },
  reducers: {
    pushNotification(state, action) {
      state.list.unshift({ id: Date.now().toString(), read: false, ...action.payload });
      if (state.list.length > 50) state.list.pop();
    },
    markRead(state, action) {
      const id = action.payload;
      const item = state.list.find(n => n.id === id);
      if (item) item.read = true;
    },
    markAllRead(state) {
      state.list.forEach(n => (n.read = true));
    }
  }
});

export const { pushNotification, markRead, markAllRead } = slice.actions;
export default slice.reducer;
