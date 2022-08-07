import { AppConfig } from '@/config';
import { AppLanguage } from '../interfaces';
import { LocalizationActionTypes } from './localization-action-types.enum';
import { LocalizationActions } from './localization-actions';

export interface LocalizationState {
  language: AppLanguage;
}

const initialState: LocalizationState = {
  language: AppConfig.SupportedLanguages[0],
};

export const localizationReducer = (
  state: LocalizationState = initialState,
  action: LocalizationActions,
): LocalizationState => {
  switch (action.type) {
    case LocalizationActionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};
