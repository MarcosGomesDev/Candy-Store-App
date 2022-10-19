import React, {useRef, useState, useEffect} from 'react';
import {Alert, Text, ScrollView, View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import Container from '../../components/core/Container';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {showToast} from '../../store/modules/toast/actions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { useLogin } from '../../context/LoginProvider';
import {Picker} from '@react-native-picker/picker';
import {URL} from '@env';

const ModalComment = ({route}) => {
  const item = route.params
  const {profile} = useLogin()
  const dispatch = useDispatch();
  const avatar = 'https://res.cloudinary.com/gomesdev/image/upload/v1649718658/avatar_ip9qyt.png'
  const navigation = useNavigation()
  const [height, setHeight] = useState(50);
  const [showReply, setShowReply] = useState(false)
  const [rating_selected, setRating] = useState('')
  const [replyTo, setReplyTo] = useState('')
  const [comment, setComment] = useState('')

  const textInput = useRef()
  console.log(item)
  useEffect(() => {
    this.ref.focus()
  }, [])

  const sendComment = async () => {
    if(rating_selected === '') {
      dispatch(showToast('A nota é obrigatória', 'error', 'error'))
      return
    }

    const existRating = item.item?.map(({userId}) => userId._id).includes(profile.id)
    if(existRating) {
      dispatch(showToast('Sua avaliação anterior será excluída', 'warn', 'warning'))
    }

    const data = {comment, rating_selected}

    const response = await fetch(`${URL}/product/${item.id}/rating`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${profile.token}`
      },
      body: JSON.stringify(data)
    }).catch((err) => console.log(err))

    const res = await response.json()

    if(response.status === 201) {
      dispatch(showToast(res, 'success', 'done'))
      navigation.goBack()
    }

    if(response.status === 400) {
      dispatch(showToast(res, 'error', 'error'))
    }

    if(response.status === 500) {
      dispatch(showToast(res, 'error', 'error'))
    }
  }

  const replyComment = async (id, name) => {
    setShowReply(true)
    setReplyTo(name)
  }

  const cancelReplyComment = () => {
    setShowReply(false)
    setReplyTo('')
  }

  const removeComment = async () => {
    const response = await fetch(`http://192.168.15.254:3003/product/${item.id}/rating/delete`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${profile.token}`
      }
    }).catch((err) => console.log(err))

    const res = await response.json()

    if(response.status === 200) {
      dispatch(showToast(res, 'success', 'done'))
      navigation.goBack()
    }

    if(response.status === 400) {
      dispatch(showToast(res, 'error', 'error'))
    }

    if(response.status === 500) {
      dispatch(showToast(res, 'error', 'error'))
    }
  }

  return (
    <Container color={'#fff'}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={navigation.goBack}>
            <Icon name="arrow-back" size={30} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Comentários</Text>
        </View>

        <ScrollView style={{flex: 1}}>
          {item.item?.length > 0 ? (
            item.item?.map(result => (
                <View key={result => result._id} style={styles.commentContainer}>
                  <View style={{width: '100%'}}>
                    <View style={styles.commentContent}>
                      <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
                        <View style={{borderRadius: 150, paddingRight: 15}}>
                          <Image source={{uri: result.userId.avatar || avatar}} 
                            style={{width: 40, height: 40, borderRadius: 200}}
                          />
                        </View>
                        <Text
                          style={styles.userName}>
                          {result.userName}
                        </Text>
                        <Text style={{color: Colors.primary, fontSize: 15}}>
                          {result.productReview}
                        </Text>
                      </View>
                      {profile.id === result.userId._id && (
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                          <TouchableOpacity
                            onPress={() => removeComment()}
                            style={{alignItems: 'center', justifyContent: 'center'}}
                          >
                            <Icon name="close" size={24} color={Colors.primary} />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>

                    {profile.seller === true && (
                      <TouchableOpacity
                        style={styles.replyBtn}
                        onPress={() => replyComment(result._id, result.userName)}
                      >
                        <Text style={styles.replyBtnText}>Responder</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
            ))
          ) : (<></>)}
        </ScrollView>

        {showReply && (
          <View style={[styles.footer, {height: 50, alignItems: 'center', paddingHorizontal: 15}]}>
            <Text style={{fontSize: 15, flex: 1}}>Respondendo a {replyTo}</Text>
            <TouchableOpacity
              onPress={() => cancelReplyComment()}
            >
                <Icon size={24} color={Colors.white} name="close" />
            </TouchableOpacity>
          </View>
        )}

        {profile.seller === false && (
          <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15,
          height: 50, backgroundColor: Colors.primary}}>
          <Text style={{color: Colors.white, fontSize: 16, width: '30%'}}>Nota:</Text>
          <Picker
            dropdownIconRippleColor={Colors.white}
            dropdownIconColor={Colors.white}
            selectedValue={rating_selected}
            onValueChange={(itemValue) => setRating(itemValue)}
            mode='dropdown'
            style={{color: Colors.white, width: '70%'}}
          >
            <Picker.Item label='Selecione uma nota' value='' />
            <Picker.Item label='1' value='1' />
            <Picker.Item label='2' value="2" />
            <Picker.Item label='3' value="3" />
            <Picker.Item label='4' value="4" />
            <Picker.Item label='5' value="5" />
          </Picker>
          </View>
        )}

        <View style={[styles.footer, {height: height}]}>
          <View style={{alignItems: 'center', justifyContent: 'center', paddingLeft: 10}}>
            <Image
              source={{uri: profile.avatar}}
              style={{width: 40, height: 40, borderRadius: 150}}
            />
          </View>
          <TextInput
            ref={ref => this.ref = ref}
            style={[styles.input, {height: height}]}
            defaultValue={comment}
            onChangeText={(text) => setComment(text)}
            multiline={true}
            maxLength={144}
            onContentSizeChange={e => {
              const changeHeight = e.nativeEvent.contentSize.height
              if(changeHeight > 50) {
                setHeight(changeHeight)
              }
            }}
            placeholder="Adicione um comentário..."
            placeholderTextColor={Colors.white}
          />
          <TouchableOpacity
            onPress={() => sendComment()}
            style={styles.publishBtn}
            disabled={comment.length < 1 ? true : false}
          >
            <Text style={[styles.publishBtnText, {opacity: comment.length < 1 ? 0.3 : 1}]}>
              Publicar
            </Text>
          </TouchableOpacity>
        </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.6,
    elevation: 10,
    zIndex: 10,
  },
  backBtn: {
    marginTop: 2,
    width: '12.5%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
    marginTop: 3,
  },
  commentContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    height: 50,
  },
  commentContent: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '100%',
  },
  userName: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 15,
    paddingRight: 10
  },
  replyBtn: {
    marginLeft: '40%',
    marginTop: -10,
    width: 60
  },
  replyBtnText: {
    color: Colors.grey,
    fontSize: 12
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.primary,
  },
  input: {
    flex: 1,
    paddingLeft: 20,
    color: Colors.white,
    backgroundColor: Colors.primary,
    fontSize: 16
  },
  publishBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  publishBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
  }
})

export default ModalComment;
