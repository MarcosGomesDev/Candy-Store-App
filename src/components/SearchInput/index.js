//import liraries
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

// create a component
const MyComponent = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Icon style={styles.searchIcon} name="search" size={20} color={Colors.white} />
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 150,
        position: 'absolute',
        right: 20
    },
    searchIcon: {
        fontWeight: 'bold'
    },
});

//make this component available to the app
export default MyComponent;
