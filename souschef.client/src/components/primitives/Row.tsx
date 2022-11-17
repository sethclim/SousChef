import React, {type PropsWithChildren} from 'react';
import Frame, {IFrameProps} from './Frame';

interface IRowProps extends IFrameProps {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'center' | 'stretch' | 'flex-start' | 'flex-end' | 'baseline';
}

type RowProps = IRowProps;

const rowDefaultProps: IRowProps = {
  horizontalResizing: 'hug',
  verticalResizing: 'hug',
  justifyContent: 'center',
  alignItems: 'center',
};

const Row: React.FC<PropsWithChildren<RowProps>> = (propsIn: IRowProps) => {
  const props = {...rowDefaultProps, ...propsIn};
  return (
    <Frame
      {...props}
      style={[
        {
          flexDirection: 'row',
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
        },
        props.style,
      ]}>
      {props.children}
    </Frame>
  );
};

export default Row;
