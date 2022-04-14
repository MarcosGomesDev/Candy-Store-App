//import liraries
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'

// create a component
const FormPassword = (props) => {
    const {placeholder, label, error} = props;
    const [secureEntry, setSecureEntry] = useState(true)
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
                name="lock-outline" 
                size={26}
                color={'rgba(118, 92, 174, 1)'}
                style={styles.icon}
            />
            <TextInput 
                {...props}
                placeholder={placeholder} 
                style={[styles.input, {borderColor: error ? 'red' : 'rgba(118, 92, 174, 1)'}]} 
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
                    color={'rgba(118, 92, 174, 1)'}
                />
            </TouchableOpacity>
        </View>
        </>
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
        color: 'rgba(118, 92, 174, 1)',
    },
    btn: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        height: 55
    }
});

//make this component available to the app
export default FormPassword;
