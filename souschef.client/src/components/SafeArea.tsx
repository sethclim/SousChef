import React, {type PropsWithChildren} from 'react';
import {SafeAreaView, View} from 'react-native';

export interface ISafeAreaProps {
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  horizontalPadding?: number;
  verticalPadding?: number;
  children?: React.ReactNode;
}

export type SafeAreaProps = ISafeAreaProps;

const safeAreaDefaultProps: ISafeAreaProps = {
  direction: 'column',
  horizontalPadding: 0,
  verticalPadding: 0,
};

const SafeArea: React.FC<PropsWithChildren<SafeAreaProps>> = (
  propsIn: ISafeAreaProps,
) => {
  const props = {...safeAreaDefaultProps, ...propsIn};
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: props.horizontalPadding,
        paddingVertical: props.verticalPadding,
      }}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeArea;
