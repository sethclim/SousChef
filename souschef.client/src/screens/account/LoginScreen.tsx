import React from 'react';
import {StyleSheet, Text} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Card, Column, Input, Row, SafeArea} from '../../components';
import {OpacityPressable, SpringPressable} from '../../components/pressable';
import {usePost} from '../../hooks';
import {LoginScreenNavigationProp} from '../../navigation/types';
import {theme} from '../../styles/theme';

const LoginScreen = ({navigation, route}: LoginScreenNavigationProp) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const {post, error: postError} = usePost(
    'https://localhost:5001/api/user/login',
  );

  React.useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
    if (route.params.animationID === 1)
      navigation.setOptions({animation: 'slide_from_left'});
  }, [navigation]);

  const login = () => {
    setError('');
    // Empty fields
    if (email.length === 0 || password.length === 0) {
      setError('Please make sure all fields are filled.');
    }
    // Successfully log'd in
    else {
      post({
        email: email,
        password: password,
      }).then(success => {
        if (success) navigation.replace('Home');
        else setError(`${postError}`);
      });
    }
  };

  const register = () => navigation.replace('Register', {animationID: 1});

  const skipLogin = () => navigation.replace('Home');

  return (
    <SafeArea>
      <Column
        horizontalResizing="fill"
        verticalResizing="fill"
        spacing={theme.spacing.m}>
        <Column horizontalResizing="fill" spacing={theme.spacing.s}>
          <Text style={styles.h1}>Hello Again!</Text>
          <Text style={styles.h2}>Welcome back, you've been missed!</Text>
          {error.length > 0 && (
            <Card style={styles.error}>
              <Column horizontalResizing="fill" spacing={theme.spacing.s}>
                <MaterialCommunityIcon name="cancel" style={styles.errorIcon} />
                <Text style={styles.errorText}>{error}</Text>
              </Column>
            </Card>
          )}
        </Column>
        <Column horizontalResizing="fill" spacing={theme.spacing.m}>
          <Input
            placeholder="Email"
            horizontalResizing="fill"
            onChangeText={value => {
              setEmail(value);
            }}
          />
          <Input
            placeholder="Password"
            secure={true}
            horizontalResizing="fill"
            onChangeText={value => {
              setPassword(value);
            }}
          />
        </Column>
        <SpringPressable onPress={login} horizontalResizing="fill">
          <Button
            bgColor={theme.colors.red}
            horizontalResizing="fill"
            verticalResizing="fixed"
            height={64}
            text="Login"
            textStyle={styles.buttonText}
          />
        </SpringPressable>
        <Row spacing={theme.spacing.s}>
          <Text style={styles.registerText}>Not a member?</Text>
          <OpacityPressable onPress={register}>
            <Text style={[styles.registerText, styles.clickableText]}>
              Register
            </Text>
          </OpacityPressable>
        </Row>
        <OpacityPressable onPress={skipLogin}>
          <Text style={[styles.registerText, styles.clickableText]}>
            Bypass Login
          </Text>
        </OpacityPressable>
      </Column>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  h1: {
    color: theme.colors.lightText,
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  h2: {
    color: theme.colors.lightText,
    fontSize: 18,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  error: {
    backgroundColor: theme.colors.blue,
    elevation: 0,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
  errorIcon: {color: '#fff', fontSize: 36},
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    color: theme.colors.lightText,
    fontSize: 16,
  },
  clickableText: {
    color: '#2A60A6',
  },
});

export default LoginScreen;
