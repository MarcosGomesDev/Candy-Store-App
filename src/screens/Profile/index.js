//import liraries
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import {getData} from '../../utils/storage'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

// create a component
const Profile = (props) => {
    const [user, setUser] = useState({})

    const getUser = () => {
        return new Promise((resolve, reject) => {
            getData().then(res => {
                setUser(res)
                resolve()
            }).catch(reject)
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{padding: 20}} 
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>Minha conta</Text>
            </View>
            <ScrollView>
                <View style={styles.profileContainer}>
                    <TouchableOpacity>
                        <Image style={styles.profileImage} source={{uri: user.avatar}} />
                        <Icon style={styles.editIcon} name="add-a-photo" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.username}>{user.name}</Text>
                </View>
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
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1,
        marginBottom: 10
    },
    title: {
        width: '65%',
        fontSize: 16,
        textAlign: 'center',
        color: Colors.primary
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: Colors.primary,
        marginBottom: 10
    },
    editIcon: {
        position: 'absolute',
        right: -4,
        bottom: 15
    },
    username: {
        fontSize: 15,
        color: Colors.primary,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default Profile;
