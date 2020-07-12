import React, {Component, useState, useEffect} from 'react';
import {
  View,
} from 'react-native';

import Icon from 'react-native-ionicons';

import * as Animatable from 'react-native-animatable';

import InputField from '../InputField';
import PwdField from '../PwdField';

import {normalize} from '../../helpers/FontHelper';
import colors from '../../assets/colors';

export default function Info(props) {
  const handleEmailTextInputChange = (text) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(text.toLowerCase())) {
      props.setIsValidEmail(true);
      props.setEmail(text);
    } else {
      props.setIsValidEmail(false);
      props.setEmail('');
    }
  };

  return (
    <View>
      <InputField
        title="Full name"
        iconName="person"
        color={colors.secondaryColor}
        placeHolder="Ex: Jordan Peterson"
        autoCapitalize="sentences"
        keyboardType="default"
        onInputChange={(text) => {
          props.setFullName(text);
        }}>
        {props.fullName.length > 0 ? (
          <Animatable.View animation="bounceIn">
            <Icon name="checkmark-circle" color="green" size={normalize(20)} />
          </Animatable.View>
        ) : null}
      </InputField>
      <InputField
        title="Email"
        iconName="mail"
        color={colors.secondaryColor}
        placeHolder="Ex: physivoice@trash.grav"
        autoCapitalize="none"
        keyboardType="email-address"
        value = {props.email}
        onInputChange={(text) => {
          handleEmailTextInputChange(text);
        }}>
        {props.isValidEmail ? (
          <Animatable.View animation="bounceIn">
            <Icon name="checkmark-circle" color="green" size={normalize(20)} />
          </Animatable.View>
        ) : null}
      </InputField>
      <PwdField
        color={colors.secondaryColor}
        value={props.password}
        onInputChange={(text) => {
         props.setPassword(text);
        }}
      />
      <PwdField
        title="Confirm password"
        color={colors.secondaryColor}
        value={props.confirmPassword}
        onInputChange={(text) => {
         props.setConfirmPassword(text);
        }}
      />
    </View>
  );
}
