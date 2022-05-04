//import liraries
import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableOpacity, 
  FlatList, Image, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors';

const {width} = Dimensions.get('window')

// create a component
const ProductItem = ({ route }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const navigation = useNavigation()
  const item = route.params

  const comments = item.comments

  const images = [
    {
      id: 1,
      image: item.images[0]
    },
    {
      id: 2,
      image: item.images[1]
    },
    {
      id: 3,
      image: item.images[2]
    }
  ]

  const OnBoardingItem = ({item}) => {
    return (
      <Image source={{uri: item.image}} style={styles.image} />
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{marginTop: 2}} onPress={navigation.goBack}>
          <Icon name="arrow-back" size={30} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Produto</Text>
        <TouchableOpacity 
          style={{position: 'absolute', right: 15, top: 13}}
        >
          <Icon 
            name="shopping-bag"
            size={34}
            color={Colors.primary}
            />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
         <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.ratings}>
          <Icon style={styles.star} name="star" size={24} color={Colors.gold} />
          <Text style={{fontSize: 14, paddingLeft: 8, color: Colors.black}}>5.0</Text>
          <Text style={{fontSize: 14, paddingLeft: 8, color: Colors.grey}}>(1120)</Text>
        </View>
        <FlatList
          data={images}
          style={{width: width, height: 355}}
          pagingEnabled
          horizontal
          onMomentumScrollEnd={(event) => setActiveIndex(parseInt((event.nativeEvent.contentOffset.x / width) + 0.3))}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => String(item + index)}
          renderItem={({item}) => <OnBoardingItem item={item} />}
        />
        {
          item.images.length > 1 ?
            <View style={styles.dotsContainer}>
              {
                item.images.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.dot, {backgroundColor: i === activeIndex ? Colors.primary : '#d4d4d4'}]}
                  />
                ))
              }
            </View>
          : <></>
        }
        <Text style={[styles.price, {marginTop: item.images.length === 1 ? 20 : 0}]}>R$ {item.price}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.titleDescription}>Descrição</Text>
          <Text numberOfLines={3} style={styles.description}>Bolo de Doce de Leite com uasduasdhauhfashf 
          ausgdsauhfahahfs auhfuashfuasfuhauahuvhvhuasfuasbviabib  aufbasubhiaufhiubh</Text>
        </View>
        <View style={styles.vendorContainer}>
          <Text style={{fontSize: 16, color: Colors.black}}>Vendido por </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Seller', item)}>
            <Text style={{color: Colors.primary, fontSize: 16, textTransform: 'uppercase'}}>{item.seller.name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentsContainer}>
          {comments.map((result) => (
            <View key={result => result.id}>
            <Text style={{textTransform: 'capitalize'}}>{result.name}</Text>
            <Text>{result.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    elevation: 1,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
    marginTop: 3,
    paddingLeft: 10
  },
  image: {
    width,
    height: width,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2
  },
  price: {
    color: Colors.black,
    fontSize: 28,
    paddingLeft: 20,
    fontWeight: '300',
  },
  productName: {
    color: Colors.primary,
    fontSize: 16,
    marginTop: 5,
    paddingVertical: 10,
    paddingLeft: 20
  },
  ratings: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: -5,
    marginBottom: 10
  },
  star: {
    marginTop: -4
  },
  detailsContainer: {
    paddingLeft: 20,
    paddingRight: 15,
    marginTop: 10
  },
  titleDescription : {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.black
  },
  description: {
    color: Colors.grey,
    fontSize: 16,
    textAlign: 'auto',
  },
  vendorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 5
  },
  commentsContainer: {
    marginTop: 15,
    paddingHorizontal: 20
  }
});

//make this component available to the app
export default ProductItem;
