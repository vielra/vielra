// types
// import { RootState } from '@/plugins/redux';

// utils
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { appConfig } from '@/modules/app/configs';

export const appApi = createApi({
  reducerPath: 'app_api',
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiBaseUrl,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    checkServerStatus: builder.query<any, undefined>({
      query: () => ({
        url: '/',
      }),
    }),
  }),
});
