import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Image} from 'react-native-svg';
import {Button, Column, Row, SafeArea} from '../components';
import {SpringPressable} from '../components/pressable';
import {WelcomeScreenNavigationProp} from '../navigation/types';
import {theme} from '../styles/theme';
import Logo from '../res/sous_chef.svg';

const WelcomeScreen = ({navigation, route}: WelcomeScreenNavigationProp) => {
  const login = () => {
    navigation.replace('Login', {animationID: 0});
  };
  const register = () => {
    navigation.replace('Register', {animationID: 0});
  };
  return (
    <SafeArea>
      <Column horizontalResizing="fill" verticalResizing="fill">
        <Column horizontalResizing="fill">
          {/* <Logo width={350} height={350} /> */}
          <Text style={styles.title}>SOUS-CHEF</Text>
        </Column>
        <Row horizontalResizing="fill" style={{marginTop: 64}}>
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
          <SpringPressable
            onPress={register}
            horizontalResizing="fill"
            style={{marginLeft: theme.spacing.m}}>
            <Button
              bgColor={theme.colors.blue}
              horizontalResizing="fill"
              verticalResizing="fixed"
              height={64}
              text="Register"
              textStyle={styles.buttonText}
            />
          </SpringPressable>
        </Row>
      </Column>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  title: {fontSize: 48, fontWeight: 'bold', color: theme.colors.lightText},
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
