//import liraries
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api'
import ProductListItem from './ProductListItem'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        async function loadProducts() {
            const res = await api.get('/products')
            setProducts(res.data)
        }
        loadProducts()
    }, [products])

    return (
        <View style={styles.container}>
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
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
});

export default ProductList