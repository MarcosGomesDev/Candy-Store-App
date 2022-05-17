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
const SellerRegister = ({navigation}) => {
    const [load, setLoad] = useState(false)

    const [name, setName] = useState('')
    const [credential, setCredential] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [cep, setCep] = useState('')
    const [complemento, setComplemento] = useState('')
    const [logradouro, setLogradrouro] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [UF, setUF] = useState('')

    const [errors, setErrors] = useState({});

    const signUp = async () => {
        
        try {
            const res = await api.post('/sign-up/seller', {
                name: name,
                email: email,
                password: password
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
            Alert.alert('Erro', 'Erro ao criar vendedor, tente novamente mais tarde!')
        }
        
    }

    const handleChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}))
    }

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMessage}))
    }

   
    
    async function callCEP(cep) {
        await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then((data) => {
                setLogradrouro(data.logradouro)
                setBairro(data.bairro)
                setLocalidade(data.localidade)
                setUF(data.uf)

                setInputs(
                    (prevState) => 
                        ({
                            ...prevState,
                            logradouro: data.logradouro,
                            bairro: data.bairro,
                            localidade: data.localidade,
                            UF: data.uf,
                        }))
            })
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
                        name="perm-contact-cal"
                        placeholder='CPF ou CNPJ'
                        label="CPF/CNPJ"
                        defaultValue={credential}
                        error={errors.credential}
                        onFocus={() => {
                            handleError('', 'credential')
                        }}
                        keyboardType="numeric"
                        onChangeText={text => setCredential(text)}
                    />
                    <FormInput 
                        name="home"
                        placeholder='11350-190'
                        label="CEP"
                        defaultValue={cep}
                        error={errors.cep}
                        onFocus={() => {
                            handleError('', 'cep')
                        }}
                        onChangeText={(text) => {
                            handleChange(text, 'cep')
                            if(text.length == 8) {
                                callCEP(text)
                            }
                        }}
                        keyboardType="numeric"
                    />
                    <FormInput 
                        name="home"
                        placeholder='Av. Marques'
                        label="Rua"
                        defaultValue={logradouro}
                        error={errors.logradouro}
                        onFocus={() => {
                            handleError('', 'logradouro')
                        }}
                        onChangeText={(text) => {setLogradrouro(text)}}
                    />
                    <FormInput 
                        name="home"
                        placeholder='89'
                        label="Número"
                        defaultValue={numero}
                        keyboardType="numeric"
                        error={errors.numero}
                        onFocus={() => {
                            handleError(null, 'numero')
                        }}
                        onChangeText={(text) => handleChange(text, 'numero')}
                    />
                    <FormInput 
                        name="home"
                        label="Complemento"
                        value={complemento}
                        keyboardType="numeric"
                        error={errors.complemento}
                        onFocus={() => {
                            handleError(null, 'complemento')
                        }}
                        onChangeText={(text) => handleChange(text, 'complemento')}
                    />
                    <FormInput 
                        name="home"
                        placeholder='Náutica'
                        label="Bairro"
                        defaultValue={bairro}
                        error={errors.bairro}
                        onFocus={() => {
                            handleError('', 'bairro')
                        }}
                        onChangeText={(text) => handleChange(text, 'bairro')}
                    />
                    <FormInput 
                        name="home"
                        placeholder='São Vicente'
                        label="Cidade"
                        value={localidade}
                        error={errors.localidade}
                        onFocus={() => {
                            handleError('', 'localidade')
                        }}
                        onChangeText={(text) => handleChange(text, 'localidade')}
                    />
                    <FormInput 
                        name="home"
                        placeholder='SP'
                        label="UF"
                        defaultValue={UF}
                        error={errors.UF}
                        onFocus={() => {
                            handleError('', 'UF')
                        }}
                        onChangeText={(text) => handleChange(text, 'UF')}
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
                    onPress={signUp}
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


export default SellerRegister;
