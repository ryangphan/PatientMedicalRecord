import React, {useState} from 'react';

import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {normalize} from '../helpers/FontHelper';
import color from '../assets/colors';

export default function WelcomeSlide(props) {
  return (
    <View style={styles.slide}>
      <View style={styles.header}>
        <Image
          source={props.imageSrc}
          style={styles.image}
          resizeMode={'stretch'}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );
}

const {width, height} = Dimensions.get('screen');
const imageHeight = height * 0.5 * 0.8;
const imageWidth = imageHeight * 1.1;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.3,
    alignItems: 'center',
    paddingHorizontal: normalize(35),
  },
  image: {
    height: imageHeight,
    width: imageWidth,
  },
  title: {
    fontSize: normalize(25),
    fontWeight: 'bold',
    color: color.primaryColor,
    textAlign: 'center',
  },
  text: {
    color: color.secondaryColor,
    textAlign: 'center',
    marginTop: normalize(20),
  },
});
