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
    name: Yup.string().trim().min(3).required('O campo é obrigatório!'),
    cpf_cnpj: Yup.string().trim().min(11, 'Precisa de 11 digítos ou mais!').required('O campo é obrigatório!'),
    cep: Yup.string().trim().min(8, 'São necessários 8 números!').required('O campo é obrigatório!'),
    rua: Yup.string().trim().required('O campo é obrigatório!'),
    numero: Yup.string().trim().min(1).required('O campo é obrigatório!'),
    bairro: Yup.string().trim().required('O campo é obrigatório!'),
    cidade: Yup.string().trim().required('O campo é obrigatório!'),
    estado: Yup.string().trim().required('O campo é obrigatório!'),
    email: Yup.string().email('email inválido!').required('O campo é obrigatório!'),
    password: Yup.string().trim().min(3, 'senha muito curta').required('O campo é obrigatório!'),
})

// create a component
const SellerRegister = ({navigation}) => {
    const userInfo = {
        name: '',
        email: '',
        password: '',
        confPassword: '',
        cpf_cnpj: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
    }

    const [error, setError] = useState('');

    const {
        name,
        cpf_cnpj,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        email,
        password
    } = useState('')

    const isValidForm = () => {
        if(!name.trim() || name.length < 3)
            return updateError('Nome inválido!', setError)
        if(!cpf_cnpj.trim() || name.length < 11)
            return updateError('Campo inválido!', setError)
        if(!cep.trim() || name.length < 8)
            return updateError('CEP inválido!', setError)
        if(!numero.trim() || name.length < 1)
            return updateError('Número inválido!', setError)
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
            const res = await api.post('/sign-up/seller', {
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
                            <ScrollView>
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
                                    name="perm-contact-cal"
                                    placeholder='CPF ou CNPJ'
                                    label="CPF/CNPJ"
                                    value={cpf_cnpj}
                                    error={touched.cpf_cnpj && errors.cpf_cnpj}
                                    onBlur={handleBlur('cpf_cnpj')}
                                    onChangeText={handleChange('cpf_cnpj')}
                                />
                                <FormInput 
                                    name="perm-contact-cal"
                                    placeholder='11350-190'
                                    label="CEP"
                                    value={cep}
                                    error={touched.cep && errors.cep}
                                    onBlur={handleBlur('cep')}
                                    onChangeText={handleChange('cep')}
                                />
                                <FormInput 
                                    name="perm-contact-cal"
                                    placeholder='Av. Marques'
                                    label="Rua"
                                    value={rua}
                                    error={touched.rua && errors.rua}
                                    onBlur={handleBlur('rua')}
                                    onChangeText={handleChange('rua')}
                                />
                                <FormInput 
                                    name="perm-contact-cal"
                                    placeholder='89'
                                    label="Número"
                                    value={numero}
                                    error={touched.numero && errors.numero}
                                    onBlur={handleBlur('numero')}
                                    onChangeText={handleChange('numero')}
                                />
                                <FormInput 
                                    name="perm-contact-cal"
                                    placeholder='Náutica'
                                    label="Bairro"
                                    value={bairro}
                                    error={touched.bairro && errors.bairro}
                                    onBlur={handleBlur('bairro')}
                                    onChangeText={handleChange('bairro')}
                                />
                                <FormInput 
                                    name="perm-contact-cal"
                                    placeholder='São Vicente'
                                    label="Cidade"
                                    value={cidade}
                                    error={touched.cidade && errors.cidade}
                                    onBlur={handleBlur('cidade')}
                                    onChangeText={handleChange('cidade')}
                                />
                                <FormInput 
                                    name="perm-contact-cal"
                                    placeholder='São Paulo'
                                    label="Estado"
                                    value={estado}
                                    error={touched.estado && errors.estado}
                                    onBlur={handleBlur('estado')}
                                    onChangeText={handleChange('estado')}
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
export default SellerRegister;
