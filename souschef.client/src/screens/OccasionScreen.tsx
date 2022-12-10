import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ThemeContext} from '../contexts/AppContext';
import {Column, Row, SafeArea} from '../components';
import {IconButton} from '../components'
import {Theme} from '../styles/type';
import { SpringPressable } from '../components/pressable';

const OccasionScreen = () => {
    // Theme
const theme = useContext(ThemeContext);
const stylesWithTheme = styles(theme);
    return (
      <SafeArea>
        <SafeArea>
            <Text style={stylesWithTheme.h1}>What's the Occasion?</Text>
        </SafeArea>
        <Column
        horizontalResizing="fill"
        spacing={theme.spacing.s}
        paddingHorizontal={theme.spacing.s}>
        <SpringPressable
          horizontalResizing="fill"
          verticalResizing="fill"
          onPress={() => {
            {/* */} //navigate to create 
          }}>
          <IconButton
            iconName="home"
            text="Home"
            horizontalResizing="fill"
            verticalResizing="fill"
          />
        </SpringPressable>
        <SpringPressable
          horizontalResizing="fill"
          verticalResizing="fill"
          onPress={() => {
            {/* */} //navigate to create 
          }}>
          <IconButton
            iconName="work" //change icon 
            text="Professional"
            horizontalResizing="fill"
            verticalResizing="fill"
          />
        </SpringPressable>
        <SpringPressable
          horizontalResizing="fill"
          verticalResizing="fill"
          onPress={() => {
            {/* */} //navigate to create 
          }}>
          <IconButton
            iconName="school" //change icon 
            text="School"
            horizontalResizing="fill"
            verticalResizing="fill"
          />
        </SpringPressable>
        </Column>
        </SafeArea>
    );
  };
  
  const styles = (theme: Theme) => StyleSheet.create({

     h1: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    textAlign: 'center',
  }

  });
  
      
export default OccasionScreen;