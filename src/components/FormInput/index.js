import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

const FormInput = (props) => {
    const {placeholder, name, label, error} = props;
    return (
    <>
    <View style={styles.container}>
        <Text style={styles.title}>{label}</Text>
        {error ? (
            <Text style={{color: 'red', fontSize: 16}}>{error}</Text>
        ): null}
    </View>
    <View style={styles.inputContainer}>
        <Icon 
            name={name} 
            size={26}
            color={'rgba(118, 92, 174, 1)'}
            style={styles.icon}
        />
        <TextInput 
            {...props}
            placeholder={placeholder} 
            placeholderTextColor='#dcdcdc'
            style={[styles.input, {borderColor: error ? 'red' : 'rgba(118, 92, 174, 1)'}]}
        />
    </View>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    title: {
        color: 'rgba(118, 92, 174, 1)',
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
    },
    icon: {
        position: 'absolute',
        top: 13,
        left: 10
    },
    input: {
        flex: 1,
        height: 55,
        paddingLeft: 50,
        marginBottom: 20,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 15,
        color: 'rgba(118, 92, 174, 1)',
    },
});

export default FormInput