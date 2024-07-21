import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appAPI } from '../services/appService';

const rootReduser = combineReducers({
  [appAPI.reducerPath]: appAPI.reducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appAPI.middleware),
  });
}

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
