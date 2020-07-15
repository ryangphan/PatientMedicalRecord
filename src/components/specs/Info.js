import React, {Component, useState, useEffect} from 'react';
import {View} from 'react-native';

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
    }
  };


  return (
    <View>
      <InputField
        title="Full name"
        iconName="person"
        color={colors.primaryColor}
        placeHolder="Ex: Jordan Peterson"
        autoCapitalize="sentences"
        keyboardType="default"
        isErrorVisible={props.isFullNameError}
        errorText={props.fullNameErrorText}
        onFocusCallback={() => {
          props.setFullNameErrorText('');
          props.setIsFullNameError(false);
        }}
        onInputChange={(text) => {
          props.setFullName(text);
        }}>
        {props.fullName.length > 2 ? (
          <Animatable.View animation="bounceIn">
            <Icon
              name="checkmark-circle"
              color="green"
              size={normalize(35)}
              style={{marginTop: normalize(34)}}
            />
          </Animatable.View>
        ) : null}
      </InputField>
      <InputField
        title="Email"
        iconName="mail"
        color={colors.primaryColor}
        placeHolder="Ex: physivoice@trash.grav"
        autoCapitalize="none"
        keyboardType="email-address"
        value={props.email}
        isErrorVisible={props.isEmailError}
        errorText={props.emailErrorText}
        onFocusCallback={() => {
          props.setEmailErrorText('');
          props.setIsEmailError(false);
        }}
        onInputChange={(text) => {
          handleEmailTextInputChange(text);
        }}>
        {props.isValidEmail ? (
          <Animatable.View animation="bounceIn">
            <Icon
              name="checkmark-circle"
              color="green"
              size={normalize(35)}
              style={{marginTop: normalize(34)}}
            />
          </Animatable.View>
        ) : null}
      </InputField>
      <PwdField
        color={colors.primaryColor}
        value={props.password}
        isErrorVisible={props.isPasswordError}
        errorText={props.passwordErrorText}
        onFocusCallback={() => {
          props.setPasswordErrorText('');
          props.setIsPasswordError(false);
        }}
        onInputChange={(text) => {
          props.setPassword(text);
        }}
      />
      <PwdField
        title="Confirm password"
        color={colors.primaryColor}
        value={props.confirmPassword}
        isErrorVisible={props.isConfirmPasswordError}
        errorText={props.confirmPasswordErrorText}
        onFocusCallback={() => {
          props.setConfirmPasswordErrorText('');
          props.setIsConfirmPasswordError(false);
        }}
        onInputChange={(text) => {
          props.setConfirmPassword(text);
        }}
      />
    </View>
  );
}
