//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';

// create a component
const FormContainer = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 500,
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignSelf: 'center',
        backgroundColor: '#fff',
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

//make this component available to the app
export default FormContainer;
