import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentsSlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});
