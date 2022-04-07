/**
 * ------------
 * Base theme.
 * ------------
 */

import { Palette, Shape, Typography } from '@/interfaces/theme';

/**
 * Base palettes
 */
export const palette: Omit<Palette, 'background' | 'text' | 'mode'> = {
  // mode: 'light', // default light.
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
};

/**
 * Typography
 */
export const typography: Typography = {
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

/**
 * Shape
 */
export const shape: Shape = {
  borderRadius: 3,
};
