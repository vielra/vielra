import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAddress, IRequestAddress } from '../interfaces';
import { AppConfig } from '@/features/app/config';
import { RootState } from '@/plugins/redux';
import { AuthUtils } from '@/features/auth/utils';

// Define a service using a base URL and expected endpoints
export const authRtk = createApi({
  reducerPath: 'auth_api',
  baseQuery: fetchBaseQuery({
    baseUrl: AppConfig.ApiBaseUrl,
    prepareHeaders(headers, { getState }) {
      const rootState = getState() as RootState;
      if (rootState.auth.token) {
        headers.set('Authorization', `Bearer ${rootState.auth.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createAddress: builder.mutation<IAddress, IRequestAddress>({
      query: (body) => ({
        url: `/account/address`,
        method: 'POST',
        body,
      }),
    }),
    updateAddress: builder.mutation<IAddress, { id: IAddress['id']; body: IRequestAddress }>({
      query: (params) => ({
        url: `/account/address/${params.id}`,
        method: 'PUT',
        body: params.body,
      }),
    }),
    deleteAddress: builder.mutation<{ message: string }, IAddress['id']>({
      query: (id) => ({
        url: `/account/address/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});
