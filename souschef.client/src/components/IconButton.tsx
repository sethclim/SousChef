import React from 'react';
import {StyleSheet, Text} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, theme} from '../styles/theme';
import {Row} from './index';
import {IFrameProps} from './primitives/Frame';

interface IIconButtonProps extends IFrameProps {
  text: string;
  iconName: string;
  color?: Color;
  size?: number;
  textStyle?: object;
  iconStyle?: object;
}

type IconButtonProps = IIconButtonProps;

const iconButtonDefaultProps: IIconButtonProps = {
  text: 'Placeholder',
  iconName: 'check',
  color: '#fff',
  bgColor: '#3ddc84',
  paddingVertical: theme.spacing.s,
  paddingHorizontal: theme.spacing.m,
  size: 18,
  borderRadius: 128,
  elevation: 4,
};

const IconButton: React.FC<IconButtonProps> = (propsIn: IIconButtonProps) => {
  const props = {...iconButtonDefaultProps, ...propsIn};
  return (
    <Row {...props}>
      <MaterialCommunityIcon
        name={props.iconName}
        color={props.color}
        style={{
          fontSize: (props.size ?? 12) * 1.5,
          ...props.iconStyle,
        }}
      />
      <Text
        style={{
          color: props.color,
          fontSize: props.size,
          ...styles.buttonText,
        }}>
        {props.text}
      </Text>
    </Row>
  );
};

const styles = StyleSheet.create({
  buttonText: {textAlign: 'center', fontWeight: 'bold', marginLeft: 8},
});

export default IconButton;
