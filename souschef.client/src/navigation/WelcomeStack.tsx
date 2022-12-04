import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  LoginScreen,
  RegisterScreen,
  TaskScreen,
  WelcomeScreen,
} from '../screens';
import BottomTabs from './BottomTabs';
import {WelcomeStackNavigatorParamList} from './types';

// Guide: https://blog.jscrambler.com/getting-started-with-react-navigation-v6-and-typescript-in-react-native
const WelcomeStack =
  createNativeStackNavigator<WelcomeStackNavigatorParamList>();

const WelcomeStackNavigator = () => {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <WelcomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <WelcomeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <WelcomeStack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false, animation: 'fade'}}
      />
      <WelcomeStack.Screen
        name="Task"
        component={TaskScreen}
        options={{headerShown: false}}
      />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeStackNavigator;
