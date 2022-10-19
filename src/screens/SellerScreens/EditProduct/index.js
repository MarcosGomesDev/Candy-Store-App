import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import {showToast} from '../../../store/modules/toast/actions';
import {useLogin} from '../../../context/LoginProvider';
import {removeData} from '../../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import {URL} from '@env'
import Container from '../../../components/core/Container';
import Form from '../../../components/FormProduct';
import Colors from '../../../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditProduct = ({route}) => {
    const dispatch = useDispatch()
    const {profile, setIsLoggedIn} = useLogin()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const item = route.params

    const save = async (product) => {
        if (
            product.name === '' ||
            product.price === '' ||
            product.category === '' ||
            product.subcategory === '' ||
            product.images === ''
        ) {
            dispatch(showToast('Preencha todos os campos!', 'error', 'error'));
            return;
        }

        const exist = product.images[0].hasOwnProperty('type')

        const data = new FormData();
        
        Object.keys(product).forEach(key => {
            if (key === 'images') {
                for (let i = 0; i < product[key].length; i++) {
                    if(exist === true) {
                        data.append('images', {
                            name: new Date() + 'product',
                            uri: product[key][i].uri,
                            type: product[key][i].type,
                        });
                    } else {
                        data.append('images', product[key][i])
                    }
                }
            } else {
                data.append(key, product[key]);
            }
        });

        console.log(data)

        setLoading(true);
        const response = await fetch(`http://192.168.15.254:3003/product/${product._id}/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${profile.token}`,
            },
            body: data,
        });

        const res = await response.json();

        console.log(response.status)
        if (response.status === 201) {
            setLoading(false);
            dispatch(showToast(res, 'success', 'done'));
            navigation.goBack();
        }
        if (response.status === 413) {
            setLoading(false);
            dispatch(showToast(res, 'error', 'error'));
            removeData();
            setIsLoggedIn(false);
        }
    }

    return (
        <Container color='#fff'>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{zIndex: 10}}
                    onPress={navigation.goBack}
                >
                    <Icon name="arrow-back"
                        size={26}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Editar Produto
                </Text>
            </View>
            <Form
                productData={item}
                titleBtn={loading ? (
                    <ActivityIndicator 
                        size={24}
                        color={Colors.white}
                    />) : 'Salvar'}
                handleSubmit={save}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        padding: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.8,
        elevation: 15,
        zIndex: 15,
        marginBottom: 5
    },
    title: {
        width: '80%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});

export default EditProduct;