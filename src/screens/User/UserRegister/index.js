//import liraries
import React, { useState } from 'react';
import {TouchableOpacity, Text, ScrollView, StyleSheet, ActivityIndicator, Alert} from 'react-native';

import {isValidObjField, isValidEmail, updateError} from '../../../utils/validators'

import FormBase from '../../../components/FormBase'
import FormContainer from '../../../components/FormContainer';
import FormInput from '../../../components/FormInput'
import FormPassword from '../../../components/FormPassword'
import FormButton from '../../../components/FormButton';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'

import api from '../../../services/api'

// create a component
const UserRegister = ({navigation}) => {
    const [load, setLoad] = useState(false)
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: ''
    })

    const [errors, setErrors] = useState({});

    const validate = () => {
        let error = true
        if(inputs.name === '') {
            handleError('Por favor insira o nome', 'name')
        }
        if(inputs.email === '') {
            handleError('Por favor insira o email', 'email')
            error = false
        }
        if(inputs.password === '') {
            handleError('Por favor insira a senha', 'password')
        }
        if(inputs.confPassword !== inputs.password) {
            handleError('as senhas não coincidem', 'password')
            handleError('as senhas não coincidem', 'confPassword')
        }
        if(!error) {

        }
        try {
            if(error) {
                setLoad(false)
                Alert.alert('Sucesso', 'Acesso liberado', [{onPress: () => navigation.navigate('Login')}])
            }
        } catch (error) {
            
        }
    }

    const handleChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}))
    }

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMessage}))
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')


    const signUp = async () => {
        // try {
        //     const res = await api.post('/sign-up/seller', {
        //         ...values
        //     })
        //     if(!res.data.msg) {
        //         Alert.alert('Alerta', res.data.err)
        //     } else {
        //     console.log(res.data.msg)
        //     Alert.alert('Sucesso', res.data.msg, [{onPress: () => navigation.navigate('Login')}])
        //     formikActions.resetForm()
        //     formikActions.setSubmitting(false)
        //     }
            
        // } catch (err) {
        //     Alert.alert('Erro', 'Erro ao criar usuário, tente novamente mais tarde!')
        // }
    }

    const back = () => {
        navigation.goBack();
    }

    return (
        <FormBase>
            <FormContainer>
                <TouchableOpacity 
                    style={styles.backBtn} 
                    onPress={back}
                >
                    <Icon 
                        name="clear"
                        size={36} 
                        color='rgba(118, 92, 174, 1)'
                        style={{fontWeight: 'bold'}} 
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Cadastro</Text>
                <ScrollView>
                    <FormInput
                        name="person"
                        placeholder='John'
                        label="Nome"
                        defaultValue={name}
                        error={errors.name}
                        onFocus={() => {
                            handleError('', 'name')
                        }}
                        onChangeText={(text) => setName(text)}
                    />
                    <FormInput
                        name="mail-outline"
                        placeholder='exemplo@exemplo.com'
                        autoCapitalize="none"
                        label="Email"
                        error={errors.email}
                        defaultValue={email}
                        onFocus={() => {
                            handleError('', 'email')
                        }}
                        onChangeText={(text) => handleChange(text, 'email')}
                    />
                    <FormPassword
                        name="lock-outline"
                        placeholder='********'
                        label="Senha"
                        defaultValue={password}
                        error={errors.password}
                        onFocus={() => {
                            handleError('', 'password')
                        }}
                        onChangeText={(text) => handleChange(text, 'password')}
                    />
                    <FormPassword
                        name="lock-outline"
                        placeholder="********"
                        label="Confirmar Senha"
                        defaultValue={confPassword}
                        error={errors.confPassword}
                        onFocus={() => {
                            handleError('', 'confPassword')
                        }}
                        onChangeText={(text) => handleChange(text, 'confPassword')}
                        
                    />
                </ScrollView>
                <FormButton 
                    title={load ? <ActivityIndicator size={"small"} color={Colors.white} /> : 'Cadastrar'}
                    onPress={validate}
                />
            </FormContainer>
        </FormBase>
    );
};

// define your styles
const styles = StyleSheet.create({
    backBtn: {
        alignSelf: 'flex-end'
    },
    title: {
        color: Colors.primary,
        paddingLeft: 10,
        fontWeight: 'bold',
        textAlign: 'center', 
        fontSize: 26,
        marginTop: -10
    },
    input: {
        height: 55,
        paddingLeft: 50,
        marginBottom: 20,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.primary,
        color: Colors.primary,
    },
});

//make this component available to the app
export default UserRegister;
