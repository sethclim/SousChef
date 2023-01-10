import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../contexts/AppContext';
import {Column, Input, Row, SafeArea} from '../components';
import {IconButton} from '../components'
import {Theme} from '../styles/type';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { OpacityPressable, SpringPressable } from '../components/pressable';
import { COMMON_STYLES } from "../styles/common-styles";
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import navigation from '../navigation';

function MealHomeScreen() {
  //const navigation = useNavigation();
  //<OpacityPressable onPress={() => {navigation.navigate(RouteNames.RecipeSelectorScreen)}}>
  //<OpacityPressable style={style.touchable_container} onPress={() => {navigation.navigate(RouteNames.items)}}>
  // fix navigation
    const theme = useContext(ThemeContext);
    //const stylesWithTheme = styles(theme);
    const [name, setMealName] = React.useState<string>('');
    return (
      <SafeArea>
      <ScrollView>
        <View style={style.container}>
          <Text style={style.title}>Meal Name</Text>
        <View style={style.item_container}>
          <Input
        bgColor={theme.colors.foreground}
        placeholder="Name"
        paddingVertical={theme.spacing.s}
        onChangeText={value => {
          setMealName(value);
        }}/>
          </View>
          <View style={style.title_container}>
            <Text style={style.title}>Appetizer</Text>
              <FontAwesome5
                name="plus"
                style={COMMON_STYLES.COMMON_ICON_STYLES}
              />
          </View>
          <View style={style.item_container}>
            <OpacityPressable style={style.touchable_container}>
              <View style={style.item}>
                <Text style={style.item_text}>
                  Teriyaki Pineapple Meatballs
                </Text>
                <FontAwesome5
                  name="pen"
                  style={COMMON_STYLES.COMMON_ICON_STYLES}
                />
              </View>
            </OpacityPressable>
            <View style={{ height: 5 }} />
            <OpacityPressable style={style.touchable_container}>
              <View style={style.item}>
                <Text style={style.item_text}>Fruit Charcuterie Board</Text>
                <FontAwesome5
                  name="pen"
                  style={COMMON_STYLES.COMMON_ICON_STYLES}
                />
              </View>
            </OpacityPressable>
          </View>
          <View style={style.title_container}>
            <Text style={style.title}>Entree</Text>

            <FontAwesome5
              name="plus"
              style={COMMON_STYLES.COMMON_ICON_STYLES}
            />
          </View>
          <View style={style.item_container}>
            <OpacityPressable style={style.touchable_container}>
              <View style={style.item}>
                <Text style={style.item_text}>
                  Chorizo & mozzarella gnocchi bake
                </Text>
                <FontAwesome5
                  name="pen"
                  style={COMMON_STYLES.COMMON_ICON_STYLES}
                />
              </View>
            </OpacityPressable>
          </View>
          <View style={style.title_container}>
            <Text style={style.title}>Dessert</Text>
            <FontAwesome5
              name="plus"
              style={COMMON_STYLES.COMMON_ICON_STYLES}
            />
          </View>
          <View style={{ flexGrow: 1 }} />
          <View style={style.item_container}>
            <OpacityPressable style={style.touchable_container_blue}> 
              <View style={style.item_center}>
                <Text style={style.item_text_white}>
                  SET THE DATE!
                </Text>
              </View>
            </OpacityPressable>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "white",
  },
  title_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
    paddingRight: 30,
    backgroundColor: "white",
  },
  item_container: {
    width: "100%",
    marginTop: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: "#2f394a",
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 10,
    paddingLeft: 10,
  },
  item_text: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "#555d6b",
  },
  item_text_white: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  sub_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchable_container: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 20,
    paddingRight: 20,
    width: "100%",
    marginVertical: 5,
    shadowColor: "#2f394a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7,
  },
  touchable_container_blue: {
    backgroundColor: "#2e9dfb",
    color: "white",
    borderRadius: 200,
    paddingVertical: 20,
    paddingRight: 20,
    width: "100%",
    marginVertical: 5,
    shadowColor: "#2f394a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item_center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  disable_text: {
    color: "#ded5d6",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default MealHomeScreen;
