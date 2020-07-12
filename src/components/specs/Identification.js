import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-ionicons';

import * as Animatable from 'react-native-animatable';
import {firebase} from '../../../config/config';
import 'firebase/storage';

import {normalize} from '../../helpers/FontHelper';
import colors from '../../assets/colors';
import * as ImageHelpers from '../../helpers/ImageHelper';

export default function Identification(props) {
  const [imageUri, setImageUri] = useState(
    'https://firebasestorage.googleapis.com/v0/b/patientmedicalrecords-788c5.appspot.com/o/Profile%20Pictures%2Fperson-icon.png?alt=media&token=06a6cd80-7d49-4127-92c5-ce843f6f8c3a',
  );
  const [isImageLoading, setIsImageLoading] = useState(false);

  const uploadImage = async (image) => {
    setIsImageLoading(true);
    const ref = firebase.storage().ref('Profile Pictures/' + image.uri);

    try {
      //converting to blob
      const blob = await ImageHelpers.prepareBlob(image.uri);
      const snapshot = await ref.put(blob);

      let downloadUrl = await ref.getDownloadURL();

      blob.close();

      setIsImageLoading(false);

      return downloadUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const openImageLibrary = async () => {
    setIsImageLoading(true);
    const result = await ImageHelpers.openImageLibrary();

    if (result) {
      const downloadUrl = await uploadImage(result);
      setImageUri(downloadUrl);
      setIsImageLoading(false);
    }
  };

  const openCamera = async () => {
    setIsImageLoading(true);
    const result = await ImageHelpers.openCamera();

    if (result) {
      const downloadUrl = await uploadImage(result);
      setImageUri(downloadUrl);
      setIsImageLoading(false);
    }
  };

  const changePicture = () => {
    Alert.alert(
      'Loading image',
      'Choose an existing option... ',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Photos',
          onPress: () => {
            openImageLibrary();
          },
        },
        {
          text: 'Camera',
          onPress: () => {
            openCamera();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <TouchableOpacity
          disabled={false}
          style={{flex: 1}}
          onPress={() => changePicture()}>
          {isImageLoading && (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                elevation: 1000,
              }}>
              <ActivityIndicator size="large" color={colors.primaryColor} />
            </View>
          )}
          <Image source={{uri: imageUri}} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const height = Dimensions.get('screen').height;
const height_image = height * 0.4 * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image_container: {
     alignSelf:'center',
    width: height_image,
    height: height_image,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: colors.secondaryColor,
    borderRadius: 30,
  },
});
