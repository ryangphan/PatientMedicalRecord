import React, {Component, useState, useEffect, useCallback} from 'react';
import {Image, View, Text, StyleSheet, Dimensions, Linking} from 'react-native';

import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';

import WelcomeSlide from '../components/WelcomeSlide';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';
import {normalize} from '../helpers/FontHelper';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function WelcomeScreen({navigation}) {
  const [animationSignUp, setAnimationSignUp] = useState(null);
  const [animationSignIn, setAnimationSignIn] = useState(null);
  const [animationShow, setAnimationShow] = useState(false);

  const resetAnimation = () => {
    setAnimationSignUp(null);
    setAnimationSignIn(null);
    setAnimationShow(false);
  };

  const handlePress = useCallback(async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    }
  });

  const onIndexChanged = (index) => {
    if (index == 2) {
      setAnimationSignUp('bounceInLeft');
      setAnimationSignIn('bounceInRight');
      setAnimationShow(true);
    } else {
      resetAnimation();
    }
  };

  return (
    <Swiper
      loop={false}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      onIndexChanged={(index) => {
        onIndexChanged(index);
      }}>
      <View style={{flex: 1}}>
        <WelcomeSlide
          imageSrc={require('../assets/swiper_bg.png')}
          title="DIAGNOSIS MADE EASY"
          text="Spend less time wondering, more time connecting. PhysiVoice takes the
          complexity out of subjective assessment."
        />
      </View>

      <View style={{flex: 1}}>
        <WelcomeSlide
          imageSrc={require('../assets/swiper_bg1.png')}
          title="OUR MISSION"
          text="Our mission is to Create, Change and to Heal, by bridging the patient-practitioner gap."
        />
      </View>

      <View style={{flex: 1}}>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.image1}
            resizeMode={'contain'}
          />
          <Image
            source={require('../assets/text_logo.png')}
            style={styles.image2}
            resizeMode={'contain'}
          />
        </View>
        {animationShow ? (
          <View style={{flex: 0.5, paddingHorizontal: normalize(35)}}>
            <Animatable.View
              animation={animationSignUp}
              delay={0}
              duration={1500}
              useNativeDriver
              style={{flex: 0.3}}>
              <Text style={styles.title}>
                Join us in our mission to transform healthcare to extraordinary.
              </Text>
            </Animatable.View>

            <Animatable.View
              animation={animationSignIn}
              delay={0}
              duration={1500}
              useNativeDriver
              style={{
                flex: 0.1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  handlePress('https://www.linkedin.com/company/physivoice/');
                }}>
                <Image
                  source={require('../assets/icons8-linkedin-48.png')}
                  style={{marginHorizontal: normalize(7)}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePress('https://www.facebook.com/physivoice/');
                }}>
                <Image
                  source={require('../assets/icons8-facebook-40.png')}
                  style={{marginHorizontal: normalize(7)}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </Animatable.View>

            <View
              style={{
                flexDirection: 'row',
                flex: 0.45,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Animatable.View
                animation={animationSignUp}
                delay={0}
                duration={1500}
                useNativeDriver>
                <CustomButton
                  style={[styles.button, {backgroundColor: 'transparent'}]}
                  onPress={() => {
                    navigation.navigate('SignUpScreen');
                  }}
                  title="Sign Up">
                  <Text
                    style={{fontWeight: 'bold', color: colors.secondaryColor}}>
                    Sign Up
                  </Text>
                </CustomButton>
              </Animatable.View>

              <Animatable.View
                animation={animationSignIn}
                delay={0}
                duration={1500}
                useNativeDriver>
                <CustomButton
                  style={[
                    styles.button,
                    {backgroundColor: colors.secondaryColor},
                  ]}
                  onPress={() => {
                    navigation.navigate('LoginScreen');
                  }}
                  title="Sign In">
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Sign In
                  </Text>
                </CustomButton>
              </Animatable.View>
            </View>
          </View>
        ) : null}
      </View>
    </Swiper>
  );
}

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  dot: {
    backgroundColor: 'rgba(52,101,217,.4)',
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    marginHorizontal: normalize(5),
    marginVertical: normalize(3),
  },
  activeDot: {
    backgroundColor: colors.primaryColor,
    width: normalize(20),
    height: normalize(8),
    borderRadius: normalize(4),
    marginHorizontal: normalize(5),
    marginVertical: normalize(3),
  },
  image1: {
    height: height / 8,
    width: width / 2,
    alignSelf: 'center',
  },
  image2: {
    height: height / 6,
    width: width,
    alignSelf: 'center',
  },
  title: {
    fontSize: normalize(25),
    fontWeight: 'bold',
    color: colors.primaryColor,
    textAlign: 'center',
  },
  button: {
    borderColor: colors.secondaryColor,
    borderWidth: 0.5,
    borderRadius: 70,
    alignSelf: 'center',
    width: width * 0.3,
    height: height * 0.07,
  },
});