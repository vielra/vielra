import { combineReducers } from '@reduxjs/toolkit';

// slices & rtk
import { baseApi } from '@/plugins/redux/base.api';
import { appApi, appSlice } from '@/modules/app/redux';
import { settingsSlice } from '@/modules/settings/redux';
import { authApi, authSlice, persistedAuthSlice } from '@/modules/auth/redux';
import { phrasebookApi, phrasebookSlice } from '@/modules/phrasebook/redux';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [appSlice.name]: appSlice.reducer,
  [appApi.reducerPath]: appApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [persistedAuthSlice.name]: persistedAuthSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
  [phrasebookSlice.name]: phrasebookSlice.reducer,
  [phrasebookApi.reducerPath]: phrasebookApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
