import React, {type PropsWithChildren} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import Frame from '../primitives/Frame';
import {IPressable} from './type';

type OpacityPressableProps = IPressable;

const OpacityPressable: React.FC<PropsWithChildren<OpacityPressableProps>> = (
  props: IPressable,
) => {
  return (
    <Frame {...props}>
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.55}>
        {props.children}
      </TouchableOpacity>
    </Frame>
  );
};

export default OpacityPressable;
