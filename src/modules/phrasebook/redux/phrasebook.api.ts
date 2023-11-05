import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { appConfig } from '@/modules/app/configs';
import { IPhrase, IPhraseCategory, IPhrasebook, IRequestCreatePhrase } from '@/modules/phrasebook/interfaces';

// utils
import { authUtils } from '@/modules/auth/utilities';

interface IRequestGetListPhrase {
  category: IPhraseCategory['slug'] | null;
  limit?: number | null;
}

export const phrasebookApi = createApi({
  reducerPath: 'phrasebook_api',
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiBaseUrl,
    prepareHeaders(headers, { getState }) {
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
    getListPhraseCategory: builder.query<Array<IPhraseCategory>, undefined>({
      query: (body) => ({
        url: '/phrasebook/category',
        body,
      }),
    }),
    getListPhrase: builder.query<IPhrasebook, IRequestGetListPhrase>({
      query: (params) => ({
        url: '/phrasebook/phrase',
        params,
      }),
    }),
    createPhrase: builder.mutation<IPhrase, IRequestCreatePhrase>({
      query: (body) => ({
        url: '/phrasebook/phrase',
        method: 'POST',
        body,
      }),
    }),
    deletePhrase: builder.mutation<{ message: string }, { phraseIds: Array<IPhrase['id']> }>({
      query: (body) => ({
        url: '/phrasebook/phrase/delete',
        method: 'POST',
        body,
      }),
    }),
  }),
});
