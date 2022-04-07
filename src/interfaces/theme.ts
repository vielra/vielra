export type PaletteMode = 'light' | 'dark';
export type ThemeSize = 'small' | 'medium' | 'large';
export type ButtonSize = ThemeSize;
export type Spacing = number;

export interface Typography {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  body: number;
  body2: number;
  subtitle: number;
  subtitle2: number;
}

export interface Shape {
  borderRadius: number;
}

export interface PaletteText {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface ThemePalette {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface PaletteBackground {
  default: string;
  paper: string;
}

export interface Palette {
  mode: PaletteMode;
  primary: ThemePalette;
  secondary: ThemePalette;
  text: PaletteText;
  background: PaletteBackground;
}

export interface Theme {
  palette: Palette;
  typography: Typography;
  shape: Shape;
}
