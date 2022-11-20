import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import {TaskScreenNavigationProp} from '../navigation/types';
import {theme} from '../styles/theme';

const TaskScreen = ({navigation, route}: TaskScreenNavigationProp) => {
  const {name: taskName} = route.params;

  // TO-DO: Plug variables from route.params
  const difficulty = 1; // [0-3]
  const timerInSeconds = 0 * 3600 + 5 * 60 + 0; // hr + min + sec
  const estimatedTimeInSeconds = 0 * 3600 + 30 * 60 + 0; // hr + min + sec
  const taskOverview = 'Chop the carrots into thin slices.';
  const taskDetails =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sedodio suscipit nunc suscipit varius a vitae nisi. Sed auctor non risus et hendrerit. Nullam erat nisi, vehicula faucibus posuere eu, aliquet in orci. Aenean consectetur scelerisque ex sit amet condimentum.';
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
              <MaterialIcons name="timer" style={styles.timerIcon} />
              <Text style={styles.timerText}>{timerInSeconds / 60}min</Text>
            </Row>
            <Row>
              <MaterialIcons
                name="star"
                style={[
                  styles.starIcon,
                  difficulty <= 0 ? styles.starEmptyIcon : {},
                ]}
              />
              <MaterialIcons
                name="star"
                style={[
                  styles.starIcon,
                  difficulty <= 1 ? styles.starEmptyIcon : {},
                ]}
              />
              <MaterialIcons
                name="star"
                style={[
                  styles.starIcon,
                  difficulty <= 2 ? styles.starEmptyIcon : {},
                ]}
              />
            </Row>
          </Row>
          <AccordionCard title="Your Task">
            <Column verticalResizing="fill" horizontalResizing="fill">
              <Text style={styles.cardDescription}>{taskOverview}</Text>
              <Row
                horizontalResizing="fill"
                paddingHorizontal={theme.spacing.m}>
                <SpringPressable
                  horizontalResizing="fill"
                  verticalResizing="fill"
                  onPress={taskCompleted}
                  style={{marginRight: theme.spacing.s}}>
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
            <Column horizontalResizing="fill" paddingVertical={theme.spacing.s}>
              <Text style={styles.cardDescription}>{taskDetails}</Text>
              <Row
                horizontalResizing="fill"
                paddingHorizontal={theme.spacing.m}>
                <SpringPressable
                  horizontalResizing="fill"
                  verticalResizing="fill"
                  onPress={taskCompleted}
                  style={{marginRight: theme.spacing.s}}>
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
              <Row>
                <MaterialIcons name="access-time" style={styles.timeIcon} />
                <Text style={[{fontWeight: 'bold'}, styles.timeText]}>
                  Est. Meal Time:{' '}
                </Text>
                <Text style={styles.timeText}>
                  {estimatedTimeInSeconds / 60}min
                </Text>
              </Row>
              <Text style={styles.viewMore}>View more</Text>
            </Row>
          </OpacityPressable>
        </Card>
      </Column>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  cardDescription: {
    fontSize: 18,
    marginVertical: theme.spacing.m,
    alignSelf: 'stretch',
    textAlign: 'left',
    color: theme.colors.lightText,
  },
  timerIcon: {color: theme.colors.lightText, textAlign: 'center', fontSize: 24},
  timerText: {
    color: theme.colors.lightText,
    textAlign: 'center',
    marginLeft: 6,
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
  timeIcon: {color: theme.colors.lightText, textAlign: 'center', fontSize: 28},
  timeText: {
    fontSize: 16,
    color: theme.colors.lightText,
    marginLeft: 6,
  },
  viewMore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.blue,
  },
});

export default TaskScreen;
