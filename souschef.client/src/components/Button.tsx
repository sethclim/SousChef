import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Color, Theme} from '../styles/type';
import Row from './primitives/Row';
import {IFrameProps} from './primitives/Frame';
import {ThemeContext} from '../contexts/AppContext';

interface IButtonProps extends IFrameProps {
  text: string;
  color?: Color;
  textStyle?: object;
}

type ButtonProps = IButtonProps;

const Button: React.FC<ButtonProps> = (propsIn: IButtonProps) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Props
  const buttonDefaultProps: IButtonProps = {
    text: 'Placeholder',
    color: '#fff',
    bgColor: '#3ddc84',
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    borderRadius: 16,
  };
  const props = {...buttonDefaultProps, ...propsIn};

  return (
    <Row {...props}>
      <Text
        style={[
          {
            color: props.color,
          },
          stylesWithTheme.buttonText,
          props.textStyle,
        ]}>
        {props.text}
      </Text>
    </Row>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    buttonText: {textAlign: 'center', fontWeight: 'bold'},
  });

export default Button;
