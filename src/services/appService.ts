import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthor, ILocation, IPainting } from 'src/models';

const API_URL = 'https://test-front.framework.team';

export type PaintingsListQuerySettings = {
  id?: number;
  q?: string;
  _gte?: string;
  _lte?: string;
  _page?: number;
  _limit?: number;
  anyObjectField?: string | number;
} & Partial<Omit<IPainting, 'id' | 'imageUrl'>>;

export type AuthorsListQuerySettings = {};

export type LocationsListQuerySettings = {};

export const appAPI = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    fetchPaintings: build.query<
    { total: number; items: IPainting[] },
    PaintingsListQuerySettings
    >({
      query: (settings: PaintingsListQuerySettings) => ({
        url: '/paintings',
        params: { ...settings },
      }),
      transformResponse: (response: IPainting[], meta) => ({
        total: Number(meta?.response?.headers.get('x-total-count')),
        items: response.map((paint) => ({
          ...paint,
          imageUrl: API_URL + paint.imageUrl,
        })),
      }),
      transformErrorResponse: (response: { status: string | number }) => response,
    }),

    fetchAuthors: build.query<IAuthor[], AuthorsListQuerySettings>({
      query: (settings: AuthorsListQuerySettings) => ({
        url: '/authors',
        params: { ...settings },
      }),
      transformResponse: (response: IAuthor[]) => response,
      transformErrorResponse: (response: { status: string | number }) => response,
    }),

    fetchLocations: build.query<ILocation[], LocationsListQuerySettings>({
      query: (settings: LocationsListQuerySettings) => ({
        url: '/locations',
        params: { ...settings },
      }),
      transformResponse: (response: ILocation[]) => response,
      transformErrorResponse: (response: { status: string | number }) => response,
    }),
  }),
});
