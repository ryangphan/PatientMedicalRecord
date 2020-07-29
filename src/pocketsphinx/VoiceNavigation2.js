import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

class VoiceNavigation2 extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView />
        <WebView source={{uri: './live'}} />
        <SafeAreaView />
      </View>
    );
  }
}

export default VoiceNavigation2;

{
  /*
   <ScrollView style={{flex: 1}}>
        <HTML
          html={htmlContent}
          imagesMaxWidth={Dimensions.get('window').width}
        />
      </ScrollView>
*/
}
