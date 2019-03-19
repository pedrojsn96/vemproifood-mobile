import React, { Component } from 'react';
import {
	View,
	StatusBar,
	Platform,
	BackHandler,
	PermissionsAndroid
} from 'react-native';

import AppNavigation from '../Navigation/AppNavigation';
import NavigationService from '../Services/NavigationService';
// Styles
import styles from './Styles/RootContainerStyles';

class RootContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		//process to disable the  hardware back button of android
		if (Platform.OS !== 'ios') {
			BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
		}
	}

	componentWillUnmount() {
		//process to disable the  hardware back button of android
		if (Platform.OS !== 'ios') {
			BackHandler.removeEventListener(
				'hardwareBackPress',
				this.handleBackButton
			);
		}
	}

	handleBackButton() {
		return true;
	}
	render() {
		return (
			<View style={styles.applicationView}>
				<StatusBar barStyle="light-content" />
				<AppNavigation
					ref={navigatorRef =>
						NavigationService.setTopLevelNavigator(navigatorRef)
					}
				/>
			</View>
		);
	}
}

export default RootContainer;
