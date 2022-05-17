//import liraries
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api from '../../services/api'

import ProductListItem from '../../components/ProductList/ProductListItem';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors';

// create a component
const Seller = ({ route }) => {
    const [products, setProducts] = useState([])
    const navigation = useNavigation()
    const item = route.params

    async function loadProducts() {
        api.get(`/seller/${item.seller._id}`).then(res => {
            setProducts(res.data)
        })
    }
    
    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{marginTop: 2}} onPress={navigation.goBack}>
                    <Icon name="arrow-back" size={30} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>{item.seller.name}</Text>
                <TouchableOpacity>
                    <Icon name="shopping-bag" size={34} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <ScrollView> 
                <View style={styles.containerProducts}>
                    {
                        products.map(
                            (item) =>
                                <ProductListItem
                                    key={item._id}
                                    data={item}
                                    onPress={() => navigation.navigate('ProductItem', item)}
                                />
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        elevation: 5,
        zIndex: 1,
        marginBottom: 5
    },
    title: {
      fontSize: 20,
      color: Colors.primary,
      marginTop: 4,
      paddingLeft: 10
    },
    containerProducts: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
});


export default Seller;
