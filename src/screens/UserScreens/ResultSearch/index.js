import React, {useState, useEffect} from 'react';
import { ScrollView, View, StyleSheet, Text, Image, ActivityIndicator,
TouchableOpacity, 
TouchableWithoutFeedback,
SafeAreaView} from 'react-native';

import { useNavigation } from '@react-navigation/native'
import {getLocation} from '../../../utils/storage'
import * as geolib from 'geolib'
import Container from '../../../components/core/Container';
import Colors from '../../../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../../services/api'
import Modal from 'react-native-modal'
import {Slider} from '@miblanchard/react-native-slider';
import ActionFooter, { ActionPrimaryButton } from '../../../components/core/ActionFooter';

const ResultSearch = ({route}) => {
    const name = route.params
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [locationUser, setLocationUser] = useState()
    const [range, setRange] = useState(5)

    async function loadProducts() {
        try {
            setLoading(true)
            const res = await api.get('/products/search', {
                params: {name}
            })
            
            setData(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const changeDistance = (item) => {
        const results = []

        for(i = 0; item.length; i++) {

        }
    }

    const renderProducts = (item) => (
        <TouchableOpacity
            data={item}
            key={item._id}
            style={styles.productContainer}
            onPress={() => navigation.navigate('ProductItem', item)}
        >
            <View style={styles.product}>
                <Image style={styles.imgProduct} source={{uri: item.images[0]}} />
                <Text style={styles.category}>{item.category.name}</Text>
                <Text style={styles.category}>{item.distance}</Text>
                <Text numberOfLines={1} style={styles.productName}>{item.name}</Text>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={styles.productPrice}>R$ {item.price}</Text>
                <TouchableOpacity 
                    style={styles.addFav}
                >
                    <Icon name="add" size={24} color={Colors.white} />
                </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )

    useEffect(() => {
        loadProducts()
        getLocation().then(data => setLocationUser(data))
    }, [])

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{paddingVertical: 15, paddingHorizontal: 10}} 
                    onPress={() => navigation.navigate('Início')}
                >
                    <Icon name="arrow-back" size={26} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {loading ?
                    (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator style={styles.load} size='large' color={Colors.primary}  />
                        </View>
                    )
                    :
                    (
                        <View style={styles.container}>
                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center'
                            }}>
                            <Text style={{color: Colors.primary, fontSize: 16, padding: 10, flex: 1}}>
                                Resultados da busca por {name}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                                style={{
                                    justifyContent: 'center',
                                    alignItems:'center',
                                    width: 50,
                                    height: 50,
                                }}
                            >
                                <Icon name="tune" size={24} color={Colors.primary} />
                            </TouchableOpacity>
                            </View>
                            {data.map((item) => (
                                renderProducts(item)
                            ))}
                        </View>
                    )
                }
            </ScrollView>

            <Modal
                transparent={true}
                isVisible={modalVisible}
                customBackdrop={
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setModalVisible(!modalVisible)
                        }}
                    >
                        <View style={{flex: 1, backgroundColor: "#000"}} />
                    </TouchableWithoutFeedback>
                }
                style={{marginHorizontal: 0, marginBottom: 0}}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={{paddingVertical: 20, alignItems: 'center', borderBottomColor: Colors.primary, borderBottomWidth: 0.4}}>
                        <Text style={{color: Colors.primary, fontSize: 26, fontWeight: 'bold'}}>
                            Filtros de busca
                        </Text>
                    </View>
                    <View style={{marginVertical: 20, flex: 1, paddingHorizontal: 15}}>
                    <TouchableOpacity
                        onPress={() => setRange(5)}
                        style={{
                            alignSelf: 'flex-end'
                        }}
                    >
                        <Text style={{color: Colors.primary}}>Restaurar padrões</Text>
                    </TouchableOpacity>
                    <Text style={{color: Colors.primary, alignSelf: 'center', fontSize: 30, marginTop: 25}}>
                        Distância
                    </Text>
                    <Text style={{color: Colors.primary, alignSelf: 'center', fontSize: 30, marginTop: 20}}>{range} km</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        marginTop: 30,
                        paddingHorizontal: 10
                    }}>
                        <Text style={{color: Colors.primary, flex: 1}}>1 km</Text>
                        <Text style={{color: Colors.primary, alignSelf: 'flex-end'}}>50 km</Text>
                    </View>
                    <Slider
                        containerStyle={{
                            width: '90%',
                            alignSelf: 'center',
                            marginBottom: 30,
                        }}
                        value={range}
                        minimumValue={1}
                        maximumValue={50}
                        trackClickable={true}
                        maximumTrackTintColor="#a9a9a9"
                        minimumTrackTintColor={Colors.tertiary}
                        thumbTintColor={Colors.tertiary}
                        thumbStyle={{
                            width: 25,
                            height: 25,
                            borderRadius: 150
                        }}
                        step={1}
                        onValueChange={(value) => setRange(value)}
                    />

                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{
                            width: '90%',
                            height: 60,
                            backgroundColor: Colors.primary,
                            alignSelf: 'center',
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{color: Colors.white, fontSize: 18, fontWeight: 'bold'}}>Aplicar filtro</Text>
                    </TouchableOpacity>
                    </View>
                    <ActionFooter
                        pdv={20}
                        btw={0.3}
                        btc={Colors.primary}
                    >
                        <ActionPrimaryButton title="Cancelar" onPress={() => {
                            setModalVisible(!modalVisible)
                            }}
                        />
                    </ActionFooter>
                </SafeAreaView>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        elevation: 5,
        zIndex: 1,
        elevation: 1,
    },
    container: {
        flex: 1,
        width: '100%',
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    productContainer: {
        width: '46%',
        borderRadius: 10,
        marginHorizontal: 3,
        marginLeft: 10,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    product: {
        width: '100%',
    },
    imgProduct: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 10
    },
    category: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    productName: {
        width: 170,
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
    },
    productPrice: {
        flex: 1,
        paddingLeft: 12,
        marginTop:15,
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black
    },
    addFav: {
        width: 40,
        height: 40,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 60,
        marginHorizontal: 0,
        paddingHorizontal: 0
    },
});

export default ResultSearch;