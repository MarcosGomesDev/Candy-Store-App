import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default class ProductListItem extends Component {
  render() {
    const {name, price, images, category} = this.props.data
    return (
        <TouchableOpacity style={styles.container}>
          <View style={styles.product}>
            <Image style={styles.imgProduct} source={{uri: images[0]}} />
            <Text style={styles.category}>{category.name}</Text>
            <Text style={styles.productName}>{name}</Text>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Text style={styles.productPrice}>R$ {price}</Text>
              <TouchableOpacity 
                style={styles.addFav}
              >
                <Icon name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '46%',
    borderRadius: 10,
    marginHorizontal: 3,
    marginLeft: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  product: {
    width: '100%',
  },
  imgProduct: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10
  },
  category: {
    color: 'rgba(118, 92, 174, 1)',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  productName: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    flex: 1,
    paddingLeft: 12,
    marginTop:15,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  addFav: {
    width: 40,
    height: 40,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(118, 92, 174, 1)',
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
})