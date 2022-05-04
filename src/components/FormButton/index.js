//import liraries
import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../styles/Colors'

// create a component
const FormButton = ({title, onPress}) => {
    const [load, setLoad] = useState(false)

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
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
        backgroundColor: Colors.primary
    },
    textBtn: {
        color: Colors.white,
        fontSize: 18
    }
});

//make this component available to the app
export default FormButton;
