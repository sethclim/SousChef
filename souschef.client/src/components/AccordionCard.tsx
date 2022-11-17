import React, {useRef, useState, type PropsWithChildren} from 'react';
import {Animated, LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../styles/theme';
import Card, {CardProps} from './Card';
import {OpacityPressable} from './pressable';
import Column from './primitives/Column';
import Row from './primitives/Row';

interface IAccordionCardProps extends CardProps {
  title: string;
}

type AccordionCardProps = IAccordionCardProps;

const toggleAnimation = {
  duration: 300,
  update: {
    duration: 300,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 200,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const AccordionCard: React.FC<PropsWithChildren<AccordionCardProps>> = (
  props: IAccordionCardProps,
) => {
  const [showContent, setShowContent] = useState(false);
  const children: Array<React.ReactNode> = React.Children.toArray(
    props.children,
  );
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleAccordian = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });
  return (
    <Card {...props} style={props.style}>
      <Column horizontalResizing="fill" style={{overflow: 'hidden'}}>
        <OpacityPressable horizontalResizing="fill" onPress={toggleAccordian}>
          <Row
            horizontalResizing="fill"
            justifyContent="space-between"
            style={{marginBottom: theme.spacing.s}}>
            <Text style={styles.cardHeader}>{props.title}</Text>
            <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
              <MaterialIcons
                name="keyboard-arrow-down"
                style={styles.dropdownIcon}
              />
            </Animated.View>
          </Row>
        </OpacityPressable>
        {showContent ? children[1] ?? null : children[0] ?? null}
      </Column>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.lightText,
  },
  dropdownIcon: {color: '#979CA5', fontSize: 36},
});

export default AccordionCard;
