// redux toolkit
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// @types
import { RootState } from './root-reducer';

// config
import { appConfig } from '@/modules/app/configs';
import { authUtils } from '@/modules/auth/utilities';

export const baseApi = createApi({
  reducerPath: 'api',
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
  endpoints: () => ({}),
});
