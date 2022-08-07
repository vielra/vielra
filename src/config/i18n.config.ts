import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
import * as Home from '@/modules/home/translations';
import * as Auth from '@/modules/auth/translations';
import * as Settings from '@/modules/settings/translations';

const resources = {
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

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18n;
