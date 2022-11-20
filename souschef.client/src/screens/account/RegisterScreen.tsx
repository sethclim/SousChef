import React from 'react';
import {StyleSheet, Text} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Card, Column, Input, Row, SafeArea} from '../../components';
import {OpacityPressable, SpringPressable} from '../../components/pressable';
import {RegisterScreenNavigationProp} from '../../navigation/types';
import {theme} from '../../styles/theme';

const RegisterScreen = ({navigation, route}: RegisterScreenNavigationProp) => {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [passwordConfirm, onChangePasswordConfirm] = React.useState('');
  const [error, setError] = React.useState('');

  const register = () => {
    setError('');
    // Empty fields
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0
    ) {
      setError('Please make sure all fields are filled.');
    }
    // Passwords do not match
    else if (password !== passwordConfirm) {
      setError('Please make sure your passwords match!');
    }
    // Successfully registered
    else {
      navigation.navigate('Home');
    }
  };

  const login = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeArea>
      <Column horizontalResizing="fill" verticalResizing="fill">
        <Column horizontalResizing="fill">
          <Text style={styles.h1}>Welcome!</Text>
          <Text style={styles.h2}>
            We're so happy you decided to try out SousChef.
          </Text>
          {error.length > 0 && (
            <Card style={styles.error}>
              <Column horizontalResizing="fill">
                <MaterialCommunityIcon name="cancel" style={styles.errorIcon} />
                <Text style={styles.errorText}>{error}</Text>
              </Column>
            </Card>
          )}
        </Column>
        <Column horizontalResizing="fill" style={{marginVertical: 32}}>
          <Input
            placeholder="Full name"
            horizontalResizing="fill"
            onChangeText={value => {
              onChangeName(value);
            }}
          />
          <Input
            placeholder="Email"
            horizontalResizing="fill"
            onChangeText={value => {
              onChangeEmail(value);
            }}
            style={{marginTop: 8}}
          />
          <Input
            placeholder="Password"
            secure={true}
            horizontalResizing="fill"
            onChangeText={value => {
              onChangePassword(value);
            }}
            style={{marginTop: 8}}
          />
          <Input
            placeholder="Confirm password"
            secure={true}
            horizontalResizing="fill"
            onChangeText={value => {
              onChangePasswordConfirm(value);
            }}
            style={{marginTop: 8}}
          />
        </Column>
        <SpringPressable onPress={register} horizontalResizing="fill">
          <Button
            bgColor={theme.colors.blue}
            horizontalResizing="fill"
            verticalResizing="fixed"
            height={64}
            text="Register"
            textStyle={styles.buttonText}
          />
        </SpringPressable>
        <Row paddingVertical={16}>
          <Text style={styles.loginText}>Joined us before?</Text>
          <OpacityPressable onPress={login}>
            <Text style={[styles.loginText, styles.clickableText]}>Login</Text>
          </OpacityPressable>
        </Row>
      </Column>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  h1: {
    color: theme.colors.lightText,
    fontSize: 28,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  h2: {
    color: theme.colors.lightText,
    fontSize: 18,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: theme.spacing.s,
  },
  error: {
    backgroundColor: theme.colors.red,
    marginTop: theme.spacing.l,
    elevation: 0,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    marginTop: theme.spacing.s,
  },
  errorIcon: {color: '#fff', fontSize: 36},
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginText: {
    color: theme.colors.lightText,
    fontSize: 16,
  },
  clickableText: {
    color: '#2A60A6',
    marginLeft: 8,
  },
});

export default RegisterScreen;
