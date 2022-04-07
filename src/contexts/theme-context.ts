import { createContext } from 'react';
import { Theme } from '@/interfaces/theme';

const themeContext = createContext<Theme>({} as Theme);

export default themeContext;
