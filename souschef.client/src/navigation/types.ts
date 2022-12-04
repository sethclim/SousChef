import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type WelcomeStackNavigatorParamList = {
  Welcome: undefined;
  Login: {
    animationID: number;
  };
  Register: {
    animationID: number;
  };
  BottomTabs: BottomTabNavigatorParamList;
  Task: {
    name: string;
  };
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Favorite: undefined;
  Calendar: undefined;
  Profile: undefined;
};

export const defaultBottomTabNavigatorParamList: BottomTabNavigatorParamList = {
  Home: undefined,
  Favorite: undefined,
  Calendar: undefined,
  Profile: undefined,
};

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  'Register',
  'Login'
>;

export type WelcomeScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  'Welcome'
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  'Register',
  'BottomTabs'
>;

export type LoginScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  'Login'
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  'Login',
  'BottomTabs'
>;

export type RegisterScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  'Register'
>;

export type TaskScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  'Task'
>;
