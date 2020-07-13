import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  StyleSheet,
  LogBox,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';

import {firebase} from '../../config/config';
import 'firebase/storage';

import colors from '../assets/colors';
import {normalize} from '../helpers/FontHelper';
import * as ImageHelpers from '../helpers/ImageHelper';

export default function Identification(props) {
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer for a long period']);
    const _console = _.clone(console);
    console.warn = (message) => {
      if (message.indexOf('Setting a timer for a long period') <= -1) {
        _console.warn(message);
      }
    };
  });

  const uploadImage = async (image) => {
    setIsImageLoading(true);
    const ref = firebase
      .storage()
      .ref(
        'Profile Pictures/' + image.data.substring(0, 20).replace(/[^a-zA-Z ]/g, ''),
      );

    try {
      //converting to blob
      const blob = await ImageHelpers.prepareBlob(image.uri);

      await ref.put(blob);

      let downloadUrl = await ref.getDownloadURL();

      blob.close();

      setIsImageLoading(false);

      return downloadUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const openImagePicker = (type) => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    if (type === 'library') {
      ImagePicker.launchImageLibrary(options, (response) => {
        uploadImage(response).then((downloadUrl) => {
          props.setImageUri(downloadUrl);
        });
      });
    } else if (type === 'camera') {
      ImagePicker.launchCamera(options, (response) => {
        uploadImage(response).then((downloadUrl) => {
          props.setImageUri(downloadUrl);
        });
      });
    } else {
      console.log('Invalid type format');
      setIsImageLoading(false);
    }
  };

  const changePicture = () => {
    setIsImageLoading(true);
    Alert.alert(
      'Loading image',
      'Choose an existing option... ',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setIsImageLoading(false);
          },
        },
        {
          text: 'Photo Library',
          onPress: () => {
            openImagePicker('library');
          },
        },
        {
          text: 'Camera',
          onPress: () => {
            openImagePicker('camera');
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
        <Image source={{uri: props.imageUri}} style={styles.image} />
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
    borderWidth: 5,
    borderColor: colors.secondaryColor,
    borderRadius: normalize(25),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(20),
  },
});
