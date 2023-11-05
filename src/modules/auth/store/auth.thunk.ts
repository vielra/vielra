import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SocialAuthProvider,
  IRequestLogin,
  IRequestRegister,
  IRequestSendLinkResetPassword,
  IRequestResetPassword,
} from '@/features/auth/interfaces';
import { AuthApi } from '@/features/auth/api';
import { RootState } from '@/plugins/redux';
import { IBaseApiResponseError } from '@/features/app/interfaces';
import { AuthUtils } from '../utils';

interface ILoginWithSocialAccount {
  params: Record<string, string | number>;
  provider: SocialAuthProvider;
}

// const auth_login = createAsyncThunk('@auth/login', async (body: IRequestLogin, { rejectWithValue }) => {
//   try {
//     return await AuthApi.loginWithEmail(body)
//   } catch (err) {
//     return rejectWithValue(err as IBaseApiResponseError)
//   }
// })

const auth_login = createAsyncThunk('@auth/login', async (body: IRequestLogin) => {
  return await AuthApi.loginWithEmail(body);
});

const auth_register = createAsyncThunk('@auth/register', async (body: IRequestRegister, { rejectWithValue }) => {
  try {
    return await AuthApi.register(body);
  } catch (err) {
    return rejectWithValue(err as IBaseApiResponseError);
  }
});

const auth_sendRecoveryLink = createAsyncThunk(
  '@auth/sendRecoveryLink',
  async (body: IRequestSendLinkResetPassword, { rejectWithValue }) => {
    try {
      return await AuthApi.sendRecoveryLink(body);
    } catch (err) {
      return rejectWithValue(err as IBaseApiResponseError);
    }
  },
);

const auth_resetPassword = createAsyncThunk(
  '@auth/resetPassword',
  async (body: IRequestResetPassword, { rejectWithValue }) => {
    try {
      return await AuthApi.resetPassword(body);
    } catch (err) {
      return rejectWithValue(err as IBaseApiResponseError);
    }
  },
);

const auth_loginWithSocialAccount = createAsyncThunk(
  '@auth/loginWithSocialAccount',
  async ({ params, provider }: ILoginWithSocialAccount) => {
    const response = await AuthApi.loginWithSocialAccount(provider, params);
    return response;
  },
);

const auth_logout = createAsyncThunk(
  '@auth/logout',
  async (undefined, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const { persistedAuth: authState } = getState() as RootState;
      const response = await AuthApi.revokeToken({
        currentAccessToken: authState.token || '',
      });
      if (response) return fulfillWithValue(authState.user);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const auth_getAuthenticatedUser = createAsyncThunk(
  '@auth/getAuthenticatedUser',
  async (undefined, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      // const token = await AuthUtils.getUserAccessToken()
      const response = await AuthApi.getAuthenticatedUser();
      if (response) return fulfillWithValue(response);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export {
  auth_login,
  auth_register,
  auth_sendRecoveryLink,
  auth_resetPassword,
  auth_loginWithSocialAccount,
  auth_logout,
  auth_getAuthenticatedUser,
};
