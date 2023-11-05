import { useMemo } from 'react';
import { useAppSelector } from '@/plugins/redux';

// app slice
import { auth_selector, auth_reducerActions, authApi } from '@/modules/auth/redux';

// utils
import { authUtils } from '@/modules/auth/utilities';

export const useAuth = () => {
  const authState = useAppSelector(auth_selector);

  const isAuthenticated = useMemo(() => {
    return Boolean(authState.user) && Boolean(authUtils.getToken());
  }, [authState?.user?.id]);

  const [auth_getUser, { isLoading: auth_getUserIsLoading }] = authApi.useLazyGetAuthenticatedUserQuery();

  // prettier-ignore
  const [auth_login, { isLoading: auth_loginIsLoading, error: auth_loginError }] = authApi.useLoginWithEmailAndPasswordMutation();

  // prettier-ignore
  const [auth_register, { isLoading: auth_registerIsLoading }] = authApi.useRegisterWithEmailAndPasswordMutation();

  // prettier-ignore
  const [auth_revokeToken, { isLoading: auth_revokeTokenIsLoading }] = authApi.useRevokeTokenMutation();

  return {
    isAuthenticated,
    isLoggedIn: isAuthenticated,
    ...authState,
    ...auth_reducerActions,
    auth_getUser,
    auth_getUserIsLoading,
    auth_login,
    auth_loginIsLoading,
    auth_loginError,
    auth_register,
    auth_registerIsLoading,
    auth_revokeToken,
    auth_revokeTokenIsLoading,
  };
};
