import type { SimpleEffect, SagaIterator } from '@redux-saga/types';
import axios, { AxiosError } from 'axios';
import { SagaReturnType, put, call, takeLatest, select } from 'redux-saga/effects';
import { AuthActionTypes } from './auth-action-types.enum';

// Action creators
import {
  auth_actionRegisterFailure,
  auth_actionRegisterLoading,
  auth_actionRegisterSuccess,
  auth_actionLoginLoading,
  auth_actionLoginFailure,
  auth_actionLoginSuccess,
  auth_actionLoginWithSocialAccountLoading,
  auth_actionLoginWithSocialAccountFailure,
  auth_actionLoginWithSocialAccountSuccess,
  auth_actionRevokeTokenLoading,
  auth_actionRevokeTokenFailure,
  auth_actionRevokeTokenSuccess,
  auth_actionResetAuthState,
} from './auth-actions';
import { toast_actionSetToast } from '@/modules/toast/redux';

// Api service
import { AuthApiService, GoogleSignInService } from '@/modules/auth/services';

// Interfaces
import {
  IRequestLogin,
  IRequestLoginSocialAccount,
  IRequestRegister,
  SocialAccountProvider,
} from '@/modules/auth/interfaces';
import { IServerValidationError } from '@/modules/common/interfaces/server-validation-error';

// Utils.
import { removeToken, saveToken } from '@/utils';
import { ISagaEffectWithNavigateFunction } from '@/modules/common';
import { RoutesConstant } from '@/constants';
import { AuthState } from '@/modules/auth/redux';
import { RootState } from '@/store/root-reducer';

// Type definitions of return of result.
type TResponseRegister = SagaReturnType<typeof AuthApiService.register>;
type TResponseLogin = SagaReturnType<typeof AuthApiService.loginWithEmailAndPassword>;
type ResponseLoginSocialAccount = TResponseLogin;
type TResponseRevokeToken = SagaReturnType<typeof AuthApiService.revokeToken>;

const getRootState = (state: RootState) => state.auth;

type RegisterEffect = SimpleEffect<typeof AuthActionTypes.REGISTER_REQUESTED, IRequestRegister>;
function* saga_register({ payload }: RegisterEffect): SagaIterator {
  yield put(auth_actionRegisterLoading(true));
  try {
    const { status, data }: TResponseRegister = yield call(AuthApiService.register, payload);
    if (status === 201) {
      const token = data.token;
      if (token) {
        saveToken(token).then(() => {
          console.log('Token has been saved!');
        });
      }
      yield put(auth_actionRegisterSuccess(data.user, token));
    }
  } catch (e) {
    // check if the error was thrown from axios
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<IServerValidationError>;

      // do something
      if (e.response?.status === 422) {
        console.log('Response error', e.response);
        yield put(auth_actionRegisterLoading(false));
        yield put(auth_actionRegisterFailure(true, e.response?.data as string[]));

        // Dispatch toast
        yield put(
          toast_actionSetToast({
            show: true,
            messages: error.response?.data.message ?? 'Register failed, please check your information',
            severity: 'error',
            variant: 'filled',
            autoHide: true,
            placement: 'bottom',
          }),
        );
      } else {
        // Another server error
        yield put(auth_actionRegisterLoading(false));
        yield put(auth_actionRegisterFailure(true, 'Internal server error!'));
        yield put(
          toast_actionSetToast({
            show: true,
            messages: 'Server error!',
            severity: 'error',
            variant: 'filled',
            autoHide: true,
            placement: 'bottom',
          }),
        );
      }
    } else {
      // do something else
      // or creating a new error
      yield put(auth_actionRegisterLoading(false));
      yield put(auth_actionRegisterFailure(true));

      throw new Error('different error than axios');
    }

    const error = e as AxiosError<unknown>;
    console.log('error', error);
    yield put(auth_actionRegisterFailure(true));
    yield put(auth_actionRegisterLoading(false));
  }
}

