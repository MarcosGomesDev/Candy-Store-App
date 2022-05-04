//import liraries
import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Colors from '../../../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

// create a component
const EditProduct = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{paddingVertical: 20, paddingHorizontal: 10}} 
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <View style={{width: '70%'}}>
                    <Text style={styles.title}>Meus Produtos</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        elevation: 5,
        zIndex: 1
    },
});

//make this component available to the app
export default EditProduct;
