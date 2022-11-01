// import React from 'react';
import {PreMealListScreenNavigationProp} from '../navigation/types';

// const PreMealListScreen = ({navigation, route}: PreMealListScreenNavigationProp) =>{



// };

import React from 'react';
import { Component } from 'react';
import {StyleSheet,Text,View,Alert,TextInput,FlatList} from 'react-native';
import ReactSearchBox from "react-search-box";
export default class SearchPrevMeals extends Component {
 
     data = [
       {key:"1", 
        value: "Cheese cake"},
       {key:"2", 
        value: "Potato Skins"},
       {key:"3", 
        value: "Steak and Cheese Quesadilla"},
       {key:"4", 
        value: "Burgers"},
       {key:"5", 
        value: "Jalapeno Poppers"},
       {key:"6", 
        value: "Popcorn Shrimp"},
       {key:"7", 
        value: "Fried Chicken"},
       {key:"8", 
        value: "Sheet Pan Nachos"},
     ];

     render() {
        return (
          <ReactSearchBox
            placeholder="Search Meals"
            data={this.data}
            callback={(record: any) => console.log(record)}
          />
        );
      };
    };

