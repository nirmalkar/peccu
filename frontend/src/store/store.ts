import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { passagesReducer } from './slices/passageSlice';
import { pronunciationReducer } from './slices/pronunciationSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    pronunciation: pronunciationReducer,
    theme: themeReducer,
    passages: passagesReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
