import React, {type PropsWithChildren} from 'react';
import {theme} from '../styles/theme';
import Frame, {IFrameProps} from './primitives/Frame';

export type CardProps = IFrameProps;

export const cardDefaultProps: IFrameProps = {
  bgColor: '#fff',
  paddingHorizontal: theme.spacing.m,
  paddingVertical: theme.spacing.m,
  horizontalResizing: 'fill',
  verticalResizing: 'hug',
  borderRadius: theme.spacing.m,
  elevation: 4,
};

const Card: React.FC<PropsWithChildren<CardProps>> = (propsIn: IFrameProps) => {
  const props = {...cardDefaultProps, ...propsIn};
  return (
    <Frame {...props} style={props.style}>
      {props.children}
    </Frame>
  );
};

export default Card;
