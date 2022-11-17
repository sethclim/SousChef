import React, {type PropsWithChildren} from 'react';
import {View} from 'react-native';
import {Color} from '../../styles/theme';

type Resizing = 'fill' | 'hug' | 'fixed';

export interface IFrameProps {
  bgColor?: Color;
  width?: number | string;
  height?: number | string;
  horizontalResizing?: Resizing;
  verticalResizing?: Resizing;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
  elevation?: number;
  style?: object;
  children?: React.ReactNode;
}

export type FrameProps = IFrameProps;

const frameDefaultProps: IFrameProps = {
  borderRadius: 0,
  elevation: 0,
};

const calculateResizing = (
  horizontalResizing?: Resizing,
  verticalResizing?: Resizing,
): {alignSelf: string; flexGrow: number} => {
  let result: {alignSelf: string; flexGrow: number} = {
    alignSelf: '',
    flexGrow: 0,
  };

  // Horizontal Resizing
  if (horizontalResizing === 'fill') result.alignSelf = 'stretch';
  else if (horizontalResizing === 'hug') result.alignSelf = 'center';
  else result.alignSelf = 'auto';

  // Vertical Resizing
  if (verticalResizing === 'fill') result.flexGrow = 1;
  else if (verticalResizing === 'hug') result.flexGrow = 0;
  else result.flexGrow = 0;

  return result;
};

const Frame: React.FC<PropsWithChildren<FrameProps>> = (
  propsIn: IFrameProps,
) => {
  const props = {...frameDefaultProps, ...propsIn};
  const {alignSelf, flexGrow} = calculateResizing(
    props.horizontalResizing,
    props.verticalResizing,
  );

  // Omit width & height unless resizing set to fixed (for each axis)
  if (props.horizontalResizing !== 'fixed') props.width = 'auto';
  if (props.verticalResizing !== 'fixed') props.height = 'auto';

  return (
    <View
      style={[
        {
          width: props.width,
          height: props.height,
          paddingHorizontal: props.paddingHorizontal,
          paddingVertical: props.paddingVertical,
          backgroundColor: props.bgColor,
          borderRadius: props.borderRadius,
          elevation: props.elevation,
          alignSelf: alignSelf,
          flexGrow: flexGrow,
        },
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

export default Frame;
