import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext, ThemeContext} from '../contexts/AppContext';
import {ApiUrls} from '../api/constants/ApiConstants';
import {
  AccordionCard,
  BottomSheet,
  Card,
  Column,
  IconButton,
  Row,
  SafeArea,
  Timer,
} from '../components';
import CircularButton from '../components/CircularButton';
import {OpacityPressable, SpringPressable} from '../components/pressable';
import {
  TaskScreenNavigationProp,
  TaskScreenRouteProp,
} from '../navigation/types';
import {Theme} from '../styles/type';
import {useGet, usePost} from '../hooks';
import {defaultTask, DIFFICULTY, Task} from '../api/responses';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetState} from '../components/BottomSheet';

const TaskScreen = ({
  navigation,
  route,
}: {
  navigation: TaskScreenNavigationProp;
  route: TaskScreenRouteProp;
}) => {
  // Route
  const {sessionId} = route.params;

  // User
  const {user} = useContext(AuthContext);

  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const [maximized, setMaximized] = useState(false);
  const estimatedMealTimeInSeconds = 0 * 3600 + 30 * 60 + 0; // hr + min + sec

  // API Calls
  const {
    get: getTask,
    data: taskData,
    loading: taskLoading,
    error: taskError,
  } = useGet<Task>(ApiUrls.getTask, defaultTask);

  const {
    post: completeTask,
    loading: completeTaskLoading,
    error: completeTaskError,
  } = usePost(ApiUrls.completeTask);

  // OnMount
  useEffect(() => {
    getTask({sessionId: sessionId, userId: user?.id});
  }, []);

  // Methods
  const onChange = (state: BottomSheetState) => {
    setMaximized(state == BottomSheetState.Max);
  };

  const viewMore = () => {
    console.log('View More');
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeArea bgColor="#111">
        <Column
          justifyContent="flex-start"
          horizontalResizing="fill"
          verticalResizing="fill">
          <Image
            source={require('../res/default-recipe.jpg')}
            style={stylesWithTheme.bannerImage}
          />
          <Image
            blurRadius={4}
            source={require('../res/default-recipe.jpg')}
            style={stylesWithTheme.backgroundImage}
          />
          <BottomSheet onStateChange={onChange} zIndex={2}>
            {maximized ? (
              <Column
                justifyContent="flex-start"
                horizontalResizing="fill"
                verticalResizing="fill"
                paddingHorizontal={theme.spacing.m}
                paddingVertical={theme.spacing.m}
                spacing={theme.spacing.m}>
                <Timer seconds={60} />
                <Text numberOfLines={2} style={stylesWithTheme.h1}>
                  {taskData!.name}
                </Text>
                <Row horizontalResizing="fill" spacing={theme.spacing.m}>
                  <Row spacing={theme.spacing.s}>
                    <MaterialIcons name="timer" style={stylesWithTheme.icon} />
                    <Text style={stylesWithTheme.timerText}>
                      {taskData!.duration / 60} min
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
                        taskData!.difficulty < DIFFICULTY.Medium
                          ? stylesWithTheme.starEmptyIcon
                          : {},
                      ]}
                    />
                    <MaterialIcons
                      name="star"
                      style={[
                        stylesWithTheme.starIcon,
                        taskData!.difficulty < DIFFICULTY.Hard
                          ? stylesWithTheme.starEmptyIcon
                          : {},
                      ]}
                    />
                  </Row>
                </Row>
                <Column
                  justifyContent="flex-start"
                  horizontalResizing="fill"
                  verticalResizing="fill"
                  spacing={theme.spacing.l}>
                  {/* Instruction */}
                  <Column
                    alignItems="flex-start"
                    horizontalResizing="fill"
                    spacing={theme.spacing.s}>
                    <Text style={stylesWithTheme.h2}>Instruction</Text>
                    <Row
                      justifyContent="flex-start"
                      horizontalResizing="fill"
                      paddingHorizontal={theme.spacing.s}
                      spacing={theme.spacing.s}>
                      <View style={stylesWithTheme.listBullet} />
                      <Text style={stylesWithTheme.listItem}>
                        {taskData!.description}
                      </Text>
                    </Row>
                  </Column>
                  {/* Ingredients */}
                  <Column
                    alignItems="flex-start"
                    horizontalResizing="fill"
                    spacing={theme.spacing.s}>
                    <Text style={stylesWithTheme.h2}>Ingredients</Text>
                    {taskData!.ingredients.map((ingredient, i) => (
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
                  </Column>
                  {/* Kitchenware */}
                  <Column
                    alignItems="flex-start"
                    horizontalResizing="fill"
                    spacing={theme.spacing.s}>
                    <Text style={stylesWithTheme.h2}>Kitchenware</Text>
                    {taskData!.kitchenware.map((kitchenware, i) => (
                      <Row
                        key={i}
                        justifyContent="flex-start"
                        horizontalResizing="fill"
                        paddingHorizontal={theme.spacing.s}
                        spacing={theme.spacing.s}>
                        <View style={stylesWithTheme.listBullet} />
                        <Text style={stylesWithTheme.listItem}>
                          {`${kitchenware.quantity}x ${kitchenware.name}`}
                        </Text>
                      </Row>
                    ))}
                  </Column>
                  {/* Buttons */}
                  <Row
                    horizontalResizing="fill"
                    spacing={theme.spacing.s}
                    paddingHorizontal={theme.spacing.m}>
                    <SpringPressable
                      horizontalResizing="fill"
                      verticalResizing="fill"
                      onPress={() => {
                        completeTask({
                          query: {
                            sessionId: sessionId,
                            taskId: taskData?.id,
                          },
                        });
                        getTask({sessionId: sessionId, userId: user?.id});
                      }}>
                      <IconButton
                        iconName="check"
                        text="Complete Task"
                        horizontalResizing="fill"
                        verticalResizing="fill"
                      />
                    </SpringPressable>
                    <SpringPressable
                      onPress={() =>
                        getTask({sessionId: sessionId, userId: user?.id})
                      }>
                      <CircularButton iconName="reload" />
                    </SpringPressable>
                  </Row>
                  {/* Estimated Meal Time */}
                  <Card>
                    <OpacityPressable
                      horizontalResizing="fill"
                      onPress={viewMore}>
                      <Row
                        horizontalResizing="fill"
                        justifyContent="space-between">
                        <Row spacing={theme.spacing.s}>
                          <MaterialIcons
                            name="access-time"
                            style={stylesWithTheme.timeIcon}
                          />
                          <Text
                            style={[
                              {fontWeight: 'bold'},
                              stylesWithTheme.timeText,
                            ]}>
                            Est. Meal Time:
                          </Text>
                          <Text style={stylesWithTheme.timeText}>
                            {estimatedMealTimeInSeconds / 60} min
                          </Text>
                        </Row>
                        <Text style={stylesWithTheme.viewMore}>View more</Text>
                      </Row>
                    </OpacityPressable>
                  </Card>
                </Column>
              </Column>
            ) : (
              <Column
                justifyContent="flex-start"
                horizontalResizing="fill"
                verticalResizing="fill"
                paddingHorizontal={theme.spacing.m}
                paddingVertical={theme.spacing.m}
                spacing={theme.spacing.m}>
                <Text numberOfLines={2} style={stylesWithTheme.h1}>
                  {taskData!.name}
                </Text>
                <Row horizontalResizing="fill" spacing={theme.spacing.m}>
                  <Row spacing={theme.spacing.s}>
                    <MaterialIcons name="timer" style={stylesWithTheme.icon} />
                    <Text style={stylesWithTheme.timerText}>
                      {taskData!.duration / 60} min
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
                        taskData!.difficulty < DIFFICULTY.Medium
                          ? stylesWithTheme.starEmptyIcon
                          : {},
                      ]}
                    />
                    <MaterialIcons
                      name="star"
                      style={[
                        stylesWithTheme.starIcon,
                        taskData!.difficulty < DIFFICULTY.Hard
                          ? stylesWithTheme.starEmptyIcon
                          : {},
                      ]}
                    />
                  </Row>
                </Row>
                <Column
                  justifyContent="flex-start"
                  horizontalResizing="fill"
                  verticalResizing="fill"
                  spacing={theme.spacing.l}>
                  {/* Instruction */}
                  <Column
                    alignItems="flex-start"
                    horizontalResizing="fill"
                    spacing={theme.spacing.s}>
                    <Text style={stylesWithTheme.h2}>Instruction</Text>
                    <Row
                      justifyContent="flex-start"
                      horizontalResizing="fill"
                      paddingHorizontal={theme.spacing.s}
                      spacing={theme.spacing.s}>
                      <View style={stylesWithTheme.listBullet} />
                      <Text style={stylesWithTheme.listItem}>
                        {taskData!.description}
                      </Text>
                    </Row>
                  </Column>
                  {/* Buttons */}
                  <Row
                    horizontalResizing="fill"
                    spacing={theme.spacing.s}
                    paddingHorizontal={theme.spacing.m}>
                    <SpringPressable
                      horizontalResizing="fill"
                      verticalResizing="fill"
                      onPress={() => {
                        completeTask({
                          query: {
                            sessionId: sessionId,
                            taskId: taskData?.id,
                          },
                        });
                        getTask({sessionId: sessionId, userId: user?.id});
                      }}>
                      <IconButton
                        iconName="check"
                        text="Complete Task"
                        horizontalResizing="fill"
                        verticalResizing="fill"
                      />
                    </SpringPressable>
                    <SpringPressable
                      onPress={() =>
                        getTask({sessionId: sessionId, userId: user?.id})
                      }>
                      <CircularButton iconName="reload" />
                    </SpringPressable>
                  </Row>
                  {/* Estimated Meal Time */}
                  <Card>
                    <OpacityPressable
                      horizontalResizing="fill"
                      onPress={viewMore}>
                      <Row
                        horizontalResizing="fill"
                        justifyContent="space-between">
                        <Row spacing={theme.spacing.s}>
                          <MaterialIcons
                            name="access-time"
                            style={stylesWithTheme.timeIcon}
                          />
                          <Text
                            style={[
                              {fontWeight: 'bold'},
                              stylesWithTheme.timeText,
                            ]}>
                            Est. Meal Time:
                          </Text>
                          <Text style={stylesWithTheme.timeText}>
                            {estimatedMealTimeInSeconds / 60} min
                          </Text>
                        </Row>
                        <Text style={stylesWithTheme.viewMore}>View more</Text>
                      </Row>
                    </OpacityPressable>
                  </Card>
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
    cardDescription: {
      fontSize: 18,
      alignSelf: 'stretch',
      textAlign: 'left',
      color: theme.colors.text,
    },
    timerIcon: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 24,
    },
    timeIcon: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 28,
    },
    timeText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    viewMore: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });

export default TaskScreen;
