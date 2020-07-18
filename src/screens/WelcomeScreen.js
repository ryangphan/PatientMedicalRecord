import React, {useReducer, useState, useEffect, useCallback} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  LogBox,
  TouchableOpacity,
} from 'react-native';

import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';

import WelcomeSlide from '../components/WelcomeSlide';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';
import {normalize} from '../helpers/FontHelper';
import loadingReducer from '../redux/reducers/LoadingReducer';
import LoadingScreen from './LoadingScreen';


export default function WelcomeScreen({navigation}) {
  const [animationSignUp, setAnimationSignUp] = useState(null);
  const [animationSignIn, setAnimationSignIn] = useState(null);
  const [animationShow, setAnimationShow] = useState(false);
  const [loading, loadingDispatch] = useReducer(loadingReducer);

  useEffect(() => {
    const _console = _.clone(console);
    LogBox.ignoreLogs(['Cannot update a component']);
    LogBox.ignoreLogs(['Setting a timer for a long period']);
    console.warn = (message) => {
      if (message.indexOf('Cannot update a component') <= -1) {
        _console.warn(message);
      }
      if (message.indexOf('Setting a timer for a long period') <= -1) {
        _console.warn(message);
      }
    };
  }, []);

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
          title="OUR MISSION"
          text="Our mission is to Create, Change and to Heal, by bridging the patient-practitioner gap"
        />
      </View>

      <View style={{flex: 1}}>
        <WelcomeSlide
          imageSrc={require('../assets/swiper_bg1.png')}
          title="DIAGNOSIS MADE EASY"
          text="Spend less time wondering, more time connecting. PhysiVoice takes the
          complexity out of subjective assessment"
        />
      </View>

      <View style={{flex: 1}}>
        <View style={{flex: 0.4, justifyContent: 'center'}}>
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
          <View style={{flex: 0.6}}>
            <Animatable.View
              animation={animationSignUp}
              delay={0}
              duration={800}
              useNativeDriver
              style={{flex: 0.3, paddingHorizontal: normalize(35)}}>
              <Text style={styles.title}>
                Join us in our mission to transform healthcare to extraordinary
              </Text>
            </Animatable.View>

            <Animatable.View
              animation={animationSignIn}
              delay={0}
              duration={1300}
              useNativeDriver
              style={{
                flex: 0.1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: normalize(15)
              }}>
              <TouchableOpacity
                onPress={() => {
                  handlePress('https://www.linkedin.com/company/physivoice/');
                }}>
                <Image
                  source={require('../assets/icons8-linkedin-48.png')}
                  style={{marginHorizontal: normalize(10), width: normalize(45), height: normalize(45) }}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePress('https://www.facebook.com/physivoice/');
                }}>
                <Image
                  source={require('../assets/icons8-facebook-40.png')}
                  style={{marginHorizontal: normalize(10) ,width: normalize(45), height: normalize(45)}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </Animatable.View>

            <View
              style={{
                flexDirection: 'row',
                flex: 0.6,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Animatable.View
                animation={animationSignUp}
                delay={0}
                duration={1500}
                useNativeDriver>
                <CustomButton
                  style={[
                    styles.button,
                    {
                      backgroundColor: 'transparent',
                      borderColor: colors.primaryColor,
                    },
                  ]}
                  onPress={() => {
                    navigation.navigate('SignUpScreen');
                  }}
                  title="Sign Up">
                  <Text
                    style={{fontWeight: 'bold', color: colors.primaryColor}}>
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
                    {
                      backgroundColor: colors.secondaryColor,
                      borderColor: colors.secondaryColor,
                    },
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
    width: normalize(16),
    height: normalize(16),
    borderRadius: normalize(8),
    marginHorizontal: normalize(5),
    marginVertical: normalize(5),
  },
  activeDot: {
    backgroundColor: colors.primaryColor,
    width: normalize(30),
    height: normalize(16),
    borderRadius: normalize(8),
    marginHorizontal: normalize(5),
    marginVertical: normalize(5),
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
    fontSize: normalize(45),
    fontWeight: 'bold',
    color: colors.primaryColor,
    textAlign: 'center',
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 70,
    alignSelf: 'center',
    width: width * 0.3,
    height: height * 0.07,
  },
});
