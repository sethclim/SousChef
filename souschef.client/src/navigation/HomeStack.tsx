import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackNavigatorParamList} from './types';
import {HomeScreen, TaskScreen} from '../screens';

// Guide: https://blog.jscrambler.com/getting-started-with-react-navigation-v6-and-typescript-in-react-native
const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="TaskScreen" component={TaskScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
