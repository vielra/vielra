/**
 * ------------
 * App Theme Config.
 * ------------
 */

// Theme colors.
import { grey } from '@/modules/theme/libs';

// Utils.
/* eslint import/no-cycle: [2, { ignoreExternal: true }]*/
// import { createTheme } from '@/modules/theme/utils';

// Interfaces.
import { IThemePalette, IThemeShape, IThemeTypography } from '@/modules/theme/interfaces';

/**  Base palette */
export const paletteBase: Omit<IThemePalette, 'background' | 'text' | 'mode' | 'divider'> = {
  primary: {
    main: '#FF4564',
    dark: '#F10930',
    light: '#FEF2EF',
    contrastText: '#fbfbfb',
  },
  secondary: {
    main: '#3393FF',
    dark: '#1955B7',
    light: '#EEF9FE',
    contrastText: '#fbfbfb',
  },
  success: {
    main: '#0CB954',
    dark: '#089F56',
    light: '#e2ffe2',
    contrastText: '#fbfbfb',
  },
  info: {
    main: '#069efe',
    dark: '#047ADA',
    light: '#EEFCFE',
    contrastText: '#fbfbfb',
  },
  warning: {
    main: '#ffa50b',
    dark: '#DB8508',
    light: '#FFF9E6',
    contrastText: '#fff',
  },
  error: {
    main: '#ff3517',
    dark: '#B70B10',
    light: '#FFEFE3',
    contrastText: '#fff',
  },
  common: {
    white: '#fff',
    black: '#000000',
  },
};

/** Palette light */
export const paletteLight: Pick<IThemePalette, 'text' | 'background' | 'mode' | 'divider'> = {
  mode: 'light',
  text: {
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500],
  },
  background: {
    default: '#f9f9f9',
    paper: '#fff',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

/** Palette dark */
export const paletteDark: Pick<IThemePalette, 'text' | 'background' | 'mode' | 'divider'> = {
  mode: 'dark',
  text: {
    primary: '#fbfbfb',
    secondary: 'rgba(255, 255, 255, 0.75)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  background: {
    default: grey[900],
    paper: '#0e0e0e',
  },
  divider: 'rgba(255, 255, 255, 0.18)',
};

/** Typography */
export const typography: IThemeTypography = {
  h1: 26,
  h2: 22,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14.2,
  body: 13.5,
  body2: 13,
  subtitle: 12,
  subtitle2: 11.3,
};

/** Shape */
export const shape: IThemeShape = {
  borderRadius: 3,
};

/** Theme spacing */
export const SPACING = 4;

/** Default theme (light mode) */
// export const defaultTheme: ITheme = createTheme('light');
