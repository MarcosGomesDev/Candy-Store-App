//import liraries
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Colors from '../../styles/Colors'

// create a component
const FormContainer = ({children}) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 520,
        width: '95%',
        paddingHorizontal: 15,
        paddingVertical: 20,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
});


export default FormContainer;
