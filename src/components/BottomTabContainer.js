import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import colors from './src/assets/colors';
import PropTypes from 'prop-types';
const BottomTabContainer = ({color, type, ...props}) => (
  <View style={styles.container}>
    <Text style={{color: color}}>{props.notification[type].length || 0}</Text>
  </View>
);

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

BottomTabContainer.defaultProps = {
  color: colors.txtPlaceholder,
};

BottomTabContainer.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default BottomTabContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
