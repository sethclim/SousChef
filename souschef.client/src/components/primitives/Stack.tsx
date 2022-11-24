import React, {type PropsWithChildren} from 'react';
import {View} from 'react-native';
import {IFrameProps, makeFrameComponent} from './Frame';

export interface IStackProps extends IFrameProps {
  dir?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'center' | 'stretch' | 'flex-start' | 'flex-end' | 'baseline';
}

export type StackProps = IStackProps;

const stackDefaultProps: IStackProps = {
  dir: 'column',
  horizontalResizing: 'hug',
  verticalResizing: 'hug',
  justifyContent: 'center',
  alignItems: 'center',
};

const Frame = makeFrameComponent(View);

export const makeStackComponent = (Comp: React.ElementType) => {
  return (propsIn: any) => {
    const props = {...stackDefaultProps, ...(propsIn as IFrameProps)};
    const children = React.Children.map(props.children, child => {
      if (React.isValidElement<IStackProps>(child)) {
        return React.cloneElement<IStackProps>(child, {
          parentDirection: props.dir,
        });
      } else {
        return child;
      }
    });

    const isReversed =
      props.parentDirection &&
      (props.parentDirection === 'row' ||
        props.parentDirection === 'row-reverse');
    const horizontalResizing = isReversed
      ? props.verticalResizing
      : props.horizontalResizing;
    const verticalResizing = isReversed
      ? props.horizontalResizing
      : props.verticalResizing;

    const F = makeFrameComponent(Comp);

    return (
      <F
        {...propsIn}
        horizontalResizing={horizontalResizing}
        verticalResizing={verticalResizing}
        style={[
          {
            flexDirection: props.dir,
            justifyContent: props.justifyContent,
            alignItems: props.alignItems,
          },
          props.style,
        ]}>
        {children}
      </F>
    );
  };
};

const Stack: React.FC<PropsWithChildren<StackProps>> = (
  propsIn: IStackProps,
) => {
  const props = {...stackDefaultProps, ...propsIn};
  const children = React.Children.map(props.children, child => {
    if (React.isValidElement<IStackProps>(child)) {
      return React.cloneElement<IStackProps>(child, {
        parentDirection: props.dir,
      });
    } else return child;
  });

  const isReversed =
    props.parentDirection &&
    (props.parentDirection === 'row' ||
      props.parentDirection === 'row-reverse');
  const horizontalResizing = isReversed
    ? props.verticalResizing
    : props.horizontalResizing;
  const verticalResizing = isReversed
    ? props.horizontalResizing
    : props.verticalResizing;

  return (
    <Frame
      {...props}
      horizontalResizing={horizontalResizing}
      verticalResizing={verticalResizing}
      style={[
        {
          flexDirection: props.dir,
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
        },
        props.style,
      ]}>
      {children}
    </Frame>
  );
};

export default Stack;
