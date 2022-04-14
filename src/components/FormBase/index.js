//import liraries
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

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
        backgroundColor: 'rgba(159, 217, 253, 1)',
        justifyContent: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20
    },
});

//make this component available to the app
export default FormBase;
