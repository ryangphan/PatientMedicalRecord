import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import {firebase} from '../../config/config';

export default function HomeScreen(props) {
  componentDidMount = async () => {
    console.log(props);
  };

  onLogoutPress = () => {
    //firebase.auth().signOut();
    console.log(props.extraData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
          <Text style={styles.buttonTitle}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.7, backgroundColor: 'red'}}>
        <View style={{flex: 0.5, backgroundColor: 'yellow'}}></View>
        <View style={{flex: 0.5, backgroundColor: 'green'}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
  },
  header: {
    //height: 60,
    flex: 0.3,
    borderBottomWidth: 0.5,
    backgroundColor: 'blue',
    borderBottomColor: 'black',
    //alignItems: 'center',
    //justifyContent: 'center',
    //flexDirection: 'row',
  },
  logo: {
    flex: 1,
    height: 50,
    width: 50,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
//rnpce
