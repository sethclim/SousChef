import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

export type RowProps = {
  style?: object;
};

const Row: React.FC<PropsWithChildren<RowProps>> = ({style, children}) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Row;
