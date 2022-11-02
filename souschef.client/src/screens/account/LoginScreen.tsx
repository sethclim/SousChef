import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
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
    <View style={{flex: 1, paddingTop: 10, justifyContent: 'center',}}>
      <Text>Login</Text>
      {/* <Text>{error}</Text> */}
      <Input onChangeText={onChangeEmail} value={email} placeholder={'Email'} errormsg={error}/>
      <Input
        onChangeText={onChangePassword}
        value={password}
        placeholder={'Password'}
      />
      <Button
       color="#FB6A69"
       title="Login" 
       onPress={() => login()} />
      <Text style={styles.title}>Or</Text>
      <Text style={styles.title}>Not A Member<Text style={styles.link} onPress={()=>navigation.navigate('Signup')}> Register </Text></Text>      

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
