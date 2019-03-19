import React, { Component, Fragment } from 'react';
import { Image, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Images, Colors } from '../Themes';
import FacebookService from '../Services/FacebookService';

// Styles
import styles from './Styles/LoginScreenStyles';

class LoginScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: null
	});

	constructor(props) {
		super(props);

		this.state = {};
	}

	_handlerStatusBar = () => {
		if (Platform.OS === 'ios') {
			return <StatusBar barStyle="dark-content" />;
		} else {
			if (Platform.Version <= 22) {
				return (
					<StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
				);
			} else {
				return (
					<StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
				);
			}
		}
	};

	render() {
		return (
			<Fragment>
				<SafeAreaView style={{ flex: 0, backgroundColor: Colors.white }} />
				<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
					{this._handlerStatusBar()}
					<View style={styles.content}>
						<View style={styles.centered}>
							<Image source={Images.ifood} style={styles.logo} />

							<View style={styles.section}>
								<View>
									{FacebookService.makeLoginButton(accessToken => {})}
								</View>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

export default LoginScreen;
