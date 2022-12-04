import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../contexts/AppContext';
import {Button, Card, Column, Input, Row, SafeArea} from '../../components';
import {OpacityPressable, SpringPressable} from '../../components/pressable';
import {usePost} from '../../hooks';
import {
  defaultBottomTabNavigatorParamList,
  LoginScreenNavigationProp,
  LoginScreenRouteProp,
} from '../../navigation/types';
import {Theme} from '../../styles/type';

const LoginScreen = ({
  navigation,
  route,
}: {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  // API Calls
  const {post, error: postError} = usePost(
    'https://localhost:5001/api/user/login',
  );

  // On Mount
  React.useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
    if (route.params.animationID === 1)
      navigation.setOptions({animation: 'slide_from_left'});
  }, [navigation]);

  // Methods
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
        if (success)
          navigation.replace('BottomTabs', defaultBottomTabNavigatorParamList);
        else setError(`${postError}`);
      });
    }
  };

  const register = () => navigation.replace('Register', {animationID: 1});

  const skipLogin = () =>
    navigation.replace('BottomTabs', defaultBottomTabNavigatorParamList);

  return (
    <SafeArea>
      <Column
        horizontalResizing="fill"
        verticalResizing="fill"
        paddingHorizontal={theme.spacing.m}
        spacing={theme.spacing.m}>
        <Column horizontalResizing="fill" spacing={theme.spacing.s}>
          <Text style={stylesWithTheme.h1}>Hello Again!</Text>
          <Text style={stylesWithTheme.h2}>
            Welcome back, you've been missed!
          </Text>
          {error.length > 0 && (
            <Card style={stylesWithTheme.error}>
              <Column horizontalResizing="fill" spacing={theme.spacing.s}>
                <MaterialCommunityIcon
                  name="cancel"
                  style={stylesWithTheme.errorIcon}
                />
                <Text style={stylesWithTheme.errorText}>{error}</Text>
              </Column>
            </Card>
          )}
        </Column>
        <Column horizontalResizing="fill" spacing={theme.spacing.m}>
          <Input
            bgColor={theme.colors.foreground}
            placeholder="Email"
            horizontalResizing="fill"
            onChangeText={value => {
              setEmail(value);
            }}
          />
          <Input
            bgColor={theme.colors.foreground}
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
            bgColor={theme.colors.danger}
            horizontalResizing="fill"
            verticalResizing="fixed"
            height={64}
            text="Login"
            textStyle={stylesWithTheme.buttonText}
          />
        </SpringPressable>
        <Row spacing={theme.spacing.s}>
          <Text style={stylesWithTheme.registerText}>Not a member?</Text>
          <OpacityPressable onPress={register}>
            <Text
              style={[
                stylesWithTheme.registerText,
                stylesWithTheme.clickableText,
              ]}>
              Register
            </Text>
          </OpacityPressable>
        </Row>
        <OpacityPressable onPress={skipLogin}>
          <Text
            style={[
              stylesWithTheme.registerText,
              stylesWithTheme.clickableText,
            ]}>
            Bypass Login
          </Text>
        </OpacityPressable>
      </Column>
    </SafeArea>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    h1: {
      color: theme.colors.text,
      fontSize: 28,
      fontWeight: 'bold',
      alignSelf: 'stretch',
      textAlign: 'center',
    },
    h2: {
      color: theme.colors.text,
      fontSize: 18,
      alignSelf: 'stretch',
      textAlign: 'center',
    },
    error: {
      backgroundColor: theme.colors.primary,
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
      color: theme.colors.text,
      fontSize: 16,
    },
    clickableText: {
      color: '#2A60A6',
    },
  });

export default LoginScreen;
