//import liraries
import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, Platform } from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'

import Colors from '../../styles/Colors'

import { getData } from '../../utils/storage';

// create a component
const CustomDrawer = (props) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        getData().then(setUser)
    }, [])
    
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.userContent}>
                    <View style={{flexDirection: 'row', marginLeft: 25}}>
                        <Image style={styles.logo} source={{uri: user.avatar}} />
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                        </View>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: Platform === 'ios' ? 0 : 20,
    },
    userContent: {
        flexDirection: 'row',
        paddingBottom: 20,
        borderBottomWidth: 0.8,
        borderBottomColor: Colors.primary
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primary
    },
    userDetails: {
        top: 6,
        paddingLeft: 20,
        alignItems: 'center',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 3,
        color: Colors.primary
    },
    userEmail: {
        color: '#aaa',
    },
});


export default CustomDrawer;
