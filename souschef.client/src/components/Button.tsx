import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Color, theme} from '../styles/theme';
import {Row} from './index';
import {IFrameProps} from './primitives/Frame';

interface IButtonProps extends IFrameProps {
  text: string;
  color?: Color;
  textStyle?: object;
}

type ButtonProps = IButtonProps;

const buttonDefaultProps: IButtonProps = {
  text: 'Placeholder',
  color: '#fff',
  bgColor: '#3ddc84',
  paddingVertical: theme.spacing.m,
  paddingHorizontal: theme.spacing.m,
  borderRadius: 16,
};

const Button: React.FC<ButtonProps> = (propsIn: IButtonProps) => {
  const props = {...buttonDefaultProps, ...propsIn};
  return (
    <Row {...props}>
      <Text
        style={[
          {
            color: props.color,
          },
          styles.buttonText,
          props.textStyle,
        ]}>
        {props.text}
      </Text>
    </Row>
  );
};

const styles = StyleSheet.create({
  buttonText: {textAlign: 'center', fontWeight: 'bold'},
});

export default Button;
