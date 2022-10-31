import React from 'react';
import {View, Text, Button} from 'react-native';
import {Input} from '../../components';
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
      <Input onChangeText={onChangeEmail} value={email} placeholder={'Email'} />
      <Input
        onChangeText={onChangePassword}
        value={password}
        placeholder={'Password'}
      />
      <Button title="Login" onPress={() => login()} />
    </View>
  );
};

export default LoginScreen;
