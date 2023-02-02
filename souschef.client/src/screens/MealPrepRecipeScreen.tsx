import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../contexts/AppContext';
import {Column, Row, SafeArea} from '../components';
import {IconButton} from '../components'
import {Theme} from '../styles/type';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { OpacityPressable, SpringPressable } from '../components/pressable';
import { COMMON_STYLES } from "../styles/common-styles"; 

//add navigation and add ingredients