import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {LoginScreenNavigationProp} from '../../navigation/types';

const LoginScreen = ({navigation, route}: LoginScreenNavigationProp) => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [error, setError] = React.useState('');

  let fakeLogin = {
    pass: '123',
    email: '123@gmail.com',
  };

  const login = () => {
    if (email === fakeLogin.email && password === fakeLogin.pass) {
      navigation.navigate('HomeScreen');
    } else {
      setError('wrong email or password!');
    }
  };

  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <Text>Login</Text>
      <Text>{error}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder={'Email'}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder={'Password'}
      />
      <Button title="Login" onPress={() => login()} />
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
