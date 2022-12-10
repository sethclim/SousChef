import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ThemeContext} from '../contexts/AppContext';
import {Button, CircularButton, Column, Input, Row, SafeArea} from '../components';
import {IconButton} from '../components'
import {Theme} from '../styles/type';
import { SpringPressable } from '../components/pressable';
import { Icon } from 'react-native-vector-icons/Icon';

const MealHomeScreen = () => {
    // Theme
    const theme = useContext(ThemeContext);
    const stylesWithTheme = styles(theme);

    return(
        <SafeArea>
            <Text style ={stylesWithTheme.h1}>Teriyaki Pineapple...</Text>
          <Row
           spacing={theme.spacing.xxl}
           paddingHorizontal={theme.spacing.xxl}>
    
          <Text style ={stylesWithTheme.h2}>Ingredients</Text>
          <SpringPressable> 
              <CircularButton iconName="plus" />
            </SpringPressable>
          </Row>
          <Column
          horizontalResizing="fill"
          spacing={theme.spacing.xxl}
          paddingHorizontal={theme.spacing.xxl}>       
        
          </Column>
          <Row
           spacing={theme.spacing.xxl}
           paddingHorizontal={theme.spacing.xxl}>
    
          <Text style ={stylesWithTheme.h2}>Kitchenware</Text>
          <SpringPressable> 
              <CircularButton iconName="plus" />
            </SpringPressable>
          </Row>
          <Column
          horizontalResizing="fill"
          spacing={theme.spacing.xxl}
          paddingHorizontal={theme.spacing.xxl}>       
        
          </Column>
          <Row
           spacing={theme.spacing.xxl}
           paddingHorizontal={theme.spacing.xxl}>
    
          <Text style ={stylesWithTheme.h2}>Steps</Text>
          <SpringPressable> 
              <CircularButton iconName="plus" />
            </SpringPressable>
          </Row>
          <Column
          horizontalResizing="fill"
          spacing={theme.spacing.xxl}
          paddingHorizontal={theme.spacing.xxl}>       
         
          </Column>
          <SafeArea>
            <Row>
            <SpringPressable
            horizontalResizing="fill"
            verticalResizing='fill'
              onPress={() => {
                {/* */} //navigate to create 
              }}> 
            <Button text={'Save'} //add navigation
           horizontalResizing="fill"
           paddingHorizontal={theme.spacing.xxl}>
            </Button>
            </SpringPressable>
            <SpringPressable
             horizontalResizing="fill"
             verticalResizing='fill'
             onPress={() => {
               {/* */} //navigate to create 
             }}> 
            <Button text={'Delete'} //add navigation
           horizontalResizing="fill"
           paddingHorizontal={theme.spacing.xxl}>
            </Button>
            </SpringPressable>
            </Row>
          </SafeArea>
        </SafeArea>
    );
};

const styles = (theme: Theme) => StyleSheet.create({

    h1: {
  color: theme.colors.text,
  fontSize: 24,
  fontWeight: 'bold',
  alignSelf: 'stretch',
  textAlign: 'left',
  paddingTop: 20,
  paddingHorizontal: 20,
 },
 h2: {
  color: theme.colors.text,
  fontSize: 19,
  fontWeight: 'bold',
  alignSelf: 'stretch',
  textAlign: 'left',
  paddingTop: 20,
  paddingHorizontal: 20,
 }

 });
export default MealHomeScreen;







