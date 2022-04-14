//import liraries
import React, {useState} from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import SearchInput from '../../components/SearchInput'
import Products from '../../components/ProductList'

// create a component
const Main = (props) => {
    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{padding: 20}} 
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={26} color={'rgba(118, 92, 174, 1)'} />
                </TouchableOpacity>
                <SearchInput />
            </View>
            <ScrollView>
                <Products />
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1
    }
});

export default Main;
