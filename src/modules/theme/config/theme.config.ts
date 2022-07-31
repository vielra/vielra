/**
 * ------------
 * App Theme Config.
 * ------------
 */

// Theme colors.
import { grey } from '@/modules/theme/libs';

// Utils.
import { createTheme } from '@/modules/theme/utils';

// Interfaces.
import { ITheme, IThemePalette, IThemeShape, IThemeTypography } from '@/modules/theme/interfaces';

/**  Base palette */
export const paletteBase: Omit<IThemePalette, 'background' | 'text' | 'mode'> = {
  primary: {
    main: '#3393FF',
    dark: '#1955B7',
    light: '#D6F1FF',
    contrastText: '#fbfbfb',
  },
  secondary: {
    main: '#fd9d00',
    dark: '#B66200',
    light: '#FEF3CB',
    contrastText: '#fbfbfb',
  },
  success: {
    main: '#13C471',
    dark: '#0DA86F',
    light: '#CEFCD4',
    contrastText: '#fbfbfb',
  },
  info: {
    main: '#069efe',
    dark: '#047ADA',
    light: '#CDF7FE',
    contrastText: '#fbfbfb',
  },
  warning: {
    main: '#ffa50b',
    dark: '#DB8508',
    light: '#FFF4CE',
    contrastText: '#fbfbfb',
  },
  error: {
    main: '#ff3517',
    dark: '#B70B10',
    light: '#FFE5D0',
    contrastText: '#fbfbfb',
  },
  common: {
    white: '#ffffff',
    black: '#000000',
  },
};

/** Palette light */
export const paletteLight: Pick<IThemePalette, 'text' | 'background' | 'mode'> = {
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
};

/** Palette dark */
export const paletteDark: Pick<IThemePalette, 'text' | 'background' | 'mode'> = {
  mode: 'dark',
  text: {
    primary: grey[100],
    secondary: grey[200],
    disabled: grey[300],
  },
  background: {
    default: grey[900],
    paper: '#0e0e0e',
  },
};

/** Typography */
export const typography: IThemeTypography = {
  h1: 26,
  h2: 22,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 15,
  body: 14,
  body2: 14,
  subtitle: 13,
  subtitle2: 13,
};

/** Shape */
export const shape: IThemeShape = {
  borderRadius: 3,
};

/** Default theme (light mode) */
export const defaultTheme: ITheme = createTheme('light');
