import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';

import colors from '../assets/colors';

import {firebase} from '../../config/config';
import {normalize} from '../helpers/FontHelper';
import {WebView} from 'react-native-webview';

export default QuestionaireScreen = () => {
  const [hasForm, showForm] = useState(false);
  const show = () => showForm(true);
  const hide = () => showForm(false);
  //QdGVz0jZmEWbzJTb11Db
  //gYuJVYS1jZmEWbzJTb11Db

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://my.nativeforms.com/QdGVz0jZmEWbzJTb11Db'}}
      />
    </View>
  );
};

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

{
  /*
 
 */
}
