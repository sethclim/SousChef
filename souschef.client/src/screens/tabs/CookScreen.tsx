import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ThemeContext} from '../../contexts/AppContext';
import {Button, SafeArea} from '../../components';
import {Theme} from '../../styles/type';
import {CookScreenNavigationProp} from '../../navigation/types';
import {SpringPressable} from '../../components/pressable';

const CookScreen = ({navigation}: {navigation: CookScreenNavigationProp}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  const navigate = () => {
    navigation.navigate('Task', {sessionId: ''});
  };
  return (
    <SafeArea>
      <Text>Cook Screen</Text>
      <SpringPressable onPress={navigate}>
        <Button text="Scan Code" />
      </SpringPressable>
    </SafeArea>
  );
};

const styles = (theme: Theme) => StyleSheet.create({});

export default CookScreen;
