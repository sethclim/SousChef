import React, {type PropsWithChildren} from 'react';
import Frame, {IFrameProps} from './Frame';

interface IColumnProps extends IFrameProps {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'center' | 'stretch' | 'flex-start' | 'flex-end' | 'baseline';
}

type ColumnProps = IColumnProps;

const columnDefaultProps: IColumnProps = {
  horizontalResizing: 'hug',
  verticalResizing: 'hug',
  justifyContent: 'center',
  alignItems: 'center',
};

const Column: React.FC<PropsWithChildren<ColumnProps>> = (
  propsIn: IColumnProps,
) => {
  const props = {...columnDefaultProps, ...propsIn};
  return (
    <Frame
      {...props}
      style={[
        {
          flexDirection: 'column',
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
        },
        props.style,
      ]}>
      {props.children}
    </Frame>
  );
};

export default Column;
