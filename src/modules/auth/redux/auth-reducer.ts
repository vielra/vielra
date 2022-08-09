import { IUser } from '@/modules/user';
import { SocialAccountProvider } from '..';
import { AuthActionTypes } from './auth-action-types.enum';
import { AuthActions } from './auth-actions';

export interface AuthState {
  login_isLoading: boolean;
  login_isError: boolean;
  login_errorMessage?: Array<string> | string | null;
  login_isSuccess: boolean;

  register_isLoading: boolean;
  register_isError: boolean;
  register_errorMessage?: Array<string> | string | null;
  register_isSuccess: boolean;
  register_formIsDirty: boolean;

  revokeToken_isLoading: boolean;
  revokeToken_isError: boolean;

  isAuthenticated: boolean;
  authenticatedUser?: IUser | null;
  accessToken?: string | null;
  authProvider?: SocialAccountProvider | null;
}

const initialState: AuthState = {
  login_isLoading: false,
  login_isError: false,
  login_errorMessage: undefined,
  login_isSuccess: false,

  register_isLoading: false,
  register_isError: false,
  register_errorMessage: undefined,
  register_isSuccess: false,
  register_formIsDirty: false,

  revokeToken_isLoading: false,
  revokeToken_isError: false,

  isAuthenticated: false,
  authenticatedUser: null,
  accessToken: null,
  authProvider: null,
};

export const authReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_LOADING:
      return {
        ...state,
        login_isLoading: action.payload,
      };

    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        login_isError: action.payload.status,
        login_errorMessage: action.payload.messages,
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login_isLoading: false,
        login_isError: false,

        isAuthenticated: true,
        authenticatedUser: action.payload.user,
        accessToken: action.payload.token,
      };

    case AuthActionTypes.SET_REGISTER_FORM_IS_DIRTY:
      return {
        ...state,
        register_formIsDirty: action.payload,
      };

    case AuthActionTypes.REGISTER_LOADING:
      return {
        ...state,
        register_isLoading: action.payload,
      };

    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        register_isError: action.payload.status,
        register_errorMessage: action.payload.messages,
      };

    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        register_isLoading: false,
        register_isError: false,

        isAuthenticated: true,
        authenticatedUser: action.payload.user,
        accessToken: action.payload.token,
      };

    case AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_LOADING:
      return {
        ...state,
        login_isLoading: action.payload,
      };

    case AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_FAILURE:
      return {
        ...state,
        login_isError: action.payload.status,
        login_errorMessage: action.payload.messages,
      };

    case AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_SUCCESS:
      return {
        ...state,
        login_isLoading: false,
        login_isError: false,
        authenticatedUser: action.payload.user,
        isAuthenticated: true,
        accessToken: action.payload.token,
        authProvider: action.payload.provider,
      };

    case AuthActionTypes.REVOKE_TOKEN_LOADING:
      return {
        ...state,
        revokeToken_isLoading: action.payload,
      };

    case AuthActionTypes.REVOKE_TOKEN_FAILURE:
      return {
        ...state,
        revokeToken_isError: action.payload,
      };

    case AuthActionTypes.REVOKE_TOKEN_SUCCESS:
      return {
        ...state,
        revokeToken_isLoading: false,
        revokeToken_isError: false,
        isAuthenticated: false,
        accessToken: null,
      };

    case AuthActionTypes.RESET_AUTH_STATE:
      return initialState;

    default:
      return state;
  }
};
