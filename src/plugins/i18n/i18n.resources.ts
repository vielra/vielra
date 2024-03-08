import { ResourceLanguage } from 'i18next';
import { AppLanguageCode } from '@/modules/app/interfaces';

// translations
import * as App from '@/modules/app/translations';
import * as Home from '@/modules/dashboard/translations';
import * as Phrasebook from '@/modules/phrasebook/translations';
import * as Auth from '@/modules/auth/translations';
import * as Settings from '@/modules/settings/translations';

const translations: Record<AppLanguageCode, ResourceLanguage> = {
  en: {
    translation: {
      ...App.en,
      ...Home.en,
      ...Phrasebook.en,
      ...Auth.en,
      ...Settings.en,
    },
  },
  id: {
    translation: {
      ...App.id,
      ...Home.id,
      ...Phrasebook.id,
      ...Auth.id,
      ...Settings.id,
    },
  },
  vi: {
    translation: {
      ...App.vi,
      ...Home.vi,
      ...Phrasebook.vi,
      ...Auth.vi,
      ...Settings.vi,
    },
  },
};

// use it i18nConfig.translations
export const i18nConfig = {
  translations,
};
