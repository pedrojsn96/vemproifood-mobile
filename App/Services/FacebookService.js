import React from 'react';
import { AsyncStorage } from 'react-native';
import NavigationService from './NavigationService';
import {
	LoginButton,
	AccessToken,
	GraphRequest,
	GraphRequestManager
} from 'react-native-fbsdk';

/**
 * Handle the data (facebook login data) to be saved on phoneStorage by AsyncStorage
 * and afterm, navigate to LoadingScreen.
 * @author samuelmataraso
 * @method _handleSave
 * @param object data
 * @return json / func
 */
_handleSave = async data => {
	await AsyncStorage.setItem('fb', JSON.stringify(data));
	NavigationService.navigate('Auth');
};

/**
 * Make the login on facebook.
 * @author samuelmataraso
 * @method makeLoginButton
 * @param none
 * @return request
 */
function makeLoginButton() {
	return (
		<LoginButton
			readPermissions={['public_profile']}
			onLoginFinished={(error, result) => {
				if (error) {
					alert(
						'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.'
					);
					console.log('login has error: ' + result.error);
				} else if (result.isCancelled) {
					console.log('login is cancelled.');
				} else {
					AccessToken.getCurrentAccessToken().then(data => {
						let accessToken = data.accessToken;

						const responseInfoCallback = (error, result) => {
							if (error) {
								alert(
									'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.'
								);
								console.log('Error fetching data: ' + error.toString());
							} else {
								this._handleSave(result);
							}
						};

						const infoRequest = new GraphRequest(
							'/me',
							{
								accessToken: accessToken,
								parameters: {
									fields: {
										string: 'id, email, name, picture.type(large)'
									}
								}
							},
							responseInfoCallback
						);

						// Start the graph request.
						new GraphRequestManager().addRequest(infoRequest).start();
					});
				}
			}}
		/>
	);
}

/**
 * Make the logout on facebook.
 * @author samuelmataraso
 * @method makeLogoutButton
 * @param func callback
 * @return request
 */
function makeLogoutButton(callback) {
	return (
		<LoginButton
			onLogoutFinished={() => {
				callback();
			}}
		/>
	);
}

export default {
	makeLoginButton,
	makeLogoutButton,
	_handleSave
};
