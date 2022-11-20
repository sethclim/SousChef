import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList = {
  Welcome: undefined;
  Login: {
    animationID: number;
  };
  Register: {
    animationID: number;
  };
  Home: undefined;
  Task: {
    name: string;
  };
};

export type WelcomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Welcome'
>;

export type LoginScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Login'
>;

export type RegisterScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Register'
>;

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Home'
>;

export type TaskScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Task'
>;
