import React from 'react';
import {View, Text, Button} from 'react-native';
import {Input} from '../../components';
import {SignupScreenNavigationProp} from '../../navigation/types';

const LoginScreen = ({navigation, route}: SignupScreenNavigationProp) => {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [error, setError] = React.useState('');

  const signup = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <Text>Login</Text>
      <Text>{error}</Text>
      <Input onChangeText={onChangeName} value={name} placeholder={'Name'} />
      <Input onChangeText={onChangeEmail} value={email} placeholder={'Email'} />
      <Input
        onChangeText={onChangePassword}
        value={password}
        placeholder={'Password'}
      />
      <Button title="Signup" onPress={() => signup()} />
    </View>
  );
};

export default LoginScreen;
