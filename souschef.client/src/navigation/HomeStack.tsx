import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackNavigatorParamList} from './types';
import {HomeScreen, TaskScreen, LoginScreen, RegisterScreen} from '../screens';

// Guide: https://blog.jscrambler.com/getting-started-with-react-navigation-v6-and-typescript-in-react-native
const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
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
