import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ThemeContext} from '../contexts/AppContext';
import {Button, CircularButton, Column, Input, Row, SafeArea} from '../components';
import {IconButton} from '../components'
import {Theme} from '../styles/type';
import { SpringPressable } from '../components/pressable';

const MealHomeScreen = () => {
    // Theme
    const theme = useContext(ThemeContext);
    const stylesWithTheme = styles(theme);
    const [name, setMealName] = React.useState<string>('');

    return(
        <SafeArea>
            <Text style ={stylesWithTheme.h1}>Meal Name</Text>
            <Input
          bgColor={theme.colors.foreground}
          placeholder="Name"
          horizontalResizing="fill"
          onChangeText={value => {
            setMealName(value);
          }}/>
          <Row
           spacing={theme.spacing.xxl}
           paddingHorizontal={theme.spacing.xxl}>
    
          <Text style ={stylesWithTheme.h1}>Appetizer</Text>
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
    
          <Text style ={stylesWithTheme.h1}>Entrée</Text>
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
    
          <Text style ={stylesWithTheme.h1}>Dessert</Text>
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
            <SpringPressable> 
            <Button text={' SET THE DATE!'}
           horizontalResizing="fill"
           paddingHorizontal={theme.spacing.xxl}>
            </Button>
            </SpringPressable>
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
 }

 });
export default MealHomeScreen;







