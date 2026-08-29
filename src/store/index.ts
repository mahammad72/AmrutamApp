import { configureStore } from '@reduxjs/toolkit';

import {
  baseApi,
} from '../services/api/baseApi';

import consultationReducer from '../features/consultation/store/consultationSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]:
      baseApi.reducer,

    consultation:
      consultationReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
    ),
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;