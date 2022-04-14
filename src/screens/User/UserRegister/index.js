//import liraries
import React, { useState } from 'react';
import {TouchableOpacity, ScrollView, StyleSheet, Text, Alert} from 'react-native';
import {Formik} from 'formik'
import * as Yup from 'yup'

import {isValidObjField, isValidEmail, updateError} from '../../../utils/validators'

import FormBase from '../../../components/FormBase'
import FormContainer from '../../../components/FormContainer';
import FormInput from '../../../components/FormInput'
import FormPassword from '../../../components/FormPassword';
import FormButton from '../../../components/FormButton';

import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '../../../services/api'

const validationSchema = Yup.object({
    name: Yup.string().trim().min(3).required('Nome é obrigatório'),
    email: Yup.string().email('email inválido!').required('email é obrigatório!'),
    password: Yup.string().trim().min(3, 'senha muito curta').required('senha é obrigatória!'),
    // confPassword: Yup.string().equals([Yup.ref('password'), null], 'As senhas não correspondem!')
})

// create a component
const UserRegister = ({navigation}) => {
    const userInfo = {
        name: '',
        email: '',
        password: '',
        confPassword: '',
    }

    const [error, setError] = useState('');

    const {
        name,
        email,
        password
    } = useState('')

    const isValidForm = () => {
        if(!name.trim() || name.length < 3)
            return updateError('Nome inválido!', setError)
        if(!isValidObjField(userInfo))
            return updateError('Preencha todos os campos!', setError)
        if(!isValidEmail(email))
            return updateError('email inválido!', setError)
        if(!password.trim() || password.length < 3) 
            return updateError('senha muito curta!', setError)
        
        return true
    }

    const submitForm = () => {
        if(isValidForm()) console.log(userInfo)
    }

    const signUp = async (values, formikActions) => {
        if (values.password !== values.confPassword) {
            Alert.alert('Alerta', 'As senhas não coincidem!')
            return
        }
        
        try {
            const res = await api.post('/sign-up/user', {
                ...values
            })
            if(!res.data.msg) {
                Alert.alert('Alerta', res.data.err)
            } else {
            console.log(res.data.msg)
            Alert.alert('Sucesso', res.data.msg, [{onPress: () => navigation.navigate('Login')}])
            formikActions.resetForm()
            formikActions.setSubmitting(false)
            }
            
        } catch (err) {
            Alert.alert('Erro', 'Erro ao criar usuário, tente novamente mais tarde!')
        }
    }

    const back = () => {
        navigation.goBack();
    }

    return (
        <FormBase>
            <Formik
                initialValues={userInfo}
                validationSchema={validationSchema}
                onSubmit={signUp}
            >
                {({values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit}) => {
                    const {name, email, password, confPassword} = values
                    return (
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
                                label='Nome'
                                value={name}
                                error={touched.name && errors.name}
                                onBlur={handleBlur('name')}
                                onChangeText={handleChange('name')}
                            />
                            <FormInput
                                name="mail-outline"
                                placeholder='exemplo@exemplo.com'
                                autoCapitalize='none'
                                label='Email'
                                value={email}
                                error={touched.email && errors.email}
                                onBlur={handleBlur('email')}
                                onChangeText={handleChange('email')}
                            />
                            <FormPassword
                                placeholder='********'
                                label='Senha'
                                value={password}
                                error={touched.password && errors.password}
                                onBlur={handleBlur('password')}
                                onChangeText={handleChange('password')}
                            />
                            <FormPassword
                                placeholder='********'
                                label='Confirmar Senha'
                                value={confPassword}
                                error={touched.confPassword && errors.confPassword}
                                onBlur={handleBlur('confPassword')}
                                onChangeText={handleChange('confPassword')}
                            />
                            </ScrollView>
                            <FormButton 
                                title="Cadastrar"
                                submitting={isSubmitting} 
                                onPress={handleSubmit} 
                            />
                        </FormContainer>
                    )
                }}
            </Formik>
        </FormBase>
    );
};

// define your styles
const styles = StyleSheet.create({
    backBtn: {
        alignSelf: 'flex-end',
        // padding: 10
    },
    title: {
        color: 'rgba(118, 92, 174, 1)',
        paddingBottom: 20,
        paddingLeft: 10,
        fontWeight: 'bold',
        textAlign: 'center', 
        fontSize: 26,
        marginTop: 10
    }
});

//make this component available to the app
export default UserRegister;
