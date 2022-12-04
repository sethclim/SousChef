import React, {useContext} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {ThemeContext} from '../contexts/AppContext';
import {Color} from '../styles/type';

export type TimerProps = {
  seconds?: number;
  onFinished?: (() => void) | undefined;
  primaryColor?: Color;
  secondaryColor?: Color;
};

const Timer: React.FC<TimerProps> = (propsIn: TimerProps) => {
  // Theme
  const theme = useContext(ThemeContext);

  // Props
  const timerDefaultProps: TimerProps = {
    seconds: 60,
    onFinished: () => {},
    primaryColor: '#2E9DFB',
    secondaryColor: '#92C9F8',
  };
  const props = {...timerDefaultProps, ...propsIn};

  return (
    <CircularProgress
      value={0}
      initialValue={props.seconds}
      maxValue={props.seconds}
      radius={150}
      duration={(props.seconds ?? 60) * 1000}
      progressValueColor={theme.colors.text}
      progressValueStyle={{fontWeight: 'normal'}}
      progressValueFontSize={42}
      activeStrokeColor={props.primaryColor}
      activeStrokeSecondaryColor={props.secondaryColor}
      activeStrokeWidth={16}
      inActiveStrokeColor={'#d9d9d9'}
      inActiveStrokeWidth={16}
      progressFormatter={(value: number) => {
        'worklet';
        let hours = String(Math.floor(value / 3600)).padStart(2, '0');
        value %= 3600;
        let minutes = String(Math.floor(value / 60)).padStart(2, '0');
        let seconds = String((value % 60).toFixed(0)).padStart(2, '0');
        return `${hours} : ${minutes} : ${seconds}`; // 2 decimal places
      }}
      onAnimationComplete={props.onFinished}
    />
  );
};

export default Timer;
