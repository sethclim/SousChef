import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color} from '../styles/theme';
import Row from './primitives/Row';

export interface IIconButtonProps {
  iconName: string;
  text?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: Color;
  bgColor?: Color;
  size?: number;
  style?: object;
  iconStyling?: object;
}

export type IconButtonProps = IIconButtonProps;

const IconButton: React.FC<IconButtonProps> = (propsIn: IIconButtonProps) => {
  // Props

  // Animation
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
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
    <Animated.View style={{transform: [{scale}]}}>
      <TouchableOpacity
        onPress={propsIn.onPress}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          {
            width: propsIn.size
              ? propsIn.text
                ? 'auto'
                : propsIn.size * 2
              : 16,
            height: propsIn.size ? propsIn.size * 2 : 16,
            backgroundColor: propsIn.bgColor,
          },
          styles.button,
          propsIn.style,
        ]}>
        <Row>
          <MaterialCommunityIcon
            name={propsIn.iconName}
            color={propsIn.color}
            style={{
              fontSize: propsIn.size,
              ...propsIn.iconStyling,
            }}
          />
          {propsIn.text ? (
            <Text
              style={{
                color: propsIn.color,
                fontSize: (propsIn.size ?? 12) * 0.75,
                ...styles.buttonText,
              }}>
              {propsIn.text}
            </Text>
          ) : null}
        </Row>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {justifyContent: 'center', alignItems: 'center'},
  buttonText: {textAlign: 'center', paddingLeft: 8},
});

export default IconButton;
