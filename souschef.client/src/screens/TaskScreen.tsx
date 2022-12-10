import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext} from '../contexts/AppContext';
import {ApiUrls} from '../api/constants/ApiConstants';
import {
  AccordionCard,
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
import {defaultTask, Task} from '../api/responses';

const TaskScreen = ({
  navigation,
  route,
}: {
  navigation: TaskScreenNavigationProp;
  route: TaskScreenRouteProp;
}) => {
  // Route
  // const {sessionId} = route.params;
  const sessionId = '4d9de020-74ba-4f7a-b38f-8aa9753b65ce'; // TEMPORARY (CHANGES EVERYTIME)

  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const estimatedMealTimeInSeconds = 0 * 3600 + 30 * 60 + 0; // hr + min + sec

  // API Calls
  const {
    get: GetTask,
    data: GetTaskData,
    loading: GetTaskLoading,
    error: GetTaskError,
  } = useGet<Task>(`${ApiUrls.getTask}?sessionId=${sessionId}`, defaultTask);
  const {
    post: CompleteTask,
    data: CompleteTaskData,
    loading: CompleteTaskLoading,
    error: CompleteTaskError,
  } = usePost(
    `${ApiUrls.completeTask}?sessionId=${sessionId}&taskId=${GetTaskData?.id}`,
  );

  // OnMount
  useEffect(() => {
    GetTask();
  }, []);

  // Methods
  const viewMore = () => {
    console.log('View More');
  };

  return (
    <SafeArea>
      {!GetTaskData ? null : (
        <Column
          horizontalResizing="fill"
          justifyContent="flex-start"
          paddingVertical={theme.spacing.xl}>
          <Timer seconds={GetTaskData.duration} />
          <Text>{`${GetTaskError}`}</Text>
          <Column
            verticalResizing="fill"
            horizontalResizing="fill"
            paddingVertical={theme.spacing.m}>
            <Row
              horizontalResizing="fill"
              justifyContent="space-between"
              paddingHorizontal={theme.spacing.s}
              paddingVertical={theme.spacing.s}>
              <Row>
                <MaterialIcons name="timer" style={stylesWithTheme.timerIcon} />
                <Text style={stylesWithTheme.timerText}>
                  {GetTaskData.duration / 60}min
                </Text>
              </Row>
              <Row>
                <MaterialIcons
                  name="star"
                  style={[
                    stylesWithTheme.starIcon,
                    GetTaskData.difficulty <= 0
                      ? stylesWithTheme.starEmptyIcon
                      : {},
                  ]}
                />
                <MaterialIcons
                  name="star"
                  style={[
                    stylesWithTheme.starIcon,
                    GetTaskData.difficulty <= 1
                      ? stylesWithTheme.starEmptyIcon
                      : {},
                  ]}
                />
                <MaterialIcons
                  name="star"
                  style={[
                    stylesWithTheme.starIcon,
                    GetTaskData.difficulty <= 2
                      ? stylesWithTheme.starEmptyIcon
                      : {},
                  ]}
                />
              </Row>
            </Row>
            <AccordionCard title={GetTaskData.name}>
              <Column
                verticalResizing="fill"
                horizontalResizing="fill"
                spacing={theme.spacing.m}>
                <Text style={stylesWithTheme.cardDescription}>
                  {GetTaskData.description}
                </Text>
                <Row
                  horizontalResizing="fill"
                  spacing={theme.spacing.s}
                  paddingHorizontal={theme.spacing.m}>
                  <SpringPressable
                    horizontalResizing="fill"
                    verticalResizing="fill"
                    onPress={() => {
                      CompleteTask();
                      GetTask();
                    }}>
                    <IconButton
                      iconName="check"
                      text="Complete Task"
                      horizontalResizing="fill"
                      verticalResizing="fill"
                    />
                  </SpringPressable>
                  <SpringPressable onPress={GetTask}>
                    <CircularButton iconName="reload" />
                  </SpringPressable>
                </Row>
              </Column>
              <Column horizontalResizing="fill" spacing={theme.spacing.m}>
                <Text style={stylesWithTheme.cardDescription}>
                  {GetTaskData.description}
                </Text>
                <Row
                  horizontalResizing="fill"
                  spacing={theme.spacing.s}
                  paddingHorizontal={theme.spacing.m}>
                  <SpringPressable
                    horizontalResizing="fill"
                    verticalResizing="fill"
                    onPress={() => {
                      CompleteTask();
                      GetTask();
                    }}>
                    <IconButton
                      iconName="check"
                      text="Complete Task"
                      horizontalResizing="fill"
                      verticalResizing="fill"
                    />
                  </SpringPressable>
                  <SpringPressable onPress={GetTask}>
                    <CircularButton iconName="reload" />
                  </SpringPressable>
                </Row>
              </Column>
            </AccordionCard>
          </Column>
          <Card>
            <OpacityPressable horizontalResizing="fill" onPress={viewMore}>
              <Row horizontalResizing="fill" justifyContent="space-between">
                <Row spacing={theme.spacing.s}>
                  <MaterialIcons
                    name="access-time"
                    style={stylesWithTheme.timeIcon}
                  />
                  <Text
                    style={[{fontWeight: 'bold'}, stylesWithTheme.timeText]}>
                    Est. Meal Time:{' '}
                  </Text>
                  <Text style={stylesWithTheme.timeText}>
                    {estimatedMealTimeInSeconds / 60}min
                  </Text>
                </Row>
                <Text style={stylesWithTheme.viewMore}>View more</Text>
              </Row>
            </OpacityPressable>
          </Card>
        </Column>
      )}
    </SafeArea>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
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
    timerText: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 16,
    },
    starIcon: {
      color: '#ffcd3c',
      fontSize: 30,
      elevation: 4,
      shadowRadius: 8,
      shadowColor: '#000',
    },
    starEmptyIcon: {
      color: '#fae199',
    },
    dropdownIcon: {color: '#979CA5', fontSize: 36},
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
