import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {LoginScreenNavigationProp} from '../../navigation/types';

const LoginScreen = ({navigation, route}: LoginScreenNavigationProp) => {
  const [email, onChangeEmail] = React.useState('Email');
  const [password, onChangePassword] = React.useState('Password');

  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
      />

      <Button title="Login" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
