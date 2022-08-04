import Config from 'react-native-config';

export const API_BASE_URL = Config.API_BASE_URL;

export const __DEV__ = true; // hardcoded
export const DB_FORMAT_TIMESTAMPS = 'YYYY-MM-DD HH:mm:ss';
export * from './routes.constant';
