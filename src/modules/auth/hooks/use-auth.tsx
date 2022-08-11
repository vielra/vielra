import { useAppSelector } from '@/store';
import { useMemo } from 'react';
import { AuthState, auth_rootSelector } from '@/modules/auth/redux';

export interface IUseAuth extends AuthState {
  isLoggedIn: boolean;
}

export const useAuth = (): IUseAuth => {
  const { authenticatedUser, isAuthenticated, accessToken, ...rest } = useAppSelector((s) => auth_rootSelector(s));

  const isLoggedIn = useMemo(() => {
    if (isAuthenticated && authenticatedUser !== null && accessToken) {
      return true;
    } else {
      return false;
    }
  }, [isAuthenticated, authenticatedUser]);

  return { ...rest, isLoggedIn, authenticatedUser, isAuthenticated, accessToken };
};
