import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  TaskScreen: {
    name: string;
  };
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'HomeScreen'
>;

export type TaskScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'TaskScreen'
>;

export type LoginScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'LoginScreen'
>;

export type SignupScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'SignupScreen'
>;
