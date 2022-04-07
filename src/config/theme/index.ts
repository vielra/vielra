import { palette, typography, shape } from './base';
import { paletteLight } from './palette-light';
import { paletteDark } from './palette-dark';

import { PaletteMode, Theme } from '@/interfaces/theme';

export const createTheme = (mode?: PaletteMode): Theme => ({
  palette: {
    ...palette,
    mode: mode || 'light',
    background: mode !== 'dark' ? paletteLight.background : paletteDark.background,
    text: mode !== 'dark' ? paletteLight.text : paletteDark.text,
  },
  typography,
  shape,
});

const theme = createTheme('light');

export default theme;
