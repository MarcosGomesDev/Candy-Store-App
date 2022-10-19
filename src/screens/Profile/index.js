/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {showToast} from '../../store/modules/toast/actions';
import {useDispatch} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';

import Container from '../../components/core/Container';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../styles/Colors';
import {useLogin} from '../../context/LoginProvider';
import {storeData, removeData} from '../../utils/storage';
import {URL} from '@env';
import { ColorSpace } from 'react-native-reanimated';

const Profile = props => {
  const {setIsLoggedIn, setProfile, profile} = useLogin();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState({});
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false)
  const [name, setName] = useState(profile.name)
  const [lastname, setLastname] = useState(profile.lastname)
  const [email, setEmail] = useState(profile.email)

  const options = {
    selectionLimit: 1,
    mediaType: 'photo',
  };

  const handleImageUser = async () => {
    const data = await ImagePicker.launchImageLibrary(options);
    if (data.didCancel) {
      return;
    }
    if (data.error) {
      return;
    }
    if (!data.assets[0].uri) {
      return;
    }

    const image = data.assets[0];
    setAvatar(image);
  };

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();

    data.append('avatar', {
      name: new Date() + '_avatar',
      uri: avatar.uri,
      type: avatar.type,
    });

    const response = await fetch(`${URL}/user/upload-profile`, {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
        authorization: `Bearer ${profile.token}`,
      },
      body: data,
    }).catch(err => console.log(err));

    const res = await response.json();

    if (response.status === 201) {
      setLoading(false);
      const userInfo = {...profile, avatar: res.avatar};
      await storeData(userInfo);
      setProfile(userInfo);
      setModalVisible(false);
      setAvatar([]);
      dispatch(showToast(res.message, 'success', 'done'));
    }

    if (response.status === 413) {
      setLoading(false);
      setModalVisible(false);
      dispatch(showToast(data, 'error', 'error'));
      removeData();
      setIsLoggedIn(false);
    }

    if (response.status === 401) {
      setLoading(false);
      setModalVisible(false);
      dispatch(showToast(data, 'error', 'error'));
    }

    if (response.status === 500) {
      setLoading(false);
      setModalVisible(false);
      dispatch(showToast(data, 'error', 'error'));
    }
  };

  const changeEditable = () => {
    setEditable(!editable)
  }

  return (
    <Container color="#fff">
      <View style={styles.header}>
        <TouchableOpacity
          style={{padding: 20}}
          onPress={() =>
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }>
          <Icon name="menu" size={26} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Minha conta</Text>
      </View>
      <ScrollView>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.profileImage} source={{uri: profile.avatar}} />
            <Icon
              style={styles.editIcon}
              name="add-a-photo"
              size={24}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.username}>{profile.name}</Text>
        </View>

        <View style={{
          paddingHorizontal: 20,
          marginTop: 20,
          alignItems: 'center'
        }}>
          <TouchableOpacity 
            style={{
              alignSelf: 'flex-end',
            }}
            onPress={() => changeEditable()}
          >
            <Icon name={editable ? "close" : "edit"} size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Input
            enabled={editable ? Colors.primary : '#a9a9a9'}
            iconName="person"
            title="Nome"
            editable={editable}
            defaultValue={name}
          />
          <Input
            enabled={editable ? Colors.primary : '#a9a9a9'}
            iconName="person"
            title="Sobrenome"
            editable={editable}
            defaultValue={lastname}
          />
          <Input
            enabled={editable ? Colors.primary : '#a9a9a9'}
            iconName="email"
            title="E-mail"
            editable={editable}
            defaultValue={email}
          />

          {editable && (
            <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
                  width: '90%',
                  height: 50,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{color: Colors.white, fontSize: 16, fontWeight: 'bold'}}
                >
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          )}
          
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => {
                setModalVisible(false);
                setAvatar([]);
              }}>
              <Icon name="close" size={30} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              style={[
                styles.profileImage,
                {alignSelf: 'center', marginVertical: 20},
              ]}
              source={{uri: avatar.uri ? avatar.uri : profile.avatar}}
            />
            <TouchableOpacity
              onPress={() => handleImageUser()}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                alignSelf: 'center',
                backgroundColor: Colors.primary,
                marginVertical: 20,
                borderRadius: 15,
              }}>
              <Text style={[styles.btnTextModal, {fontSize: 14}]}>
                Selecionar imagem
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => uploadImage()}
              style={styles.btnModal}>
              <Text style={styles.btnTextModal}>
                {loading ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  'Salvar'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    elevation: 10,
    zIndex: 1,
  },
  title: {
    width: '65%',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    right: -4,
    bottom: 15,
  },
  username: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  closeModal: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  btnModal: {
    paddingVertical: 22,
    paddingHorizontal: 120,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  btnTextModal: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
