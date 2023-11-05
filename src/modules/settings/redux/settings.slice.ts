// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// app config
import { RootState } from '@/plugins/redux';

// type for our state
export type SettingsSliceState = {
  openBottomTabLanguage: boolean;
};

// initial state
export const settings_initialState: SettingsSliceState = {
  openBottomTabLanguage: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: settings_initialState,
  reducers: {
    settings_setBottomTabLanguage(state, action: PayloadAction<boolean>) {
      state.openBottomTabLanguage = action.payload;
    },
    settings_reset() {
      return settings_initialState;
    },
  },
});

export const settings_reducerActions = settingsSlice.actions;

export const settings_selector = (state: RootState): SettingsSliceState => state.settings;
