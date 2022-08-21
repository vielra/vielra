import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

import { getToken } from '@/utils';
import { API_BASE_URL } from '@/constants';

const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const accessToken = await getToken();
  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  if (__DEV__) {
    console.error(`❌❌❌ Request error -> ${JSON.stringify(error)}`);
  }
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (__DEV__) {
    console.log('💚💚💚 Response success ->', response);
  }
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (__DEV__) {
    if ((error.response?.status as number) === 403) {
      console.log('Error');
    }
  }
  // Check if network disconnected
  if (error.code === 'ECONNABORTED') {
    console.error('❌❌❌ Response error ->', 'Something when wrong with your connection', error);
  }
  return Promise.reject(error);
};

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export const http = setupInterceptorsTo(
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
);
