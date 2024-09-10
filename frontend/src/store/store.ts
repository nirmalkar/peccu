import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { pronunciationReducer } from './slices/pronunciationSlice';

export const store = configureStore({
  reducer: {
    pronunciation: pronunciationReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
