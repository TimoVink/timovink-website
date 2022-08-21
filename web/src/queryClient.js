import { useQuery, QueryClient } from '@tanstack/react-query'
import axios from 'axios';

export const queryClient = new QueryClient()

const makeGetRequest = (url) => axios
    .get(url, { responseType: 'text', transformResponse: [x => x] })
    .then((res) => res.data);

export const useApiCall = (url, options) => useQuery([url], () => makeGetRequest(url), options);
