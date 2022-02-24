import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'b910652e46msh564093d0e4200abp189525jsndc888beb7594'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getGlobalStats: builder.query({
            query: () => createRequest('/stats')
        }),
        getCoins: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCoinDetails: builder.query({
            query: (id) => createRequest(`/coin/${id}`)
        }),
        getCoinHistory: builder.query({
            query: ({id, timePeriod}) => createRequest(`/coin/${id}/history?timePeriod=${timePeriod}`)
        })
    })
});

export const {
    useGetGlobalStatsQuery,
    useGetCoinsQuery,
    useGetCoinDetailsQuery,
    useGetCoinHistoryQuery,
} = cryptoApi;