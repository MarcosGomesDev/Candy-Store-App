//import liraries
import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FormInput from '../../../components/FormInput'
import Colors from '../../../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

// create a component
const NewProduct = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{padding: 15}}
                    onPress={navigation.goBack}
                >
                    <Icon name="arrow-back" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <View style={{width: '70%'}}>
                    <Text style={styles.title}>Criar Produto</Text>
                </View>
            </View>
            <ScrollView
                style={{padding: 10}}
            >
                <View style={styles.formContainer}>
                    <FormInput
                        label="Título do produto"
                        placeholder="Título do produto"
                    />
                    <FormInput
                        label="Descrição"
                        placeholder="Descrição do produto"
                    />
                    <FormInput
                        label="Preço"
                        placeholder="75,00"
                        keyboardType="numeric"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
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
    title: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    formContainer: {
        alignItems: 'center',
        margin: 10
    },
});

//make this component available to the app
export default NewProduct;
