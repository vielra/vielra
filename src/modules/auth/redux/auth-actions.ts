import { IRequestLogin, IRequestRegister } from '@/modules/auth/interfaces';
import { IUser } from '@/modules/user';
import { AuthActionTypes } from './auth-action-types.enum';

// Action definitions
export interface IAuthLoginRequested {
  type: AuthActionTypes.LOGIN_REQUESTED;
  payload: IRequestLogin;
}
export interface IAuthLoginLoading {
  type: AuthActionTypes.LOGIN_LOADING;
  payload: boolean;
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
  payload: IUser;
}

export interface ISetRegisterFormIsDirty {
  type: AuthActionTypes.SET_REGISTER_FORM_IS_DIRTY;
  payload: boolean;
}

export interface IAuthRegisterRequested {
  type: AuthActionTypes.REGISTER_REQUESTED;
  payload: IRequestRegister;
}
export interface IAuthRegisterLoading {
  type: AuthActionTypes.REGISTER_LOADING;
  payload: boolean;
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
  payload: IUser;
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
  | IAuthRegisterSuccess;

// Actions creators.
export const auth_actionLogin = (payload: IRequestLogin): IAuthLoginRequested => ({
  type: AuthActionTypes.LOGIN_REQUESTED,
  payload,
});
export const auth_actionLoginLoading = (payload: boolean): IAuthLoginLoading => ({
  type: AuthActionTypes.LOGIN_LOADING,
  payload,
});
export const auth_actionLoginFailure = (
  status: boolean,
  messages?: Array<string> | string | null,
): IAuthLoginFailure => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  payload: { status, messages },
});

export const auth_actionLoginSuccess = (payload: IUser): IAuthLoginSuccess => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload,
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

export const auth_actionRegisterFailure = (
  status: boolean,
  messages?: Array<string> | string | null,
): IAuthRegisterFailure => ({
  type: AuthActionTypes.REGISTER_FAILURE,
  payload: { status, messages },
});

export const auth_actionRegisterSuccess = (payload: IUser): IAuthRegisterSuccess => ({
  type: AuthActionTypes.REGISTER_SUCCESS,
  payload,
});
