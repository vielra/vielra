import { Palette } from '@/interfaces/theme';
import { grey } from '@/lib/theme/colors';

/**
 * Palette light
 */
export const paletteLight: Pick<Palette, 'text' | 'background'> = {
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
