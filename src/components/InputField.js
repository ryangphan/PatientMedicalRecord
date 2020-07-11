import React from 'react'
import { Text, View, TextInput, StyleSheet, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {normalize} from '../helpers/FontHelper'

const InputField = props => {
	return (
		<View>
			<Text style={[styles.text, {color:props.color}]}>{props.title}</Text>
			<View style={styles.action}>
				<FontAwesome name={props.fontAwesomeIcon} color={props.color} size={normalize(20)} />

				<TextInput
					placeholder={props.placeHolder}
					style={[styles.textInput, {color: props.color}]}
					blurOnSubmit
					autoCapitalize={props.autoCapitalize}
					autoCorrect={false}
					keyboardType={props.keyboardType}
					maxLength={30}
					onChangeText={text => props.onInputChange(text)}
				/>
				{props.children}
			</View>
		</View>
	)
}

export default InputField

const styles = StyleSheet.create({
   text: {
		fontSize: normalize(18),
		fontWeight: 'bold',
   },
   action: {
		flexDirection: 'row',
		marginVertical: normalize(10),
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: normalize(5),
   },
   textInput: {
		flex: 1,
		paddingLeft: normalize(10),
	},
})