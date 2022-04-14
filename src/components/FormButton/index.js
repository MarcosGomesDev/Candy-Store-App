//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const FormButton = ({title, submitting, onPress}) => {
    const backgroundColor = submitting ? 'rgba(118, 92, 174, 0.4)' : 'rgba(118, 92, 174, 1)'

    return (
        <TouchableOpacity onPress={!submitting ? onPress : null} style={[styles.container, {backgroundColor}]}>
            <Text style={styles.textBtn}>{title}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    textBtn: {
        color: '#fff',
        fontSize: 18
    }
});

//make this component available to the app
export default FormButton;
