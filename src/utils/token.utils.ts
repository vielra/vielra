import AsyncStorage from '@react-native-async-storage/async-storage';

// App config.
import { AppConfig } from '@/config';

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(AppConfig.AccessTokenKey, token);
  } catch (error) {
    console.log('Failed to save user token', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    let accessToken = await AsyncStorage.getItem(AppConfig.AccessTokenKey);
    return accessToken;
  } catch (error) {
    console.log('Failed to get user token', error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AppConfig.AccessTokenKey);
    console.log('Token has been removed');
  } catch (error) {
    console.log('Failed to remove user token', error);
  }
};
