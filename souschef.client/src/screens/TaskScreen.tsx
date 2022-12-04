import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext} from '../contexts/AppContext';
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
import {TaskScreenRouteProp} from '../navigation/types';
import {Theme} from '../styles/type';

const TaskScreen = ({route}: {route: TaskScreenRouteProp}) => {
  // Route
  const {name} = route.params;

  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // TO-DO: Plug variables from route.params
  const difficulty = 1; // [0-3]
  const timerInSeconds = 0 * 3600 + 5 * 60 + 0; // hr + min + sec
  const estimatedTimeInSeconds = 0 * 3600 + 30 * 60 + 0; // hr + min + sec
  const taskOverview = 'Chop the carrots into thin slices.';
  const taskDetails =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sedodio suscipit nunc suscipit varius a vitae nisi. Sed auctor non risus et hendrerit. Nullam erat nisi, vehicula faucibus posuere eu, aliquet in orci. Aenean consectetur scelerisque ex sit amet condimentum.';

  // Methods
  const taskCompleted = () => {
    console.log('Task Completed');
  };
  const requestNewTask = () => {
    console.log('Request New Task');
  };
  const viewMore = () => {
    console.log('View More');
  };

  return (
    <SafeArea>
      <Column
        horizontalResizing="fill"
        justifyContent="flex-start"
        paddingVertical={theme.spacing.xl}>
        <Timer seconds={timerInSeconds} />
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
                {timerInSeconds / 60}min
              </Text>
            </Row>
            <Row>
              <MaterialIcons
                name="star"
                style={[
                  stylesWithTheme.starIcon,
                  difficulty <= 0 ? stylesWithTheme.starEmptyIcon : {},
                ]}
              />
              <MaterialIcons
                name="star"
                style={[
                  stylesWithTheme.starIcon,
                  difficulty <= 1 ? stylesWithTheme.starEmptyIcon : {},
                ]}
              />
              <MaterialIcons
                name="star"
                style={[
                  stylesWithTheme.starIcon,
                  difficulty <= 2 ? stylesWithTheme.starEmptyIcon : {},
                ]}
              />
            </Row>
          </Row>
          <AccordionCard title="Your Task">
            <Column
              verticalResizing="fill"
              horizontalResizing="fill"
              spacing={theme.spacing.m}>
              <Text style={stylesWithTheme.cardDescription}>
                {taskOverview}
              </Text>
              <Row
                horizontalResizing="fill"
                spacing={theme.spacing.s}
                paddingHorizontal={theme.spacing.m}>
                <SpringPressable
                  horizontalResizing="fill"
                  verticalResizing="fill"
                  onPress={taskCompleted}>
                  <IconButton
                    iconName="check"
                    text="Complete Task"
                    horizontalResizing="fill"
                    verticalResizing="fill"
                  />
                </SpringPressable>
                <SpringPressable onPress={requestNewTask}>
                  <CircularButton iconName="reload" />
                </SpringPressable>
              </Row>
            </Column>
            <Column horizontalResizing="fill" spacing={theme.spacing.m}>
              <Text style={stylesWithTheme.cardDescription}>{taskDetails}</Text>
              <Row
                horizontalResizing="fill"
                spacing={theme.spacing.s}
                paddingHorizontal={theme.spacing.m}>
                <SpringPressable
                  horizontalResizing="fill"
                  verticalResizing="fill"
                  onPress={taskCompleted}>
                  <IconButton
                    iconName="check"
                    text="Complete Task"
                    horizontalResizing="fill"
                    verticalResizing="fill"
                  />
                </SpringPressable>
                <SpringPressable onPress={requestNewTask}>
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
                <Text style={[{fontWeight: 'bold'}, stylesWithTheme.timeText]}>
                  Est. Meal Time:{' '}
                </Text>
                <Text style={stylesWithTheme.timeText}>
                  {estimatedTimeInSeconds / 60}min
                </Text>
              </Row>
              <Text style={stylesWithTheme.viewMore}>View more</Text>
            </Row>
          </OpacityPressable>
        </Card>
      </Column>
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
