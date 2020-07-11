import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import colors from '../assets/colors'

import {firebase} from '../../config/config';
import {normalize} from '../helpers/FontHelper';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  onFooterLinkPress = () => {
    navigation.navigate('SignUpScreen');
  };

  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.');
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate('Home', {user});
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView />
      {/* -------header------- */}
      <Animatable.View style={styles.header} animation="fadeInUpBig">
        <Text style={styles.textHeader}>Recycle with us!</Text>
      </Animatable.View>
      

      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    justifyContent: 'flex-end',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(50),
  },
});
