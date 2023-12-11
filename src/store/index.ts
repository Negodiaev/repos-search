import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { githubApi } from './github/github.api';
import { githubReducer } from './github/github.slice';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware),
});

setupListeners(store.dispatch);

export type TRootState = ReturnType<typeof store.getState>;
