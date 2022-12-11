import React, {useContext, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AuthContext, ThemeContext} from '../../contexts/AppContext';
import {Button, Card, Column, Row, SafeArea} from '../../components';
import {Theme} from '../../styles/type';
import {CookScreenNavigationProp} from '../../navigation/types';
import {SpringPressable} from '../../components/pressable';
import {defaultRecipe, MealPlan, Recipe} from '../../api/responses';
import {useGet} from '../../hooks';
import {ApiUrls} from '../../api/constants/ApiConstants';

const CookScreen = ({navigation}: {navigation: CookScreenNavigationProp}) => {
  // User
  const {user} = useContext(AuthContext);

  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const [todayMealPlan, setTodayMealPlan] = React.useState<MealPlan[]>([]);
  let mealPlanId: string | undefined;

  // API Calls
  const {
    get: getMealPlans,
    data: mealPlans,
    success: mealPlansSuccess,
    loading: mealPlansLoading,
    error: mealPlansError,
  } = useGet<MealPlan[]>(
    `${ApiUrls.getTodaysMealPlans}?userId=${user?.id}`,
    [],
  );

  const {
    get: startMealPlan,
    data: startMealPlanData,
    success: startMealPlanSuccess,
    loading: startMealPlanLoading,
    error: startMealPlanError,
  } = useGet(`${ApiUrls.startMealPlan}?sessionId=${mealPlanId}`);

  // OnMount
  useEffect(() => {
    navigation.addListener('focus', onMount);
    return () => {
      navigation.removeListener('focus', onMount);
    };
  }, []);

  useEffect(() => {
    setTodayMealPlan(mealPlans ?? []);
  }, [mealPlans]);

  useEffect(() => {
    if (startMealPlanSuccess)
      navigation.navigate('Task', {sessionId: mealPlanId!});
  }, [startMealPlanSuccess]);

  // Methods
  const onMount = () => {
    getMealPlans(); // API Request
  };

  // Methods
  const mealPlanPressed = (mealPlan: MealPlan) => {
    mealPlanId = mealPlan.id;
    startMealPlan();
  };

  const joinSession = () => {
    navigation.navigate('Task', {sessionId: mealPlanId!});
  };

  return (
    <SafeArea>
      <Column
        justifyContent="flex-start"
        horizontalResizing="fill"
        verticalResizing="fill"
        paddingVertical={theme.spacing.xl}
        spacing={theme.spacing.m}>
        <Column alignItems="flex-start" horizontalResizing="fill">
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
                {todayMealPlan.map((mealPlan, i) => {
                  return (
                    <SpringPressable
                      key={i}
                      onPress={() => mealPlanPressed(mealPlan)}>
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
                            {mealPlan.name}
                          </Text>
                          <View
                            style={stylesWithTheme.imageOverlayButtonContainer}>
                            <Button
                              text="START"
                              style={stylesWithTheme.imageOverlayButton}
                            />
                          </View>
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
    h1: {
      color: theme.colors.text,
      fontSize: 28,
      fontWeight: 'bold',
      paddingHorizontal: theme.spacing.m,
      paddingTop: theme.spacing.l,
    },
    h2: {color: theme.colors.text, fontSize: 20, fontWeight: 'bold'},
    h3: {color: theme.colors.text, fontSize: 14},
    optional: {
      color: '#D0BEBE',
      fontSize: 18,
      paddingHorizontal: theme.spacing.m,
      paddingTop: theme.spacing.s,
    },
    mediumImage: {
      width: mediumImage.width,
      height: mediumImage.height,
      borderRadius: 8,
      shadowRadius: 8,
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    imageOverlayText: {
      width: '100%',
      color: '#fff',
      backgroundColor: '#0008',
      padding: theme.spacing.s,
      borderRadius: 8,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    imageOverlayButtonContainer: {
      width: '100%',
      padding: theme.spacing.s,
    },
    imageOverlayButton: {
      width: '100%',
      color: '#fff',
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      paddingVertical: theme.spacing.s,
    },
  });

export default CookScreen;
