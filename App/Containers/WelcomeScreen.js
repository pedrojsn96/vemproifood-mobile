import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { Images } from '../Themes';
import FacebookService from '../Services/FacebookService';

// Styles
import styles from './Styles/WelcomeScreenStyles';

class WelcomeScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: null
	});

	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View style={styles.content}>
				<View style={styles.centered}>
					<Image source={Images.ifood} style={styles.logo} />

					<View style={styles.section}>
						<View>{FacebookService.makeLoginButton(accessToken => {})}</View>
					</View>
				</View>
			</View>
		);
	}
}

export default WelcomeScreen;
