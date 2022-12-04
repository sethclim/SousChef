import React, {type PropsWithChildren} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Color, theme} from '../styles/theme';

export interface ISafeAreaProps {
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  bgColor?: Color;
  children?: React.ReactNode;
}

export type SafeAreaProps = ISafeAreaProps;

const safeAreaDefaultProps: ISafeAreaProps = {
  direction: 'column',
  bgColor: '#fff',
};

const SafeArea: React.FC<PropsWithChildren<SafeAreaProps>> = (
  propsIn: ISafeAreaProps,
) => {
  const props = {...safeAreaDefaultProps, ...propsIn};
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: props.bgColor,
      }}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeArea;
