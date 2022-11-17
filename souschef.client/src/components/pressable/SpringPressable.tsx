import React, {type PropsWithChildren} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import Frame from '../primitives/Frame';
import {IPressable} from './type';

type SpringPressableProps = IPressable;

const SpringPressable: React.FC<PropsWithChildren<SpringPressableProps>> = (
  props: IPressable,
) => {
  // Animation
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.85];
  const scale = animation.interpolate({inputRange, outputRange});

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Frame {...props}>
      <Animated.View style={{transform: [{scale}]}}>
        <TouchableOpacity
          onPress={props.onPress}
          activeOpacity={1}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          {props.children}
        </TouchableOpacity>
      </Animated.View>
    </Frame>
  );
};

export default SpringPressable;
