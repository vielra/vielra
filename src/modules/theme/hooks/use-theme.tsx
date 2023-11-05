import { useContext } from 'react';

// context
import { ThemeContext, ThemeDispatchContext } from '@/modules/theme/contexts';

// action type
import { ThemeActionTypes } from '@/modules/theme/reducers';
import { PaletteMode } from '@/modules/theme/interfaces';

export const useTheme = () => {
  const state = useContext(ThemeContext);
  const dispatch = useContext(ThemeDispatchContext);

  const isDarkMode = state.palette.mode === 'dark';

  const theme_setPaletteMode = (payload: PaletteMode) => {
    dispatch({ type: ThemeActionTypes.setPaletteMode, payload });
  };

  const theme_togglePaletteMode = () => {
    dispatch({ type: ThemeActionTypes.togglePaletteMode });
  };

  return {
    ...state,
    isDarkMode,
    theme_setPaletteMode,
    theme_togglePaletteMode,
  };
};
