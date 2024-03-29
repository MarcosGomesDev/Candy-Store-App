/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import Container from '../../../components/core/Container';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../styles/Colors';
import SearchInput from '../../../components/SearchInput';
import Geolocation from '@react-native-community/geolocation'
import ProductList from '../../../components/ProductList';
import { storeRange, getRange, storeLocation } from '../../../utils/storage';
import { useQuery } from '@tanstack/react-query';

const width = Dimensions.get('window').width

const Main = props => {
    
  const {data} = useQuery(['range'], getRange)

  if(data === null) {
    storeRange(5)
  }

  console.log(data)

  const getLocationUser = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão pra acessar a localização',
      message: "O app precisa da sua localização ativa",
      buttonNegative: "Cancel",
      buttonPositive: "Ok"
      }
    )

    if(granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        async (position) => {
            console.log(position.coords)
            const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }

        await storeLocation(coords)
      },
      error => console.log(error, 'erro na lib de pegar locali'),
      {
        enableHighAccuracy: true,
        timeout: 200000,
        maximumAge: 360000
      }
      )
    } else {
      console.log('você nao tem permissão')
    }
  }

  useEffect(() => {

    getLocationUser()
  }, [])

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }>
          <Icon name="menu" size={30} color={Colors.primary} />
        </TouchableOpacity>
        <View style={{justifyContent: 'flex-end', flexDirection: 'row', width: '90%', height: '100%', alignItems: 'center'}}>
          <SearchInput />
          <TouchableOpacity
            onPress={() => props.navigation?.navigate('Favoritos')}
            style={[styles.btn, {
              borderRadius: 40,
              marginHorizontal: 10,
              backgroundColor: '#f0f0f0'}]}>
            <Icon name="favorite-outline" size={22} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <ProductList />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.6,
    elevation: 10,
    zIndex: 10,
    width: width
  },
  btn: {
    marginTop: 2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Main;
