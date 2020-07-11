import React, { useState } from 'react'
import {
	Text,
	View,
	TextInput,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable'

import {normalize} from '../helpers/FontHelper'

const PwdField = props => {
	const [secureTextEntry, setSecureTextEntry] = useState(true)

	const secureTextEntryHandler = () => {
		setSecureTextEntry(!secureTextEntry)
	}

	return (
		<View>
			<Text style={[styles.text, { color: props.color }]}>
				{props.title ? props.title : 'Password'}
			</Text>
			<View style={styles.action}>
				<FontAwesome name='lock' color={props.color} size={normalize(20)} />
				<TextInput
					style={[styles.textInput, { color: props.color }]}
					blurOnSubmit
					secureTextEntry={secureTextEntry}
					autoCapitalize='none'
					autoCorrect={false}
					keyboardType='default'
					maxLength={13}
					value={props.value}
					onChangeText={text => props.onInputChange(text)}
				/>
				<Animatable.View animation='bounceIn'>
					<TouchableOpacity onPress={secureTextEntryHandler}>
						{secureTextEntry ? (
							<Feather name='eye-off' color='grey' size={normalize(20)} />
						) : (
							<Feather name='eye' color='grey' size={normalize(20)} />
						)}
					</TouchableOpacity>
				</Animatable.View>
			</View>
		</View>
	)
}

export default PwdField

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