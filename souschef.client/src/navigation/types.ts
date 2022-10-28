import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList = {
  HomeScreen: undefined;
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
