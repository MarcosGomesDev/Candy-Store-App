//import liraries
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Modal from 'react-native-modal'

import {getData} from '../../utils/storage'

import ActionFooter, {ActionPrimaryButton} from '../../components/core/ActionFooter'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

// create a component
const Profile = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
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
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            style={styles.profileImage}
                            source={{uri: user.avatar}}
                        />
                        <Icon
                            style={styles.editIcon}
                            name="add-a-photo" size={24}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                    <Text style={styles.username}>{user.name}</Text>
                </View>
            </ScrollView>

            <Modal
                isVisible={modalVisible}
                style={{justifyContent: 'flex-end', margin: 0}}
                animationType="slide"
                swipeDirection='down'
                backdropOpacity={0.4}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                onSwipeComplete={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <Icon name="maximize" size={40} color={Colors.primary} />
                    <View style={{marginTop: -13}}>
                        <TouchableOpacity style={styles.btnModal}>
                            <Text style={styles.btnTextModal}>Ver foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnModal}>
                            <Text style={styles.btnTextModal}>Mudar foto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    title: {
        width: '65%',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.primary
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 15
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
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    btnModal: {
        paddingVertical: 22,
        paddingHorizontal: 120,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    btnTextModal: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600'
    }
});


export default Profile;
