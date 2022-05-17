//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const FormPicker = ({label, name, error}) => {
    return (
        <View style={{width: '99%'}}>
            <View style={styles.container}>
                <Text style={styles.title}>{label}</Text>
                {error ? (
                    <Text style={{color: Colors.danger, fontSize: 16}}>{error}</Text>
                ) : <></>}
            </View>
            <TouchableOpacity>
                    
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
});


export default FormPicker;
