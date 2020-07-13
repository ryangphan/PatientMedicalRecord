import * as ImagePicker from 'react-native-image-picker';

export const openFiles = () => {
  let options = {
    title: 'Select From File',
    customButtons: [
      {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = {uri: response.uri};

      return response; // filepath: reponse, fileData: reponse.data, fileUri: response.uri
    }
  });
};

export const openCamera = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchCamera(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = {uri: response.uri};

      return response;
    }
  });
};

export const openImageLibrary = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      // const source = {uri: response.uri};
      console.log('response', JSON.stringify(response));

      return response;
    }
  });
};

export const prepareBlob = async (imageUri) => {
  const blob = await new Promise((resolve, reject) => {
    //new request
    const xml = new XMLHttpRequest();

    //success resolved it
    xml.onload = function () {
      resolve(xml.response);
    };

    //error threw new error
    xml.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Image Upload failed'));
    };

    //set the response type to get the blob
    xml.responseType = 'blob';
    xml.open('GET', imageUri, true);
    //send the request
    xml.send();
  });

  return blob;
};
