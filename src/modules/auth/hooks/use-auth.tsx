import { useAppSelector } from '@/store';
import { useMemo } from 'react';
import { AuthState, auth_rootSelector } from '@/modules/auth/redux';

export interface IUseAuth extends Pick<AuthState, 'authenticatedUser'> {
  isLoggedIn: boolean;
}

export const useAuth = (): IUseAuth => {
  const { authenticatedUser, isAuthenticated } = useAppSelector((s) => auth_rootSelector(s));

  const isLoggedIn = useMemo(() => {
    if (isAuthenticated && authenticatedUser !== null) {
      return true;
    } else {
      return false;
    }
  }, [isAuthenticated, authenticatedUser]);

  return { isLoggedIn, authenticatedUser };
};
