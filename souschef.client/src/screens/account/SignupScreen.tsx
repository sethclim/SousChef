import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
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
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder={'Name'}
      />
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
      <Button title="Signup" onPress={() => signup()} />
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
