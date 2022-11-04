import React from 'react'
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export type ButtonProps = {
    title: string
    onPress?: ((event: GestureResponderEvent) => void) | undefined
    bkColor?: string
    textColor?: string
    style?: object
    textStyling?: object
    children?: undefined
  };

const Button : React.FC<ButtonProps> = props =>{
   return (
    <TouchableOpacity onPress={props.onPress} style={{padding: 10}}>
        <View style={{backgroundColor: props.bkColor, ...styles.button, ...props.style}}>
            <Text style={{color: props.textColor, ...styles.buttonText, ...props.textStyling}}>
                {props.title}
            </Text>
        </View>
    </TouchableOpacity>
   ) 
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    buttonText:{
        fontSize: 18,
        textAlign: 'center'
    }
})

export default Button;