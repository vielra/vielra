// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { RootState } from '@/plugins/redux';
import { IUser } from '@/modules/user/interfaces';
import { authUtils } from '../utilities';

// type for our state
export type AuthSliceState = {
  openBottomSheetConfirmLogout: boolean;
};

// initial state
export const auth_initialState: AuthSliceState = {
  openBottomSheetConfirmLogout: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: auth_initialState,
  reducers: {
    auth_setOpenBottomConfirmSheetLogout(state, action: PayloadAction<boolean>) {
      state.openBottomSheetConfirmLogout = action.payload;
    },
    auth_reset() {
      return auth_initialState;
    },
  },
});

export const auth_reducerActions = authSlice.actions;

export const auth_selector = (state: RootState): AuthSliceState => state.auth;
