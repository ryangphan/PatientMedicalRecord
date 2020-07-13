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

import {firebase} from '../../config/config';
import 'firebase/storage';

import colors from '../assets/colors';
import * as ImageHelpers from '../helpers/ImageHelper';

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

  const openImageHelper = async (type) => {
    setIsImageLoading(true);
    let result = null;
    if (type === 'files') {
      result = ImageHelpers.openFiles();
    } else if (type === 'library') {
      result = ImageHelpers.openImageLibrary();
    } else if (type == 'camera') {
      result = ImageHelpers.openCamera();
    } else {
      console.log('Wrong type format');
      return;
    }
    
    setIsImageLoading(false);

    //  if (result) {
    //    const downloadUrl = await uploadImage(result);
    //    setImageUri(downloadUrl);
    //    setIsImageLoading(false);
    //  }
  };

  const changePicture = () => {
    Alert.alert(
      'Loading image',
      'Choose an existing option... ',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Files',
          onPress: () => {
            openImageHelper('files');
          },
        },
        {
          text: 'Library',
          onPress: () => {
            openImageHelper('library');
          },
        },
        {
          text: 'Camera',
          onPress: () => {
            openImageHelper('camera');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
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
  );
}

const height = Dimensions.get('screen').height;
const height_image = height * 0.4 * 0.4;

const styles = StyleSheet.create({
  image_container: {
    alignSelf: 'center',
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
