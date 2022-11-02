import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Input} from '../../components';
import {SignupScreenNavigationProp} from '../../navigation/types';

const LoginScreen = ({navigation, route}: SignupScreenNavigationProp) => {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [passwordConfirm, onChangePasswordConfirm] = React.useState('');
  const [error, setError] = React.useState('');

  const signup = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <Text>Signup</Text>
      <Text>{error}</Text>
      <Input onChangeText={onChangeEmail} value={email} placeholder={'Email'} />
      <Input onChangeText={onChangeName} value={name} placeholder={'Name'} />
      <Input
        onChangeText={onChangePassword}
        value={password}
        placeholder={'Password'}
      />
      <Input
        onChangeText={onChangePasswordConfirm}
        value={passwordConfirm}
        placeholder={'Confirm Password'}
      />
      <Button title="Signup" onPress={() => signup()} />
      <Text style={styles.title}>Already A Member<Text style={styles.link} onPress={()=>navigation.navigate('Login')}> Login </Text></Text>   
    </View>
  );
};

const styles = StyleSheet.create({

  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  link: {
    color: 'blue',
    fontWeight: 'bold',
  },

});


export default LoginScreen;
