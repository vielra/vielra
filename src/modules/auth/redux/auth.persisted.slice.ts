// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { RootState } from '@/plugins/redux';
import { IUser } from '@/modules/user/interfaces';
import { authUtils } from '@/modules/auth/utilities';

// type for our state
export type PersistedAuthSliceState = {
  user: IUser | null;
  // token: string | null; // WE DON'T NEED TO SAVE TOKEN TO THIS SLICE
};

// initial state
export const persistedAuth_initialState: PersistedAuthSliceState = {
  user: null,
};

export const persistedAuthSlice = createSlice({
  name: 'auth.persisted',
  initialState: persistedAuth_initialState,
  reducers: {
    persistedAuth_setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    persistedAuth_reset() {
      authUtils.revokeToken();
      return persistedAuth_initialState;
    },
  },
});

export const persistedAuth_reducerActions = persistedAuthSlice.actions;

export const persistedAuth_selector = (state: RootState): PersistedAuthSliceState => state['auth.persisted'];
