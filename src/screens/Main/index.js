//import liraries
import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'
import SearchInput from '../../components/SearchInput'
import ProductList from '../../components/ProductList'

// create a component
const Main = (props) => {

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{paddingVertical: 20, paddingHorizontal: 10}} 
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <SearchInput />
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Favoritos')}
                    style={{paddingVertical: 20, paddingHorizontal: 10}}
                >
                    <Icon name="favorite-outline" size={26} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ProductList />
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
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        elevation: 9,
        zIndex: 1
    }
});

export default Main;
