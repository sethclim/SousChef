import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DIFFICULTY} from '../api/responses';
import {
  BottomSheet,
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
  const [max, setMax] = useState(BottomSheetState.Min);


  const [favorite, setFavorite] = useState(false);


  const onChange = (state : BottomSheetState) => {
    setMax(state);
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeArea>
        <Column
          justifyContent="flex-start"
          horizontalResizing="fill"
          verticalResizing="fill">
          <Row
            horizontalResizing="fill"
            justifyContent="flex-end"
            paddingHorizontal={theme.spacing.m}
            paddingVertical={theme.spacing.m}
            style={stylesWithTheme.floating}>
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
            style={stylesWithTheme.bannerImage}></Image>
          <BottomSheet ref={ref} onStateChange={onChange}>
            {
              max ?
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
                    <MaterialIcons name="star" style={stylesWithTheme.starIcon} />
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
                          style={[stylesWithTheme.listNumber, {backgroundColor}]}>
                          {i + 1}
                        </Text>
                        <Text key={i} style={stylesWithTheme.listItem}>
                          {task.description}
                        </Text>
                      </Row>
                    );
                  })}
                </Column>
              </Column>:

                    null
              



            }

          </BottomSheet>
        </Column>
      </SafeArea>
    </GestureHandlerRootView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    bannerImage: {width: '100%', height: '40%'},
    floating: {
      position: 'absolute',
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
