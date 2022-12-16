type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgb(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type Theme = {
  colors: {
    background: Color;
    foreground: Color;
    primary: Color;
    success: Color;
    danger: Color;
    text: Color;
    pastel: {[key: string]: Color};
  };
  spacing: {
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  textVariants: {
    header: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
    };
    body: {
      fontFamily: string;
      fontSize: number;
    };
  };
};
