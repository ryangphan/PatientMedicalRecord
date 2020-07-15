import React from 'react';
import {Text, View, TextInput, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-ionicons';

import {normalize} from '../helpers/FontHelper';
import * as Animatable from 'react-native-animatable';

const InputField = (props) => {
  return (
    <View style = {{marginBottom: normalize(40),}}>
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
          onFocus = {() => props.onFocusCallback()}
          autoCapitalize={props.autoCapitalize}
          autoCorrect={false}
          keyboardType={props.keyboardType}
          maxLength={30}
          onChangeText={(text) => props.onInputChange(text)}
        />
        {props.children}
      </View>
      {props.isErrorVisible ? (
        <Animatable.View animation="bounceIn" style={{flexDirection: 'row'}}>
          <Icon name="ios-alert" color="red" size={normalize(35)} />
          <Text
            style={{
              marginStart: normalize(15),
              color: 'red',
              fontSize: normalize(20),
            }}>
            {props.errorText}
          </Text>
        </Animatable.View>
      ) : null}
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
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    paddingLeft: normalize(10),
    paddingBottom: normalize(-1),
    fontSize: normalize(24),
  },
});
