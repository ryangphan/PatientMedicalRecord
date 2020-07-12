import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-ionicons';

import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import InputField from '../components/InputField';
import PwdField from '../components/PwdField';

import {firebase} from '../../config/config';
import {normalize} from '../helpers/FontHelper';
import colors from '../assets/colors';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailTextInputChange = (text) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(text.toLowerCase())) {
      setIsValidEmail(true);
      setEmail(text);
    } else {
      setIsValidEmail(false);
      setEmail('');
    }
  };

  const onLoginPress = () => {
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
              alert('User does not exist');
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
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <Animatable.View style={styles.header} animation="fadeInUpBig">
            <Text style={styles.textHeader}>Signing in</Text>
          </Animatable.View>
          <View style={styles.footer}>
            <InputField
              title="Email"
              iconName="mail"
              color={colors.primaryColor}
              placeHolder="Ex: physivoice@trash.grav"
              autoCapitalize="none"
              keyboardType="email-address"
              onInputChange={(text) => {
                handleEmailTextInputChange(text);
              }}>
              {isValidEmail ? (
                <Animatable.View animation="bounceIn">
                  <Icon
                    name="checkmark-circle"
                    color="green"
                    size={normalize(20)}
                  />
                </Animatable.View>
              ) : null}
            </InputField>

            <PwdField
              color={colors.primaryColor}
              value={password}
              onInputChange={(text) => {
                setPassword(text);
              }}
            />

            <TouchableOpacity>
              <Text style={{color: '#009bd1'}}>Forgot password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => {
                onLoginPress;
              }}>
              <View style={styles.button}>
                <Icon name="arrow-forward" color="white" size={normalize(25)} />
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
    backgroundColor: colors.secondaryColor,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '10%',
    paddingVertical: screenHeight * 0.12,
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 35,
    marginHorizontal: '4%',
    paddingHorizontal: '5%',
    paddingVertical: '8.5%',
  },
  textHeader: {
    color: 'white',
    fontSize: normalize(30),
    fontWeight: 'bold',
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '4%',
  },
  button: {
    width: normalize(100),
    backgroundColor: colors.primaryColor,
    marginTop: normalize(15),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(15),
  },
});
