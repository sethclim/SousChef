import React from 'react';
import {View, Text, Button} from 'react-native';
import {HomeScreenNavigationProp} from '../navigation/types';

const HomeScreen = ({navigation, route}: HomeScreenNavigationProp) => {
  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <Text>Home Screen</Text>
      <Button
        title="Sample Task"
        onPress={() => navigation.navigate('Task', {name: 'Task #1'})}
      />
    </View>
  );
};

export default HomeScreen;
