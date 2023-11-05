// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// i18n
import i18n from 'i18next';

// types
// import { RootState } from '@/store/root-reducer';
import { AppLanguageCode } from '@/modules/app/interfaces';

// app config
import { appConfig } from '@/modules/app/configs';
import { RootState } from '@/plugins/redux';
import { PaletteMode } from '@/modules/theme/interfaces';

// type for our state
export type AppSliceState = {
  splashScreenVisible: boolean;
  bottomTabVisible: boolean;
  alreadyLaunched: boolean;
  language: AppLanguageCode;
  paletteMode: PaletteMode | null;
};

// initial state
export const app_initialState: AppSliceState = {
  splashScreenVisible: true,
  bottomTabVisible: true,
  alreadyLaunched: false,
  language: appConfig.defaultLang as AppLanguageCode,
  paletteMode: 'light',
};

export const appSlice = createSlice({
  name: 'app',
  initialState: app_initialState,
  reducers: {
    app_setSplashScreenVisible(state, action: PayloadAction<boolean>) {
      state.splashScreenVisible = action.payload;
    },
    app_setBottomTabVisible(state, action: PayloadAction<boolean>) {
      state.bottomTabVisible = action.payload;
    },
    app_setAlreadyLaunched(state, action: PayloadAction<boolean>) {
      state.alreadyLaunched = action.payload;
    },
    app_setPaletteMode(state, action: PayloadAction<PaletteMode>) {
      state.paletteMode = action.payload;
    },
    app_togglePaletteMode(state) {
      state.paletteMode = state.paletteMode === 'dark' ? 'light' : 'dark';
    },
    app_setLanguage(state, action: PayloadAction<AppLanguageCode>) {
      i18n.changeLanguage(action.payload);
      state.language = action.payload;
    },
  },
});

export const app_reducerActions = appSlice.actions;

export const app_selector = (state: RootState): AppSliceState => state.app;
