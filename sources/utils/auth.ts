import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export const saveAuthData = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getAuthToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const clearAuthData = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};