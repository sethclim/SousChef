import React, {type PropsWithChildren} from 'react';
import {theme} from '../styles/theme';
import Stack, {IStackProps} from './primitives/Stack';

export type CardProps = IStackProps;

export const cardDefaultProps: IStackProps = {
  bgColor: '#fff',
  paddingHorizontal: theme.spacing.m,
  paddingVertical: theme.spacing.m,
  horizontalResizing: 'fill',
  verticalResizing: 'hug',
  borderRadius: theme.spacing.m,
  elevation: 4,
};

const Card: React.FC<PropsWithChildren<CardProps>> = (propsIn: IStackProps) => {
  const props = {...cardDefaultProps, ...propsIn};
  return <Stack {...props}>{props.children}</Stack>;
};

export default Card;
