/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import Container from '../../../components/core/Container';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../styles/Colors';
import SearchInput from '../../../components/SearchInput';
import ProductList from '../../../components/ProductList';

const Main = props => {
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
        <SearchInput />
        <TouchableOpacity
          onPress={() => props.navigation?.navigate('Favoritos')}
          style={styles.btn}>
          <Icon name="favorite-outline" size={34} color={Colors.primary} />
        </TouchableOpacity>
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
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.6,
    elevation: 10,
    zIndex: 10,
  },
  btn: {
    marginTop: 2,
    width: '12.5%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Main;
