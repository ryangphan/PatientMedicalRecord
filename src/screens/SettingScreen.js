import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import colors from '../assets/colors';

import {firebase} from '../../config/config';
import {normalize} from '../helpers/FontHelper';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{flex: 1}}>
        <Text> Setting Screen </Text>
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
    //backgroundColor: colors.secondaryColor,
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
