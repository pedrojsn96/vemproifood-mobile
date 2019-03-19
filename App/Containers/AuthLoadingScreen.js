import React, { Component } from 'react';

import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import { AccessToken } from 'react-native-fbsdk';
class AuthLoadingScreen extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
	}

	/**
	 * Check if the user is logged in or not.
	 * @author samuelmataraso
	 * @method isLoggedIn
	 * @param none
	 * @return resolve
	 */
	isLoggedIn() {
		return new Promise((resolve, reject) => {
			AccessToken.getCurrentAccessToken()
				.then(data => {
					if (data) {
						if (data.accessToken) {
							resolve(true);
						} else {
							resolve(false);
						}
					} else {
						resolve(false);
					}
				})
				.catch(err => reject(err));
		});
	}

	componentWillMount() {
		this.isLoggedIn()
			.then(LoggedIn => {
				this.props.navigation.navigate(LoggedIn ? 'TabRoot' : 'Welcome');
			})
			.catch(() => {
				console.log('error on auth loading');
			});
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}

export default AuthLoadingScreen;
