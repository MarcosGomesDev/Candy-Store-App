//import liraries
import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet } from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'


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
                    <Image style={styles.logo} source={{uri: user.avatar}} />
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
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
        backgroundColor: 'white',
    },
    userContent: {
        marginLeft: 25,
        flexDirection: 'row',
        paddingBottom: 20
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
        color: '#000'
    },
    userEmail: {
        color: 'darkgrey',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
});

//make this component available to the app
export default CustomDrawer;
