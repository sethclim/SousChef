import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Image} from 'react-native-svg';
import {Button, Column, Row, SafeArea} from '../components';
import {SpringPressable} from '../components/pressable';
import {
  WelcomeScreenNavigationProp,
  WelcomeScreenRouteProp,
} from '../navigation/types';
import Logo from '../res/sous_chef.svg';
import {ThemeContext} from '../contexts/AppContext';
import {Theme} from '../styles/type';

const WelcomeScreen = ({
  navigation,
  route,
}: {
  navigation: WelcomeScreenNavigationProp;
  route: WelcomeScreenRouteProp;
}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Methods
  const register = () => {
    navigation.replace('Register', {animationID: 0});
  };
  return (
    <SafeArea>
      <Column horizontalResizing="fill" verticalResizing="fill">
        <Column horizontalResizing="fill">
          {/* <Logo width={350} height={350} /> */}
          <Text style={stylesWithTheme.title}>SOUS-CHEF</Text>
        </Column>
        <Row horizontalResizing="fill" style={{marginTop: 64}}>
          <SpringPressable
            onPress={register}
            horizontalResizing="fill"
            style={{marginLeft: theme.spacing.m}}>
            <Button
              bgColor={theme.colors.primary}
              horizontalResizing="fill"
              verticalResizing="fixed"
              height={64}
              text="Register"
              textStyle={stylesWithTheme.buttonText}
            />
          </SpringPressable>
        </Row>
      </Column>
    </SafeArea>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    title: {fontSize: 48, fontWeight: 'bold', color: theme.colors.text},
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default WelcomeScreen;
