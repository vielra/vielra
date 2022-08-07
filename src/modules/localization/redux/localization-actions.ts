import { LocalizationActionTypes } from './localization-action-types.enum';

// Interfaces
import { AppLanguage } from '@/modules/localization';

// Action definitions
export interface ILocalizationSetLanguage {
  type: LocalizationActionTypes.SET_LANGUAGE;
  payload: AppLanguage;
}

// Union action types
export type LocalizationActions = ILocalizationSetLanguage;

// Actions creators.
export const localization_actionSetLanguage = (payload: AppLanguage): ILocalizationSetLanguage => ({
  type: LocalizationActionTypes.SET_LANGUAGE,
  payload,
});
