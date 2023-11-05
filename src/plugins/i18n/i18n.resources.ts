import { ResourceLanguage } from 'i18next';
import { AppLanguageCode } from '@/modules/app/interfaces';

// translations
import * as Home from '@/modules/dashboard/translations';
import * as Auth from '@/modules/auth/translations';
import * as Settings from '@/modules/settings/translations';

const translations: Record<AppLanguageCode, ResourceLanguage> = {
  en: {
    translation: {
      ...Home.en,
      ...Auth.en,
      ...Settings.en,
    },
  },
  id: {
    translation: {
      ...Home.id,
      ...Auth.id,
      ...Settings.id,
    },
  },
  vi: {
    translation: {
      ...Home.vi,
      ...Auth.vi,
      ...Settings.vi,
    },
  },
};

// use it i18nConfig.translations
export const i18nConfig = {
  translations,
};
