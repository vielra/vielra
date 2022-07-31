import { ITheme, PaletteMode } from '@/modules/theme/interfaces';
import { paletteBase, paletteDark, paletteLight, typography, shape } from '@/modules/theme/config';

/**
 * Create theme
 *
 * @param {PaletteMode} mode - "light" | "dark"
 * @returns {ITheme}
 */
export const createTheme = (mode?: PaletteMode): ITheme => {
  return {
    palette: {
      ...paletteBase,
      ...(mode !== 'dark' ? { ...paletteLight } : { ...paletteDark }),
    },
    typography,
    shape,
  };
};
