import React from 'react';
import {Text, View, TextInput, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-ionicons';

import {normalize} from '../helpers/FontHelper';

const InputField = (props) => {
  return (
    <View>
      <Text style={[styles.text, {color: props.color}]}>{props.title}</Text>
      <View style={styles.action}>
        <Icon
          name={props.iconName}
          color={props.color}
          size={normalize(35)}
          style={{marginTop: normalize(20), marginEnd: normalize(15)}}
        />

        <TextInput
          placeholder={props.placeHolder}
          style={[styles.textInput, {color: props.color}]}
          blurOnSubmit
          autoCapitalize={props.autoCapitalize}
          autoCorrect={false}
          keyboardType={props.keyboardType}
          maxLength={30}
          onChangeText={(text) => props.onInputChange(text)}
        />
        {props.children}
      </View>
    </View>
  );
};

export default InputField;

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
