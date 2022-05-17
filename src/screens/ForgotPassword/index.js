//import liraries
import React, { Component } from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

import { useNavigation } from '@react-navigation/native';

// create a component
const ForgotPassword = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{marginTop: 2}} onPress={navigation.goBack}>
                    <Icon name="arrow-back" size={30} color={Colors.primary} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1,
    },
});


export default ForgotPassword;
