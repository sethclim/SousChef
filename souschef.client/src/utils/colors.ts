type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgb(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export const COLORS: {[key: string]: Color} = {
  background: '#f5f5f5',
  red: '#fb6a69',
  blue: '#2e9dfb',
  green: '#3ddc84',
};
