//import liraries
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Colors from '../../styles/Colors'

// create a component
const FormBase = ({children}) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
    },
});


export default FormBase;
