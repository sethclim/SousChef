import React, {useContext, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import {ThemeContext} from '../../contexts/AppContext';
import {Button, Card, Column, Row, SafeArea} from '../../components';
import {Theme} from '../../styles/type';
import {CookScreenNavigationProp} from '../../navigation/types';
import {SpringPressable} from '../../components/pressable';
import {defaultRecipe, Recipe} from '../../api/responses';
import {useGet} from '../../hooks';
import {ApiUrls} from '../../api/constants/ApiConstants';

const CookScreen = ({navigation}: {navigation: CookScreenNavigationProp}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const [todayMealPlan, setTodayMealPlan] = React.useState<Recipe[]>([
    defaultRecipe,
    defaultRecipe,
    defaultRecipe,
    defaultRecipe,
    defaultRecipe,
  ]);

  // API Calls
  // const {
  //   get: getMealPlans,
  //   data: mealPlans,
  //   loading: mealPlansLoading,
  //   error: mealPlansError,
  // } = useGet<Recipe[]>(`${ApiUrls.getTodaysMealPlans}?userId=${}`, []);

  // OnMount
  // useEffect(() => {
  //   navigation.addListener('focus', onMount);
  //   return () => {
  //     navigation.removeListener('focus', onMount);
  //   };
  // }, []);

  // OnMealPlansData
  // useEffect(() => {
  //   setTodayMealPlan(mealPlans);
  // }, [mealPlans]);

  // Methods
  // const onMount = () => {
  //   getMealPlans(); // API Request
  // };

  // Methods
  const mealPlanPressed = (_recipe: Recipe) => {
    //navigation.navigate('Recipe', {recipe: _recipe});
  };

  const joinSession = () => {
    navigation.navigate('Task', {sessionId: ''});
  };
  return (
    <SafeArea>
      <Column
        justifyContent="flex-start"
        horizontalResizing="fill"
        verticalResizing="fill"
        paddingVertical={theme.spacing.m}
        spacing={theme.spacing.m}>
        <Column horizontalResizing="fill" spacing={theme.spacing.l}>
          <Text style={stylesWithTheme.h1}>Today's Meal Plan</Text>
          {todayMealPlan.length == 0 ? (
            <Text style={stylesWithTheme.optional}>
              No meal plan set for today
            </Text>
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: theme.spacing.m,
                paddingVertical: theme.spacing.m,
              }}>
              <Row horizontalResizing="fill" spacing={theme.spacing.m}>
                {todayMealPlan.map((recipe, i) => {
                  return (
                    <SpringPressable
                      key={i}
                      onPress={() => mealPlanPressed(recipe)}>
                      <Card paddingHorizontal={0} paddingVertical={0}>
                        <Image
                          source={require('../../res/default-recipe.jpg')}
                          style={stylesWithTheme.mediumImage}></Image>
                        <Column
                          justifyContent="space-between"
                          style={stylesWithTheme.imageOverlay}>
                          <Text
                            numberOfLines={4}
                            style={stylesWithTheme.imageOverlayText}>
                            {recipe.name}
                          </Text>
                          <Button
                            text="START"
                            style={stylesWithTheme.imageOverlayButton}
                          />
                        </Column>
                      </Card>
                    </SpringPressable>
                  );
                })}
              </Row>
            </ScrollView>
          )}
        </Column>
        <Column verticalResizing="fill" spacing={theme.spacing.s}>
          <Text style={stylesWithTheme.h2}>Join Session</Text>
          <Text style={stylesWithTheme.h3}>
            Scan a QR code on the host's phone
          </Text>
          <SpringPressable onPress={joinSession}>
            <Button
              elevation={4}
              borderRadius={12}
              paddingVertical={12}
              paddingHorizontal={theme.spacing.l}
              text="Scan Code"
            />
          </SpringPressable>
        </Column>
      </Column>
    </SafeArea>
  );
};

const mediumImage = {width: 175, height: 200};

const styles = (theme: Theme) =>
  StyleSheet.create({
    h1: {color: theme.colors.text, fontSize: 28, fontWeight: 'bold'},
    h2: {color: theme.colors.text, fontSize: 20, fontWeight: 'bold'},
    h3: {color: theme.colors.text, fontSize: 14},
    optional: {
      color: '#D0BEBE',
      fontSize: 18,
      paddingTop: theme.spacing.s,
    },
    mediumImage: {
      width: mediumImage.width,
      height: mediumImage.height,
      borderRadius: 8,
      shadowRadius: 8,
    },
    imageOverlay: {
      backgroundColor: '#0008',
      padding: theme.spacing.s,
      borderRadius: 8,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    imageOverlayText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    imageOverlayButton: {
      color: '#fff',
      backgroundColor: theme.colors.primary,
      width: '100%',
      borderRadius: 8,
      paddingVertical: theme.spacing.s,
    },
  });

export default CookScreen;
