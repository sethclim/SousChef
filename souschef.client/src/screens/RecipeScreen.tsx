import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DIFFICULTY} from '../api/responses';
import {
  BottomSheet,
  Button,
  CircularButton,
  Column,
  Row,
  SafeArea,
} from '../components';
import {BottomSheetRefProps, BottomSheetState} from '../components/BottomSheet';
import {SpringPressable} from '../components/pressable';
import {ThemeContext} from '../contexts/AppContext';
import {
  RecipeScreenNavigationProp,
  RecipeScreenRouteProp,
} from '../navigation/types';
import {Theme} from '../styles/type';

const RecipeScreen = ({
  navigation,
  route,
}: {
  navigation: RecipeScreenNavigationProp;
  route: RecipeScreenRouteProp;
}) => {
  // Route
  const {recipe} = route.params;

  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Ref
  const ref = useRef<BottomSheetRefProps>(null);

  // Use State
  const [favorite, setFavorite] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const onChange = (state: BottomSheetState) => {
    if (state == BottomSheetState.Hidden) {
      navigation.goBack();
    } else {
      setMaximized(state == BottomSheetState.Max);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeArea bgColor="#111">
        <Column
          justifyContent="flex-start"
          horizontalResizing="fill"
          verticalResizing="fill">
          <Row
            horizontalResizing="fill"
            justifyContent="flex-end"
            paddingHorizontal={theme.spacing.m}
            paddingVertical={theme.spacing.m}
            style={stylesWithTheme.floatingTop}>
            <SpringPressable onPress={() => setFavorite(!favorite)}>
              <CircularButton
                bgColor="#fff"
                color={theme.colors.danger}
                iconName={
                  favorite ? 'heart' : 'heart-outline'
                }></CircularButton>
            </SpringPressable>
          </Row>
          <Image
            source={require('../res/default-recipe.jpg')}
            style={stylesWithTheme.bannerImage}
          />
          <Image
            blurRadius={4}
            source={require('../res/default-recipe.jpg')}
            style={stylesWithTheme.backgroundImage}
          />
          <BottomSheet ref={ref} onStateChange={onChange} zIndex={2}>
            {maximized ? (
              <ScrollView>
                <Column
                  justifyContent="flex-start"
                  horizontalResizing="fill"
                  verticalResizing="fill"
                  paddingHorizontal={theme.spacing.m}
                  paddingVertical={theme.spacing.m}
                  spacing={theme.spacing.m}>
                  <Text numberOfLines={2} style={stylesWithTheme.h1}>
                    {recipe.name}
                  </Text>
                  <Row horizontalResizing="fill" spacing={theme.spacing.m}>
                    <Row spacing={theme.spacing.s}>
                      <MaterialIcons
                        name="timer"
                        style={stylesWithTheme.icon}
                      />
                      <Text style={stylesWithTheme.timerText}>
                        {recipe.duration / 60} min
                      </Text>
                    </Row>
                    <View style={stylesWithTheme.divider} />
                    <Row>
                      <MaterialIcons
                        name="star"
                        style={stylesWithTheme.starIcon}
                      />
                      <MaterialIcons
                        name="star"
                        style={[
                          stylesWithTheme.starIcon,
                          recipe.difficulty < DIFFICULTY.Medium
                            ? stylesWithTheme.starEmptyIcon
                            : {},
                        ]}
                      />
                      <MaterialIcons
                        name="star"
                        style={[
                          stylesWithTheme.starIcon,
                          recipe.difficulty < DIFFICULTY.Hard
                            ? stylesWithTheme.starEmptyIcon
                            : {},
                        ]}
                      />
                    </Row>
                    <View style={stylesWithTheme.divider} />
                    <Row spacing={theme.spacing.s}>
                      <MaterialIcons
                        name="person"
                        style={stylesWithTheme.icon}
                      />
                      <Text style={stylesWithTheme.timerText}>
                        {recipe.serves} Serving
                      </Text>
                    </Row>
                  </Row>
                  {/* Ingredients */}
                  <Column
                    alignItems="flex-start"
                    horizontalResizing="fill"
                    spacing={theme.spacing.s}>
                    <Text style={stylesWithTheme.h2}>Ingredients</Text>
                    {recipe.ingredients.map((ingredient, i) => (
                      <Row
                        key={i}
                        justifyContent="flex-start"
                        horizontalResizing="fill"
                        paddingHorizontal={theme.spacing.s}
                        spacing={theme.spacing.s}>
                        <View style={stylesWithTheme.listBullet} />
                        <Text key={i} style={stylesWithTheme.listItem}>
                          {`${ingredient.quantity} ${ingredient.name}`}
                        </Text>
                      </Row>
                    ))}
                  </Column>
                  {/* Kitchenware */}
                  <Column
                    alignItems="flex-start"
                    horizontalResizing="fill"
                    spacing={theme.spacing.s}>
                    <Text style={stylesWithTheme.h2}>Kitchenware</Text>
                    {recipe.kitchenware.map((kw, i) => (
                      <Row
                        key={i}
                        justifyContent="flex-start"
                        horizontalResizing="fill"
                        paddingHorizontal={theme.spacing.s}
                        spacing={theme.spacing.s}>
                        <View style={stylesWithTheme.listBullet} />
                        <Text key={i} style={stylesWithTheme.listItem}>
                          {`${kw.quantity}x ${kw.name}`}
                        </Text>
                      </Row>
                    ))}
                  </Column>
                  {/* Tasks */}
                  <Column
                    alignItems="flex-start"
                    horizontalResizing="fill"
                    spacing={theme.spacing.s}>
                    <Text style={stylesWithTheme.h2}>Steps</Text>
                    {recipe.tasks.map((task, i) => {
                      let backgroundColor = '#FBB148';
                      if (i % 3 == 1) backgroundColor = '#5ab885';
                      else if (i % 3 == 2) backgroundColor = '#80b2e0';
                      return (
                        <Row
                          key={i}
                          justifyContent="flex-start"
                          horizontalResizing="fill"
                          paddingHorizontal={theme.spacing.s}
                          spacing={theme.spacing.m}>
                          <Text
                            style={[
                              stylesWithTheme.listNumber,
                              {backgroundColor},
                            ]}>
                            {i + 1}
                          </Text>
                          <Text key={i} style={stylesWithTheme.listItem}>
                            {task.description}
                          </Text>
                        </Row>
                      );
                    })}
                  </Column>
                </Column>
              </ScrollView>
            ) : (
              <Column
                justifyContent="flex-start"
                horizontalResizing="fill"
                verticalResizing="fill"
                paddingHorizontal={theme.spacing.m}
                paddingVertical={theme.spacing.m}
                spacing={theme.spacing.m}>
                <Text numberOfLines={2} style={stylesWithTheme.h1}>
                  {recipe.name}
                </Text>
                <Row horizontalResizing="fill" spacing={theme.spacing.m}>
                  <Row spacing={theme.spacing.s}>
                    <MaterialIcons name="timer" style={stylesWithTheme.icon} />
                    <Text style={stylesWithTheme.timerText}>
                      {recipe.duration / 60} min
                    </Text>
                  </Row>
                  <View style={stylesWithTheme.divider} />
                  <Row>
                    <MaterialIcons
                      name="star"
                      style={stylesWithTheme.starIcon}
                    />
                    <MaterialIcons
                      name="star"
                      style={[
                        stylesWithTheme.starIcon,
                        recipe.difficulty < DIFFICULTY.Medium
                          ? stylesWithTheme.starEmptyIcon
                          : {},
                      ]}
                    />
                    <MaterialIcons
                      name="star"
                      style={[
                        stylesWithTheme.starIcon,
                        recipe.difficulty < DIFFICULTY.Hard
                          ? stylesWithTheme.starEmptyIcon
                          : {},
                      ]}
                    />
                  </Row>
                  <View style={stylesWithTheme.divider} />
                  <Row spacing={theme.spacing.s}>
                    <MaterialIcons name="person" style={stylesWithTheme.icon} />
                    <Text style={stylesWithTheme.timerText}>
                      {recipe.serves} Serving
                    </Text>
                  </Row>
                </Row>
                {/* Ingredients */}
                <Column
                  alignItems="flex-start"
                  horizontalResizing="fill"
                  spacing={theme.spacing.s}>
                  <Text style={stylesWithTheme.h2}>Ingredients</Text>
                  {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                    <Row
                      key={i}
                      justifyContent="flex-start"
                      horizontalResizing="fill"
                      paddingHorizontal={theme.spacing.s}
                      spacing={theme.spacing.s}>
                      <View style={stylesWithTheme.listBullet} />
                      <Text style={stylesWithTheme.listItem}>
                        {`${ingredient.quantity} ${ingredient.name}`}
                      </Text>
                    </Row>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <Row
                      justifyContent="flex-start"
                      horizontalResizing="fill"
                      paddingHorizontal={theme.spacing.s}
                      spacing={theme.spacing.s}>
                      <View style={stylesWithTheme.listBullet} />
                      <Text style={stylesWithTheme.listItem}>and more...</Text>
                    </Row>
                  )}
                </Column>
                {/* Steps */}
                <Column
                  alignItems="flex-start"
                  horizontalResizing="fill"
                  spacing={theme.spacing.s}>
                  <Text style={stylesWithTheme.h2}>Steps</Text>
                  {recipe.tasks.map((task, i) => {
                    let backgroundColor = '#FBB148';
                    if (i % 3 == 1) backgroundColor = '#5ab885';
                    else if (i % 3 == 2) backgroundColor = '#80b2e0';
                    return (
                      <Row
                        key={i}
                        justifyContent="flex-start"
                        horizontalResizing="fill"
                        paddingHorizontal={theme.spacing.s}
                        spacing={theme.spacing.m}>
                        <Text
                          style={[
                            stylesWithTheme.listNumber,
                            {backgroundColor},
                          ]}>
                          {i + 1}
                        </Text>
                        <Text key={i} style={stylesWithTheme.listItem}>
                          {task.description}
                        </Text>
                      </Row>
                    );
                  })}
                </Column>
              </Column>
            )}
          </BottomSheet>
        </Column>
      </SafeArea>
    </GestureHandlerRootView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    bannerImage: {
      width: '100%',
      height: '40%',
    },
    backgroundImage: {width: '100%', height: '60%'},
    floatingTop: {
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 1,
    },
    h1: {
      color: theme.colors.text,
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    h2: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: 'bold',
    },
    icon: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 24,
    },
    timerText: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    starIcon: {
      color: '#ffcd3c',
      fontSize: 28,
    },
    starEmptyIcon: {
      color: '#fff2ce',
    },
    divider: {
      width: 2,
      height: 36,
      backgroundColor: '#D9D9D9',
      alignSelf: 'center',
      borderRadius: 8,
    },
    listItem: {
      color: theme.colors.text,
      fontSize: 16,
    },
    listBullet: {
      backgroundColor: '#FBB148',
      width: 8,
      height: 8,
      borderRadius: 32,
    },
    listNumber: {
      backgroundColor: '#FBB148',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      width: 28,
      height: 28,
      borderRadius: 32,
    },
  });

export default RecipeScreen;
