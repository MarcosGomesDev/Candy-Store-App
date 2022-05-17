//import liraries
import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, TextInput, 
StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useNavigation } from '@react-navigation/native';
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
            <KeyboardAwareScrollView
                extraScrollHeight={15}
            >
            <ScrollView
                style={{padding: 10}}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.titleInput}>Título do produto</Text>
                    <TextInput
                        placeholder="Bolo de cenoura"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>Preço do produto</Text>
                    <TextInput
                        placeholder="R$ 30,00"
                        placeholderTextColor="#aaa"
                        keyboardType='numeric'
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>Título do produto</Text>
                    <TextInput
                        placeholder="Bolo de cenoura"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>Preço do produto</Text>
                    <TextInput
                        placeholder="R$ 30,00"
                        placeholderTextColor="#aaa"
                        keyboardType='numeric'
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>Título do produto</Text>
                    <TextInput
                        placeholder="Bolo de cenoura"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>Preço do produto</Text>
                    <TextInput
                        placeholder="R$ 30,00"
                        placeholderTextColor="#aaa"
                        keyboardType='numeric'
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>Título do produto</Text>
                    <TextInput
                        placeholder="Bolo de cenoura"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>Preço do produto</Text>
                    <TextInput
                        placeholder="R$ 30,00"
                        placeholderTextColor="#aaa"
                        keyboardType='numeric'
                        style={styles.input}
                    />
                </View>
            </ScrollView>
            </KeyboardAwareScrollView>
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
        margin: 10,
        marginBottom: 20
    },
    titleInput: {
        marginBottom: 10,
        textAlign: 'left',
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: 10
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        width:"100%",
        marginBottom: 20,
        paddingBottom: 10,
        paddingLeft: 5,
        fontSize: 16,
        color: Colors.primary,

    }
});


export default NewProduct;
