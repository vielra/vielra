// Redux.
import { combineReducers } from 'redux';

// Reducers.
import { themeReducer, ThemeState } from '@/modules/theme/redux';
import { authReducer, AuthState } from '@/modules/auth/redux';
import { toastReducer, ToastState } from '@/modules/toast/redux';
import { localizationReducer, LocalizationState } from '@/modules/localization';
import { phrasebookReducer, PhrasebookState } from '@/modules/phrasebook/redux';
import { commonReducer, CommonState } from '@/modules/common/redux';

// Root State.
export type RootState = {
  theme: ThemeState;
  auth: AuthState;
  toast: ToastState;
  common: CommonState;
  localization: LocalizationState;
  phrasebook: PhrasebookState;
};

export default combineReducers<RootState>({
  theme: themeReducer,
  auth: authReducer,
  toast: toastReducer,
  common: commonReducer,
  localization: localizationReducer,
  phrasebook: phrasebookReducer,
});
