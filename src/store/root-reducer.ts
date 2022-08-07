// Redux.
import { combineReducers } from 'redux';

// Reducers.
import { themeReducer, ThemeState } from '@/modules/theme/redux';
import { authReducer, AuthState } from '@/modules/auth/redux';
import { toastReducer, ToastState } from '@/modules/toast/redux';
import { localizationReducer, LocalizationState } from '@/modules/localization';

// Root State.
export type RootState = {
  theme: ThemeState;
  auth: AuthState;
  toast: ToastState;
  localization: LocalizationState;
};

export default combineReducers<RootState>({
  theme: themeReducer,
  auth: authReducer,
  toast: toastReducer,
  localization: localizationReducer,
});
