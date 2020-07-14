import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

import Icon from 'react-native-ionicons';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Info from '../components/specs/Info';
import Identification from '../components/specs/Identification';

import {firebase} from '../../config/config';
import {normalize} from '../helpers/FontHelper';
import colors from '../assets/colors';

export default function SignUpScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [imageUri, setImageUri] = useState(
    'https://firebasestorage.googleapis.com/v0/b/patientmedicalrecords-788c5.appspot.com/o/Profile%20Pictures%2Fperson-icon.png?alt=media&token=06a6cd80-7d49-4127-92c5-ce843f6f8c3a',
  );

  const validateInputFields = () => {
    console.log(fullName, email, password);
  };

  const onSignUpPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('Home');
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
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <Animatable.View style={styles.header} animation="fadeInUpBig">
            <Text style={styles.textHeader}>Join us</Text>
          </Animatable.View>
          <View style={styles.footer}>
            <Swiper
              loop={false}
              dot={<View style={styles.dot} />}
              activeDot={<View style={styles.activeDot} />}>
              <Info
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                isValidEmail={isValidEmail}
                setIsValidEmail={setIsValidEmail}
              />

              <Identification imageUri={imageUri} setImageUri={setImageUri} />
            </Swiper>
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => {
                validateInputFields();
              }}>
              <View style={styles.button}>
                <Icon name="arrow-forward" color="white" size={normalize(40)} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <SafeAreaView />
    </View>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '10%',
    paddingVertical: screenHeight * 0.068,
  },
  textHeader: {
    color: 'white',
    fontSize: normalize(42),
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    height: screenHeight / 1.42,
    backgroundColor: 'white',
    borderRadius: 35,
    marginHorizontal: '4%',
    paddingHorizontal: '8%',
    paddingVertical: '6.8%',
  },
  button: {
    width: screenWidth / 5,
    height: screenHeight / 20,
    backgroundColor: colors.secondaryColor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgba(52,101,217,.4)',
    width: normalize(14),
    height: normalize(14),
    borderRadius: normalize(7),
    marginHorizontal: normalize(5),
    marginVertical: normalize(3),
  },
  activeDot: {
    backgroundColor: colors.primaryColor,
    width: normalize(30),
    height: normalize(14),
    borderRadius: normalize(7),
    marginHorizontal: normalize(5),
    marginVertical: normalize(3),
  },
});
