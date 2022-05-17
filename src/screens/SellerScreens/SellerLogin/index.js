//import liraries
import React, {useState} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Modal, TouchableOpacity,
Alert, ActivityIndicator } from 'react-native';
import {Formik} from 'formik'
import * as Yup from 'yup'

import {isValidObjField, isValidEmail, updateError} from '../../../utils/validators'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'

import FormBase from '../../../components/FormBase'
import FormContainer from '../../../components/FormContainer'
import FormInput from '../../../components/FormInput';
import FormPassword from '../../../components/FormPassword'
import FormButton from '../../../components/FormButton'

import api from '../../../services/api'
import { storeData, getData } from '../../../utils/storage';

const validationSchema = Yup.object({
    email: Yup.string().email('email inválido!').required('email é obrigatório!'),
    password: Yup.string().trim().min(3, 'Insira uma senha com 3 carat ou mais').required('senha é obrigatória!')
})

// create a component
const SellerLogin = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [load, setLoad] = useState(false)

    const userInfo = {
        email: '',
        password: ''
    }

    const [error, setError] = useState('')

    const {email, password} = userInfo

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({...userInfo, [fieldName]: value})
    }
    
    const isValidForm = () => {
        if(!isValidObjField(userInfo)) 
            return updateError('Preencha todos os campos!', setError)
        if(!isValidEmail(email)) 
            return updateError('email inválido!', setError)
        if(!password.trim() || password.length < 3) 
            return updateError('utilize uma senha com 3 ou mais caract!', setError)
        
        return true
    }

    const submitForm = () => {
        if(isValidForm())

        console.log(userInfo)
    }

    const signIn = async (values, formikActions) => {
        try {
            setLoad(true)
            const res = await api.post('/sign-in/seller', {
                ...values
            })
            if(res.data.err) {
                Alert.alert('Erro', res.data.err)
            } else {
            const userInfo = {
                id: res.data.seller._id,
                name: res.data.seller.name,
                email: res.data.seller.email,
                avatar: res.data.seller.avatar ?? 'https://res.cloudinary.com/gomesdev/image/upload/v1649718658/avatar_ip9qyt.png',
                token: res.data.token,
            }

            await storeData(userInfo)
            formikActions.resetForm()
            formikActions.setSubmitting(false)
            }
        } catch (error) {
            
        } finally {
            setLoad(false)
            Alert.alert('Sucesso', 'Acesso liberado', [{onPress: () => navigation.navigate('Main')}])
        }
    }

    return (
        <FormBase>
            <Formik 
                initialValues={userInfo} 
                validationSchema={validationSchema}
                onSubmit={signIn}
            >
                {({values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit}) => {
                    const {email, password} = values
                    return (
                        <FormContainer style={{height: 400}}>
                            <Text style={styles.title}
                            >
                                Bem Vindo
                            </Text>
                            <FormInput 
                                label="Email"
                                name="mail-outline"
                                placeholder='email'
                                placeholderTextColor='#dcdcdc'
                                autoCapitalize='none'
                                value={email}
                                error={touched.email && errors.email}
                                onBlur={handleBlur('email')}
                                onChangeText={handleChange('email')}
                            />
                            <FormPassword 
                                label='Senha'
                                placeholder='********'
                                placeholderTextColor='#dcdcdc'
                                value={password}
                                error={touched.password && errors.password}
                                onBlur={handleBlur('password')}
                                onChangeText={handleChange('password')}
                            />
                            <FormButton 
                                title={load ? <ActivityIndicator size={"small"} color={Colors.white} /> : 'Entrar'}
                                submitting={isSubmitting} 
                                onPress={handleSubmit} 
                            />

                            <TouchableOpacity 
                                onPress={() => navigation.navigate('ForgotPassword')} 
                                style={{alignItems: 'center', marginTop: 17}}
                            >
                                <Text style={
                                    {color: Colors.primary, fontSize: 17, textDecorationLine: 'underline'}
                                }>Esqueceu a senha?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => setModalVisible(true)} 
                                style={{alignItems: 'center', marginTop: 20}}
                            >
                                <Text style={
                                    {color: Colors.primary, fontSize: 17, textDecorationLine: 'underline'}
                                }>Não possui conta? Cadastre-se</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Login')} 
                                style={{alignItems: 'center', marginTop: 20}}
                            >
                                <Text style={
                                    {color: Colors.primary, fontSize: 17, textDecorationLine: 'underline'}
                                }>Entrar como usuário</Text>
                            </TouchableOpacity>
                        </FormContainer>
                    )
                }}
            </Formik>
            <Modal 
                visible={modalVisible}
                animationType='slide'
            >
                <SafeAreaView style={styles.modal}>
                    <View style={styles.contentModal}>
                        <TouchableOpacity 
                            style={styles.backBtn} 
                            onPress={() => setModalVisible(false)}
                        >
                            <Icon name="clear" size={36} color={Colors.primary} style={{fontWeight: 'bold'}} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Cadastrar como:</Text>
                        <TouchableOpacity style={styles.btn} 
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate('UserRegister')
                            }
                        }>
                            <Text style={styles.textBtn}>Usuário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btn}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate('SellerRegister')
                            }
                        }>
                            <Text style={styles.textBtn}>Vendedor</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </FormBase>
    );
};

const styles = StyleSheet.create({
    title: {
        color: Colors.primary,
        paddingBottom: 20,
        paddingLeft: 10,
        fontWeight: 'bold',
        textAlign: 'center', 
        fontSize: 26,
        marginTop: 20
    },
    btn: {
        width: 280,
        paddingVertical: 25,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        marginVertical: 20,
        alignItems: 'center',
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    modal: {
        flex: 1,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backBtn: {
        alignSelf: 'flex-end',
        padding: 10

    },
    contentModal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        width: '80%',
        height: 'auto',
        borderRadius: 20,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    }
});

export default SellerLogin;