import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-ionicons';

import {normalize} from '../helpers/FontHelper';

const PwdField = (props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const secureTextEntryHandler = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View>
      <Text style={[styles.text, {color: props.color}]}>
        {props.title ? props.title : 'Password'}
      </Text>
      <View style={styles.action}>
        <Icon
          name="ios-lock"
          color={props.color}
          size={normalize(35)}
          style={{marginTop: normalize(20), marginEnd: normalize(15)}}
        />
        <TextInput
          style={[styles.textInput, {color: props.color}]}
          blurOnSubmit
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          maxLength={13}
          value={props.value}
          onChangeText={(text) => props.onInputChange(text)}
        />
        <Animatable.View animation="bounceIn">
          <TouchableOpacity onPress={secureTextEntryHandler}>
            {secureTextEntry ? (
              <Icon name="eye-off" color="grey" size={normalize(30)} style={{marginTop: normalize(34)}} />
            ) : (
              <Icon name="eye" color="grey" size={normalize(30)} style={{marginTop: normalize(34)}}/>
            )}
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
};

export default PwdField;

const styles = StyleSheet.create({
  text: {
    fontSize: normalize(28),
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginBottom: normalize(40),
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    paddingLeft: normalize(10),
    paddingBottom: normalize(-7),
    fontSize: normalize(24),
  }
});
