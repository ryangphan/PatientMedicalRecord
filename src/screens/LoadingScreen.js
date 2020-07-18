import React, {useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';

import colors from '../assets/colors';
import {normalize} from '../helpers/FontHelper';
import {firebase} from '../../config/config';

const imageUri =
  'https://firebasestorage.googleapis.com/v0/b/patientmedicalrecords-788c5.appspot.com/o/logo.png?alt=media&token=b3d77221-943b-4a35-af71-e40800f4d51b';

export default function LoadingScreen({navigation}) {
  useEffect(() => {
   //  setTimeout(() => {
   //    const currentUser = firebase.auth().currentUser;
   //    console.log(currentUser);
   //    if (!currentUser) {
   //      navigation.navigate('WelcomeScreen');
   //    }
   //  }, 1000);
  }, []);

  return (
    <View
      style={{flex: 1, backgroundColor: '#ddf0f0', justifyContent: 'center'}}>
      <SafeAreaView />
      <View style={{alignSelf: 'center'}}>
        <Image
          source={{uri: imageUri}}
          style={styles.image}
          resizeMode="contain"
        />
        <ActivityIndicator color={colors.primaryColor} size={'large'} />
      </View>
      <SafeAreaView />
    </View>
  );
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  image: {
    width: height * 0.2,
    height: width * 0.35,
    borderRadius: normalize(20),
  },
});
