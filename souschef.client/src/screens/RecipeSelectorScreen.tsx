import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../contexts/AppContext';
import {Column, Row, SafeArea} from '../components';
import {IconButton} from '../components'
import {Theme} from '../styles/type';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { OpacityPressable, SpringPressable } from '../components/pressable';
import { COMMON_STYLES } from "../styles/common-styles";

const RecipeSelectorScreen = () => {
    // Theme
const theme = useContext(ThemeContext);
   //const navigation = useNavigation();
  //create navigation

  return (
    <SafeArea>
    <View style={style.container}>
      <Text style={style.title}>Where is This Receipe?</Text>
      <View style={style.item_container}>
        <OpacityPressable style={style.touchable_container}>
          <View style={style.item}>
            <View style={style.sub_item}>
              <FontAwesome5 name="compass" solid style={COMMON_STYLES.COMMON_ICON_STYLES}></FontAwesome5>
              <Text style={style.item_text}>Find a Receipe</Text>
            </View>
            <FontAwesome5 name="chevron-right" style={COMMON_STYLES.COMMON_ICON_STYLES}></FontAwesome5>
          </View>
        </OpacityPressable>
        <View style={{ height: 5 }}></View>
        <OpacityPressable style={style.touchable_container}>
          <View style={style.item}>
            <View style={style.sub_item}>
              <FontAwesome5 name="heart" solid style={COMMON_STYLES.COMMON_ICON_STYLES}></FontAwesome5>
              <Text style={style.item_text}>From your favourites</Text>
            </View>
            <FontAwesome5 name="chevron-right" style={COMMON_STYLES.COMMON_ICON_STYLES}></FontAwesome5>
          </View>
        </OpacityPressable>
        <View style={{ height: 5 }}></View>
        <OpacityPressable style={style.touchable_container}>
          <View style={style.item}>
            <View style={style.sub_item}>
              <FontAwesome5 name="plus-circle" style={COMMON_STYLES.COMMON_ICON_STYLES}></FontAwesome5>
              <Text style={style.item_text}>Create a new recepie</Text>
            </View>
            <FontAwesome5 name="chevron-right" style={COMMON_STYLES.COMMON_ICON_STYLES}></FontAwesome5>
          </View>
        </OpacityPressable>
      </View>
    </View>
    </SafeArea>
  );
  };
  
  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 10,
      backgroundColor: "white",
    },
    item_container: {
      width: "100%",
      marginTop: 20,
      padding: 10
    },
    title: {
      fontSize: 24,
      color: "#2f394a",
      textAlign: "center",
      fontWeight: 'bold',
      marginTop: 10,
    },
    item_text: {
      marginLeft: 20,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#2f394a',
    },
    sub_item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    touchable_container: {
      backgroundColor: 'white',
      borderRadius: 8,
      paddingVertical: 20,
      paddingHorizontal: 25,
      width: '100%',
      marginVertical: 5,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 7,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  });
  
      
export default RecipeSelectorScreen;