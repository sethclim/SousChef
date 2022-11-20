import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Task: {
    name: string;
  };
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Home'
>;

export type TaskScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Task'
>;

export type LoginScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Login'
>;

export type RegisterScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Register'
>;
