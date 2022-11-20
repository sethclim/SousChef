import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackNavigatorParamList} from './types';
import {
  HomeScreen,
  TaskScreen,
  LoginScreen,
  RegisterScreen,
  WelcomeScreen,
} from '../screens';

// Guide: https://blog.jscrambler.com/getting-started-with-react-navigation-v6-and-typescript-in-react-native
const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <HomeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false, animation: 'fade'}}
      />
      <HomeStack.Screen
        name="Task"
        component={TaskScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
