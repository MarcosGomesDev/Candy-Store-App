import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'

const {width} = Dimensions.get('window')

const ProductListItem = (props) => {
  const entry = props.data
  
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.product}>
        <Image style={styles.imgProduct} source={{uri: entry.images[0]}} />
        <Text style={styles.category}>{entry.category.name}</Text>
        <Text numberOfLines={1} style={styles.productName}>{entry.name}</Text>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={styles.productPrice}>R$ {entry.price}</Text>
          <TouchableOpacity 
            style={styles.addFav}
          >
            <Icon name="add" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width < 376 ? '47%' : '46%',
    borderRadius: 10,
    marginHorizontal: 3,
    marginLeft: width < 376 ? 7 : 10,
    marginVertical: 5,
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
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  productName: {
    width: 170,
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  productPrice: {
    flex: 1,
    paddingLeft: 12,
    marginTop:15,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black
  },
  addFav: {
    width: 40,
    height: 40,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
})

export default ProductListItem
