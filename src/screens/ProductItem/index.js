import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../store/modules/toast/actions';
import {useDispatch} from 'react-redux';
import {useLogin} from '../../context/LoginProvider';
import {removeData} from '../../utils/storage';
import {api} from '../../services/api';
import Container from '../../components/core/Container';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../styles/Colors';
import { useQuery } from '@tanstack/react-query';

const {width} = Dimensions.get('window');
const ProductItem = ({route}) => {
  const item = route.params;
  const {profile, setIsLoggedIn} = useLogin();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [verify, setVerify] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [product, setProduct] = useState([])
  console.log()
  const {data, isLoading, isError} = useQuery(['favorites-list'], api.getFavorites(profile.token))

  const vefiryExistFavorite = async () => {
    try {
      const response = await api.get('/user/favorites', {
        headers: {authorization: `Bearer ${profile.token}`},
      });
      setFavorites(response.data);
      const valid = response.data.map(({_id}) => _id).includes(item);
      setVerify(valid);
    } catch (error) {
      console.log(error.response.data);
      const status = error.response.status;
      const data = error.response.data;
      if (status === 413) {
        dispatch(showToast(data, 'error', 'error'));
        removeData();
        setIsLoggedIn(false);
      }
    }
  };


  useEffect(() => {
    if (profile.seller === false) {
      vefiryExistFavorite();
    }

    const active = navigation.addListener('focus', () => {
      api.get(`/product/${item}`)
      .then((response) => {
        setProduct(response.data)
      })
      .catch((error) => {
        console.log('ocorreu um erro')
      })
    })

    return active
  }, [verify]);

  const addToFavorites = async item => {
    const validExist = favorites.map(({_id}) => _id).includes(item);
    try {
      if (validExist) {
        await api
          .delete('/user/favorites/delete', {
            headers: {authorization: `Bearer ${profile.token}`},
            params: {productId: item},
          })
          .then(res => {
            dispatch(showToast(res.data, 'success', 'done'));
            vefiryExistFavorite();
          })
          .catch(error =>
            dispatch(showToast(error.response.data, 'error', 'error')),
          );
      } else {
        try {
          const response = await api.post(
            `/user/${profile.id}/favorites/new/${item}`,
          );

          dispatch(showToast(response.data, 'success', 'done'));
          vefiryExistFavorite();
        } catch (error) {
          console.log(error.response.data);
        }
      }
    } catch (error) {
      dispatch(showToast(error.response.data, 'error', 'error'));
    }
  };

  const OnBoardingItem = ({item}) => {
    return <Image source={{uri: item}} style={styles.image} />;
  };

  return (
    <Container color={'#fff'}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnHeader}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={30} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Produto</Text>
        {profile.seller === false && (
          <TouchableOpacity
            onPress={() => addToFavorites(item)}
            style={styles.btnHeader}>
            <Icon
              name={verify === true ? 'favorite' : 'favorite-outline'}
              size={34}
              color={Colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading && (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}
          <>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.ratings}>
              <Icon
                style={styles.star}
                name="star"
                size={24}
                color={Colors.gold}
              />
              <Text style={{fontSize: 14, paddingLeft: 8, color: Colors.black}}>
                {product.ratingAverage}
              </Text>
              <Text style={{fontSize: 14, paddingLeft: 8, color: Colors.grey}}>
                ({product.rating?.length})
              </Text>
            </View>
            <FlatList
              data={product.images}
              style={{width: width, height: 355}}
              pagingEnabled
              horizontal
              onMomentumScrollEnd={event =>
                setActiveIndex(
                  parseInt(event.nativeEvent.contentOffset.x / width + 0.3),
                )
              }
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => String(item + index)}
              renderItem={({item}) => <OnBoardingItem item={item} />}
            />
            {product.images?.length > 1 ? (
                <View style={styles.dotsContainer}>
                  {product.images.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        {
                          backgroundColor:
                            i === activeIndex ? Colors.primary : '#d4d4d4',
                        },
                      ]}
                    />
                  ))}
                </View>
              ) : (
              <></>
            )}
            <Text
              style={[
                styles.price,
                {marginTop: product.images?.length === 1 ? 20 : 0},
              ]}>
              R$ {product.price}
            </Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.titleDescription}>Descrição</Text>
              <Text numberOfLines={3} style={styles.description}>
                {product.description}
              </Text>
            </View>
            {profile.seller === false && (
              <View style={styles.vendorContainer}>
                <Text style={{fontSize: 16, color: Colors.black}}>
                  Vendido por{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Seller', item)}>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: 16,
                      textTransform: 'uppercase',
                    }}>
                    {product.seller?.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.commentsContainer}>
              <Text style={styles.commentsTitle}>Comentários</Text>
              {product.rating?.slice(0, 2).map((item, index) => (
                <View key={index} style={{paddingLeft: 15, flexDirection: 'row', marginBottom: 10}}>
                <Text
                  style={{color: Colors.primary, fontWeight: 'bold', paddingRight: 10, fontSize: 16}}>
                  {item.userName}
                </Text>
                <Text style={{color: Colors.primary, fontSize: 16}}>
                  {item.productReview}
                </Text>
              </View>
              ))}
              {product.rating?.length > 0 && (
                <TouchableOpacity
                  style={{marginBottom: 10}}
                  onPress={() => {navigation.navigate('CommentScreen', {id: product._id, item: product.rating})}}
                >
                  <Text style={{color: Colors.primary}}>Ver todos os comentários</Text>
                </TouchableOpacity>
              )}

              <View
                style={{
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.sendCommentBtn}
                  onPress={() => navigation.navigate('CommentScreen', {id: product._id, item: product.rating})}
                >
                  <Text
                    style={styles.sendCommentBtnText}
                  >
                    Adicionar comentário
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    elevation: 10,
    zIndex: 10,
  },
  btnHeader: {
    marginTop: 2,
    width: '12.5%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
    marginTop: 3,
    paddingLeft: 10,
    width: '75%',
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
    marginHorizontal: 2,
  },
  price: {
    color: Colors.black,
    fontSize: 28,
    fontWeight: '400',
    paddingLeft: 20,
  },
  productName: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    paddingVertical: 10,
    paddingLeft: 20,
  },
  ratings: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: -5,
    marginBottom: 10,
  },
  star: {
    marginTop: -4,
  },
  detailsContainer: {
    paddingLeft: 20,
    paddingRight: 15,
    marginTop: 10,
  },
  titleDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.black,
  },
  description: {
    color: Colors.grey,
    fontSize: 16,
    textAlign: 'auto',
  },
  vendorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  commentsContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  commentsTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30,
    marginBottom: 20,
    color: Colors.primary,
  },
  sendCommentBtn: {
    width: '90%',
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendCommentBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductItem;
