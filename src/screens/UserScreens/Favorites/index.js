//import liraries
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet,
Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

import { getData } from '../../../utils/storage'

import api from '../../../services/api'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'

// create a component
const Favorites = (props) => {
    const navigation = useNavigation()
    const [favorites, setFavorites] = useState([])

    const remove = async(item) => {
        const userId = await getData().then()
        try {
            await api.delete('/user/favorites/delete', {params: {
                userId: userId.id,
                productId: item._id
            }})
        } catch (error) {
            
        }
    }

    useEffect(() => {
        async function loadFavorites() {
            const user = await getData().then()
            const res = await api.get('/user/favorites', {params: {userId: user.id}})
            setFavorites(res.data)
        }
        loadFavorites()
    }, [favorites])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>Favoritos</Text>
            </View>
            {favorites.length < 0 ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator style={styles.load} size='large' color={Colors.primary}  />
                </View>
                :
                <ScrollView
                    style={styles.productContainer}
                >
                    <View style={styles.marginContainer}>
                        {favorites.map((item) => (
                            <TouchableOpacity
                                key={item._id} 
                                style={styles.productBtn} 
                                onPress={() => navigation.navigate('ProductItem', item)}
                            >
                                <View style={styles.productItem}>
                                    <Image
                                        style={styles.imgProduct}
                                        source={{uri: item.images[0]}}
                                    />
                                    <View style={styles.descriptions}>
                                        <Text numberOfLines={1} style={styles.productName}>{item.name}</Text>
                                        <Text style={styles.productPrice}>R$ {item.price}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => remove(item)}
                                    >
                                        <Icon name="close" size={26} color={Colors.primary} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            }
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
        paddingVertical: 20,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1,
    },
    title: {
        textAlign: 'center',
        width: '80%',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
        paddingLeft: 10
    },
    productContainer: {
        marginHorizontal: 10
    },
    productBtn: {
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        elevation: 5,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imgProduct: {
        width: '40%',
        height: 120,
        borderRadius: 10
    },
    descriptions: {
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    productName: {
        fontSize: 18,
        color: Colors.primary
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    marginContainer: {
        marginTop: 10
    }
});


export default Favorites;