type LoginEffect = SimpleEffect<typeof AuthActionTypes.LOGIN_REQUESTED, IRequestLogin>;
function* saga_login({ payload }: LoginEffect): SagaIterator {
  yield put(auth_actionLoginLoading(true));
  try {
    const { status, data }: TResponseLogin = yield call(AuthApiService.loginWithEmailAndPassword, payload);
    if (status === 200) {
      const token = data.token;
      if (token) {
        saveToken(token).then(() => {
          console.log('Token has been saved!');
        });
      }
      yield put(auth_actionLoginSuccess(data.user, token));
      // Dispatch toast
      yield put(
        toast_actionSetToast({
          show: true,
          messages: 'Login success!',
          severity: 'success',
          variant: 'filled',
          autoHide: true,
          placement: 'bottom',
        }),
      );
    }
  } catch (e) {
    yield put(
      toast_actionSetToast({
        show: true,
        messages: 'Login failed!',
        severity: 'error',
        variant: 'filled',
        autoHide: true,
        placement: 'bottom',
      }),
    );

    yield put(auth_actionLoginFailure(true));
    yield put(auth_actionLoginLoading(false));
  }
}

// prettier-ignore
type LoginSocialAccountEffect = ISagaEffectWithNavigateFunction<typeof AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_REQUESTED, { provider: SocialAccountProvider; data: IRequestLoginSocialAccount }>;
function* saga_loginSocialAccount(params: LoginSocialAccountEffect) {
  const { payload, navigate } = params;
  yield put(auth_actionLoginWithSocialAccountLoading(true));
  try {
    // prettier-ignore
    const { status, data }: ResponseLoginSocialAccount = yield call(AuthApiService.loginSocialAccount, payload.provider, payload.data);
    if (status === 200) {
      const token = data.token;
      if (token) {
        saveToken(token).then(() => {
          console.log('Token has been saved!');
        });
      }
      yield put(auth_actionLoginWithSocialAccountSuccess(data.user, params.payload.provider, data.token));

      // Dispatch toast
      yield put(
        toast_actionSetToast({
          show: true,
          messages: 'Login success!',
          severity: 'success',
          variant: 'filled',
          autoHide: true,
          placement: 'bottom',
        }),
      );

      // Navigate to home screen.
      navigate(RoutesConstant.RootStack.BottomTabStack);
    }
  } catch (e) {
    yield put(
      toast_actionSetToast({
        show: true,
        messages: 'Login failed!',
        severity: 'error',
        variant: 'filled',
        autoHide: true,
        placement: 'bottom',
      }),
    );

    yield put(auth_actionLoginWithSocialAccountFailure(true));
    yield put(auth_actionLoginWithSocialAccountLoading(false));
  }
}

// type RevokeTokenEffect = SimpleEffect<typeof AuthActionTypes.REVOKE_TOKEN_REQUESTED, string>;
function* saga_revokeToken() {
  const state: AuthState = yield select(getRootState);

  yield put(auth_actionRevokeTokenLoading(true));
  try {
    const { status }: TResponseRevokeToken = yield call(AuthApiService.revokeToken, String(state.accessToken));
    if (status === 200) {
      // Token has been revoked from server
      yield put(auth_actionRevokeTokenSuccess());

      // Also revoke token from provider
      if (state.authProvider === 'google') {
        GoogleSignInService.revokeAccess();
      }

      // Reset auth state.
      yield put(auth_actionResetAuthState());

      // Remove token from storage.
      removeToken();

      // Dispatch toast
      yield put(
        toast_actionSetToast({
          show: true,
          messages: 'Goodbye',
          severity: 'success',
          variant: 'filled',
          autoHide: true,
          placement: 'bottom',
        }),
      );
    }
  } catch (e) {
    // Howover remove access token from storage.
    removeToken();

    yield put(auth_actionRevokeTokenFailure(true));
    yield put(auth_actionRevokeTokenLoading(false));

    // Reset auth state.
    yield put(auth_actionResetAuthState());
  }
}

export const authSaga = function* () {
  yield takeLatest(AuthActionTypes.REGISTER_REQUESTED, saga_register);
  yield takeLatest(AuthActionTypes.LOGIN_REQUESTED, saga_login);
  yield takeLatest(AuthActionTypes.LOGIN_SOCIAL_ACCOUNT_REQUESTED, saga_loginSocialAccount);
  yield takeLatest(AuthActionTypes.REVOKE_TOKEN_REQUESTED, saga_revokeToken);
};
