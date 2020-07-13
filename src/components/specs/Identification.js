import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';

import EditableProfilePicture from '../ProfilePicture'

export default function Identification(props) {
  return (
    <View style={styles.container}>
      <EditableProfilePicture/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
});
