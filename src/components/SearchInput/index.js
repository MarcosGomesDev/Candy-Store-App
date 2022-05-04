//import liraries
import React, {useState} from 'react';
import { Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

// create a component
const MyComponent = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState(false)

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Buscar')}>
            <Icon style={styles.searchIcon} name="search" size={20} color={Colors.primary} />
                <Text style={{paddingLeft: 50, color: "#dcdcdc"}}>Procurar por...</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 150
    },
    searchIcon: {
        fontWeight: 'bold',
        position: 'absolute',
        left: 15,
    },
});

//make this component available to the app
export default MyComponent;
