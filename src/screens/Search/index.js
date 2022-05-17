//import liraries
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api from '../../services/api'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

// create a component
const Search = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [focus, setFocus] = useState(true)

    useEffect(() => {
        async function loadSearch() {
            const res = await api.get('/products')
            setData(res.data)
        }
        loadSearch()
    }, [data])

    const goBack = () => {
        navigation.goBack()
        if(search !== '') {
            setSearch('')
        }
    }

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{padding: 15}}
                    onPress={goBack}
                >
                    <Icon name="arrow-back" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    onChangeText={setSearch}
                    defaultValue={search}
                    placeholder='Procurar por...'
                    placeholderTextColor="#dcdcdc"
                    onFocus={() => {}}
                />
                {search !== '' ? 
                    <TouchableOpacity style={{paddingRight: 10}} onPress={() => setSearch('')}>
                        <Icon name="close" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                : <></>}
                
            </View>
            <ScrollView>
                {data.filter((val) => {
                    if(search === "") {
                        return
                    } else if(val.name.toLowerCase().includes(search.toLowerCase())) {
                        return val
                    }
                }).map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.itemList}
                        onPress={() => navigation.navigate('ProductItem', item)}
                    >
                        <Icon style={styles.icon} name="search" size={24} color={Colors.primary} />
                        <Text style={{paddingLeft: 60, flex: 1, color: Colors.black}}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1,
        marginBottom: 5
    },
    input: {
        flex: 1,
        height: 50,
        color: Colors.primary,
        fontSize: 16,
        width: '68%',
    },
    itemList: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },
    icon: {
        position: 'absolute',
        left: 20
    }
});


export default Search;
