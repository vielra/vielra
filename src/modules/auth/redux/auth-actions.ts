import {
  IRequestLogin,
  IRequestLoginSocialAccount,
  IRequestRegister,
  SocialAccountProvider,
} from '@/modules/auth/interfaces';
import { IActionBooleanPayload } from '@/modules/common';
import { IUser } from '@/modules/user';
import { AuthActionTypes } from './auth-action-types.enum';

// Action definitions
export interface IAuthLoginRequested {
  type: AuthActionTypes.LOGIN_REQUESTED;
  payload: IRequestLogin;
}
export interface IAuthLoginLoading extends IActionBooleanPayload {
  type: AuthActionTypes.LOGIN_LOADING;
}
export interface IAuthLoginFailure {
  type: AuthActionTypes.LOGIN_FAILURE;
  payload: {
    status: boolean;
    messages?: Array<string> | string | null;
  };
}
export interface IAuthLoginSuccess {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: { user: IUser; token: string };
}

export interface ISetRegisterFormIsDirty extends IActionBooleanPayload {
  type: AuthActionTypes.SET_REGISTER_FORM_IS_DIRTY;
}

export interface IAuthRegisterRequested {
  type: AuthActionTypes.REGISTER_REQUESTED;
  payload: IRequestRegister;
}
export interface IAuthRegisterLoading extends IActionBooleanPayload {
  type: AuthActionTypes.REGISTER_LOADING;
}
export interface IAuthRegisterFailure {
  type: AuthActionTypes.REGISTER_FAILURE;
  payload: {
    status: boolean;
    messages?: Array<string> | string | null;
  };
}
export interface IAuthRegisterSuccess {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: { user: IUser; token: string };
}

interface IPayloadLoginSocialAccount {
  provider: SocialAccountProvider;
  data: IRequestLoginSocialAccount;
}

export interface IAuthLoginWithSocialAccountRequested {
  type: AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_REQUESTED;
  payload: IPayloadLoginSocialAccount;
  navigate: (routeName: string) => void;
}
export interface IAuthLoginWithSocialAccountLoading extends IActionBooleanPayload {
  type: AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_LOADING;
}
export interface IAuthLoginWithSocialAccountFailure {
  type: AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_FAILURE;
  payload: {
    status: boolean;
    messages?: Array<string> | string | null;
  };
}
export interface IAuthLoginWithSocialAccountSuccess {
  type: AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_SUCCESS;
  payload: {
    user: IUser;
    provider: SocialAccountProvider;
    token: string;
  };
}

export interface IAuthRevokeTokenRequested {
  type: AuthActionTypes.REVOKE_TOKEN_REQUESTED;
}

export interface IAuthRevokeTokenLoading extends IActionBooleanPayload {
  type: AuthActionTypes.REVOKE_TOKEN_LOADING;
}

export interface IAuthRevokeTokenFailure extends IActionBooleanPayload {
  type: AuthActionTypes.REVOKE_TOKEN_FAILURE;
}

export interface IAuthRevokeTokenSuccess {
  type: AuthActionTypes.REVOKE_TOKEN_SUCCESS;
}

export interface IAuthResetAuthState {
  type: AuthActionTypes.RESET_AUTH_STATE;
}

// Union action types
export type AuthActions =
  | IAuthLoginRequested
  | IAuthLoginLoading
  | IAuthLoginFailure
  | IAuthLoginSuccess
  | ISetRegisterFormIsDirty
  | IAuthRegisterRequested
  | IAuthRegisterLoading
  | IAuthRegisterFailure
  | IAuthRegisterSuccess
  | IAuthLoginWithSocialAccountRequested
  | IAuthLoginWithSocialAccountLoading
  | IAuthLoginWithSocialAccountFailure
  | IAuthLoginWithSocialAccountSuccess
  | IAuthRevokeTokenRequested
  | IAuthRevokeTokenLoading
  | IAuthRevokeTokenFailure
  | IAuthRevokeTokenSuccess
  | IAuthResetAuthState;

// Actions creators.
export const auth_actionLogin = (payload: IRequestLogin): IAuthLoginRequested => ({
  type: AuthActionTypes.LOGIN_REQUESTED,
  payload,
});
export const auth_actionLoginLoading = (payload: boolean): IAuthLoginLoading => ({
  type: AuthActionTypes.LOGIN_LOADING,
  payload,
});

// prettier-ignore
export const auth_actionLoginFailure = (status: boolean, messages?: Array<string> | string | null): IAuthLoginFailure => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  payload: { status, messages },
});

export const auth_actionLoginSuccess = (user: IUser, token: string): IAuthLoginSuccess => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: { user, token },
});

export const auth_actionSetRegisterFormIsDirty = (payload: boolean): ISetRegisterFormIsDirty => ({
  type: AuthActionTypes.SET_REGISTER_FORM_IS_DIRTY,
  payload,
});

export const auth_actionRegister = (payload: IRequestRegister): IAuthRegisterRequested => ({
  type: AuthActionTypes.REGISTER_REQUESTED,
  payload,
});

export const auth_actionRegisterLoading = (payload: boolean): IAuthRegisterLoading => ({
  type: AuthActionTypes.REGISTER_LOADING,
  payload,
});

// prettier-ignore
export const auth_actionRegisterFailure = (status: boolean, messages?: Array<string> | string | null): IAuthRegisterFailure => ({
  type: AuthActionTypes.REGISTER_FAILURE,
  payload: { status, messages },
});

export const auth_actionRegisterSuccess = (user: IUser, token: string): IAuthRegisterSuccess => ({
  type: AuthActionTypes.REGISTER_SUCCESS,
  payload: { user, token },
});

// prettier-ignore
export const auth_actionLoginWithSocialAccount = (payload: IPayloadLoginSocialAccount, navigate: (routeName: string) => void): IAuthLoginWithSocialAccountRequested => ({
  type: AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_REQUESTED,
  payload,
  navigate,
});

export const auth_actionLoginWithSocialAccountLoading = (payload: boolean): IAuthLoginWithSocialAccountLoading => ({
  type: AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_LOADING,
  payload,
});

// prettier-ignore
export const auth_actionLoginWithSocialAccountFailure = (status: boolean, messages?: Array<string> | string | null): IAuthLoginWithSocialAccountFailure => ({
  type: AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_FAILURE,
  payload: { status, messages },
});

// prettier-ignore
export const auth_actionLoginWithSocialAccountSuccess = (user: IUser, provider: SocialAccountProvider, token: string): IAuthLoginWithSocialAccountSuccess => ({
  type: AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_SUCCESS,
  payload: { user, provider, token },
});

export const auth_actionRevokeToken = (): IAuthRevokeTokenRequested => ({
  type: AuthActionTypes.REVOKE_TOKEN_REQUESTED,
});

export const auth_actionRevokeTokenLoading = (payload: boolean): IAuthRevokeTokenLoading => ({
  type: AuthActionTypes.REVOKE_TOKEN_LOADING,
  payload,
});

// prettier-ignore
export const auth_actionRevokeTokenFailure = (payload: boolean): IAuthRevokeTokenFailure => ({
  type: AuthActionTypes.REVOKE_TOKEN_FAILURE,
  payload,
});

export const auth_actionRevokeTokenSuccess = (): IAuthRevokeTokenSuccess => ({
  type: AuthActionTypes.REVOKE_TOKEN_SUCCESS,
});

export const auth_actionResetAuthState = (): IAuthResetAuthState => ({
  type: AuthActionTypes.RESET_AUTH_STATE,
});
