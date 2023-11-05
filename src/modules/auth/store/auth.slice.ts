import { createSlice } from '@reduxjs/toolkit';

// Interfaces
import { IUser } from '@/features/user/interfaces';
import { RootState } from '@/plugins/redux';

import { auth_login, auth_register, auth_logout, auth_loginWithSocialAccount, auth_resetPassword } from './auth.thunk';
import { AuthUtils } from '@/features/auth/utils';

// type for our state
export type AuthSliceType = {
  token: string | null;
  user: IUser | null;
};

// Initial state
export const auth_initialState: AuthSliceType = {
  token: null,
  user: null,
};

// Actual Slice
export const persistedAuthSlice = createSlice({
  name: 'auth',
  initialState: auth_initialState,
  reducers: {
    // Action to set the authentication status
    auth_setUser(state, action) {
      state.user = action.payload;
    },
    auth_setToken(state, action) {
      state.token = action.payload;
    },
    auth_resetPersistAuth: () => auth_initialState,
  },

  extraReducers: (builder) => {
    // Login
    builder.addCase(auth_login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      AuthUtils.saveUserAccessToken(action.payload.token);
    });

    // Register
    builder.addCase(auth_register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      AuthUtils.saveUserAccessToken(action.payload.token);
    });

    // External login with social account
    builder.addCase(auth_loginWithSocialAccount.fulfilled, (state, action) => {
      if (action.payload?.user && action.payload?.token) {
        state.user = action.payload.user as IUser;
        state.token = action.payload.token as string;
        AuthUtils.saveUserAccessToken(action.payload.token);
      }
    });

    // Password reset
    /**
     * When password reset is success
     * Set user & token
     */
    builder.addCase(auth_resetPassword.fulfilled, (state, action) => {
      if (action.payload?.user && action.payload?.token) {
        state.user = action.payload.user as IUser;
        state.token = action.payload.token as string;
        AuthUtils.saveUserAccessToken(action.payload.token);
      }
    });

    builder.addCase(auth_logout.pending, (state) => {});
    builder.addCase(auth_logout.rejected, (state) => {
      // Also reset auth state when revoke token failure
      return { ...auth_initialState };
    });
    builder.addCase(auth_logout.fulfilled, (state) => {
      return { ...auth_initialState };
    });
  },
});

export const persistAuthActions = persistedAuthSlice.actions;

export const auth_select = (state: RootState): AuthSliceType => state.persistedAuth;
