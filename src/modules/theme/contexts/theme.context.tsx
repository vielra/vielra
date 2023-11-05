import React, { FC, createContext, PropsWithChildren, useReducer, Dispatch, useMemo } from 'react';

// reducers
import { ITheme } from '@/modules/theme/interfaces';
import { ThemeReducerActions, themeReducer } from '@/modules/theme/reducers';

// helpers / utils
import { themeUtils } from '@/modules/theme/utilities';
import { useColorScheme } from 'react-native';
import { useApp } from '@/modules/app/hooks';

// type for our context
export interface IThemeState extends ITheme {}

// theme context provider
export const ThemeContext = createContext<IThemeState>({} as IThemeState);

// theme dispatch provider
export const ThemeDispatchContext = createContext<Dispatch<ThemeReducerActions>>(
  null as unknown as Dispatch<ThemeReducerActions>,
);

/**
 * initial state
 */
export const themeContext_initialState: IThemeState = {} as IThemeState; // that's find we will set up later

// theme context provider
export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { paletteMode } = useApp();
  const userPrefersColorScheme = useColorScheme() ?? 'light';

  const theme = useMemo(() => {
    return themeUtils.createTheme(paletteMode !== null ? paletteMode : userPrefersColorScheme);
  }, [paletteMode]);

  const [state, dispatch] = useReducer(themeReducer, theme);

  return (
    <ThemeContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};
