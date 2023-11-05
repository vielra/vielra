import { storageUtils } from '@/modules/app/utilities';

const getToken = (): string | null => {
  return storageUtils.getString('TOKEN') ?? null;
};

const saveToken = (token: string): void => {
  storageUtils.saveString('TOKEN', token);
};

const revokeToken = (): void => {
  storageUtils.remove('TOKEN');
};

export const authUtils = {
  getToken,
  saveToken,
  revokeToken,
};
