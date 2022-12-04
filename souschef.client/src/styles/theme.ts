import {Color, Theme} from './type';

const palette: {[key: string]: Color} = {
  purple: '#5A31F4',
  green: '#0ECD9D',
  red: '#fb6a69',
  blue: '#2E9DFB',
  black: '#0B0B0B',
  white: '#F0F2F3',
  grey: '#2F394A',
};

export const theme: Theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.purple,
    success: palette.green,
    danger: palette.red,
    lightText: palette.grey,
    blue: palette.blue,
    red: palette.red,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontFamily: 'Raleway',
      fontSize: 36,
      fontWeight: 'bold',
    },
    body: {
      fontFamily: 'Merriweather',
      fontSize: 16,
    },
  },
};

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
  },
};
