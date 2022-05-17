//import liraries
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

// create a component
const FormPassword = ({label, placeholder, error, onFocus = () => {}, ...props}) => {
    const [secureEntry, setSecureEntry] = useState(true)
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={{width: '99%'}}>
        <View style={styles.container}>
            <Text style={styles.title}>{label}</Text>
            {error ? (
                <Text style={{color: Colors.danger, fontSize: 16}}>{error}</Text>
            ): <></>}
        </View>
        <View style={styles.inputContainer}>
            <Icon 
                name="lock-outline" 
                size={26}
                color={Colors.primary}
                style={styles.icon}
            />
            <TextInput 
                onFocus={() => {
                    onFocus()
                    setIsFocused(true)
                }}
                onBlur={() => setIsFocused(false)}
                {...props}
                placeholder={placeholder}
                placeholderTextColor='#dcdcdc'
                style={[styles.input, {borderColor: error ? Colors.danger : isFocused ? Colors.secondary : Colors.primary}]} 
                secureTextEntry={secureEntry}
            />
            <TouchableOpacity 
                onPress={() => {
                    setSecureEntry((prev) => !prev)
                }}
                style={styles.btn}
            >
                <Icon 
                    name={secureEntry ? 'visibility' : 'visibility-off'} 
                    size={26}
                    color={Colors.primary}
                />
            </TouchableOpacity>
        </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    title: {
        color: Colors.primary,
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
        top: 12,
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
        color: Colors.primary,
    },
    btn: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        height: 55
    }
});


export default FormPassword;
