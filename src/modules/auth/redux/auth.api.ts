// types
import { IUser } from '@/modules/user/interfaces';

// rtk
import { RootState } from '@/plugins/redux';

// utils
import { authUtils } from '@/modules/auth/utilities';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { appConfig } from '@/modules/app/configs';

interface IResponseUserWithToken {
  token: string;
  user: IUser;
}

interface IRequestLogin {
  email: string;
  password: string;
  token_name?: string | null;
}

interface IRequestRegister {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  photoUrl?: string | null;
}

interface IRequestSendLinkResetPassword {
  email: string;
}

interface IRequestResetPassword {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

interface IRequestVerifyTokenPasswordReset {
  token: string;
  email: string;
}

interface IResponseLogin extends IResponseUserWithToken {}

interface IResponseRegister extends IResponseUserWithToken {}

interface IResponseResetPassword extends IResponseUserWithToken {}

interface IResponseSendLinkResetPassword {
  success: boolean;
}

export const authApi = createApi({
  reducerPath: 'auth_api',
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiBaseUrl,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      const sanctumToken = authUtils.getToken();
      if (sanctumToken) {
        headers.set('Authorization', `Bearer ${sanctumToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginWithEmailAndPassword: builder.mutation<IResponseLogin, IRequestLogin>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    registerWithEmailAndPassword: builder.mutation<IResponseRegister, IRequestRegister>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    sendRecoveryLink: builder.mutation<IResponseSendLinkResetPassword, IRequestSendLinkResetPassword>({
      query: (body) => ({
        url: '/auth/send-reset-password-link',
        method: 'POST',
        body,
      }),
    }),
    verifyTokenPasswordReset: builder.mutation<IUser, IRequestVerifyTokenPasswordReset>({
      query: (body) => ({
        url: '/auth/password-reset/verify',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<IResponseResetPassword, IRequestResetPassword>({
      query: (body) => ({
        url: '/auth/password-reset/verify',
        method: 'POST',
        body,
      }),
    }),
    revokeToken: builder.mutation<unknown, { currentAccessToken: string }>({
      query: (body) => ({
        url: '/auth/revoke-token',
        method: 'POST',
        body,
      }),
    }),
    getAuthenticatedUser: builder.query<IUser, string | undefined>({
      query: (token) => ({
        headers: {
          Authorization: `Bearer ${token ? token : authUtils.getToken()}`,
        },
        url: '/auth/user',
      }),
    }),
  }),
});

// export const authApi = baseApi.injectEndpoints({

// });
