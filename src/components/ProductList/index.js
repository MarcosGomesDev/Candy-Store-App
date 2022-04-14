//import liraries
import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import api from '../../services/api'
import Product from './ProductListItem'

export default class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        const res = await api.get('/products')
        this.setState({
            products: res.data
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.products.map((item, index) => {
                    return (
                        <Product key={index} data={item} />
                    )
                })}
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
});