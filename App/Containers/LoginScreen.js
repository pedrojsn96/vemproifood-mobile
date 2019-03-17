import React, { Component } from 'react';
import {
	View,
	TextInput,
	Text,
	ScrollView,
	Image,
	Button,
	Animated,
	TouchableOpacity,
	Keyboard,
	KeyboardAvoidingView,
	Platform
} from 'react-native';
import styles, {
	IMAGE_HEIGHT,
	IMAGE_HEIGHT_SMALL
} from './Styles/LoginScreenStyles';

import { Icon } from '../Components/Common';
import { TextField } from 'react-native-material-textfield';

import { Images, Colors } from '../Themes';

class LoginScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			visible: true,
			hideLoginButton: false
		};

		this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
	}

	componentWillMount() {
		if (Platform.OS == 'ios') {
			this.keyboardWillShowSub = Keyboard.addListener(
				'keyboardWillShow',
				this.keyboardWillShow
			);
			this.keyboardWillHideSub = Keyboard.addListener(
				'keyboardWillHide',
				this.keyboardWillHide
			);
		} else {
			this.keyboardWillShowSub = Keyboard.addListener(
				'keyboardDidShow',
				this.keyboardDidShow
			);
			this.keyboardWillHideSub = Keyboard.addListener(
				'keyboardDidHide',
				this.keyboardDidHide
			);
		}
	}

	componentWillUnmount() {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
	}

	keyboardWillShow = event => {
		Animated.timing(this.imageHeight, {
			duration: event.duration,
			toValue: IMAGE_HEIGHT_SMALL
		}).start();
	};

	keyboardWillHide = event => {
		Animated.timing(this.imageHeight, {
			duration: event.duration,
			toValue: IMAGE_HEIGHT
		}).start();
		this.setState({
			hideLoginButton: false
		});
	};

	keyboardDidShow = event => {
		this.setState({
			hideLoginButton: true
		});
		Animated.timing(this.imageHeight, {
			toValue: IMAGE_HEIGHT_SMALL
		}).start();
	};

	keyboardDidHide = event => {
		this.setState({
			hideLoginButton: false
		});
		Animated.timing(this.imageHeight, {
			toValue: IMAGE_HEIGHT
		}).start();
	};

	_renderInputs = () => {
		const { email, password, visible } = this.state;
		return (
			<View style={styles.keyboard}>
				<View style={styles.containerKeyboard}>
					<View style={styles.keybordForm}>
						<View style={styles.keyboardGroup}>
							<Image
								source={Images.iconLeading}
								style={styles.icon}
								resizeMode={'contain'}
							/>
							<TextField
								label={'Email'}
								value={email}
								onChangeText={email => this.setState({ email })}
								containerStyle={styles.input}
								tintColor={'rgb(108, 64, 190)'}
								renderAccessory={() => this.renderAccessory('text')}
								returnKeyType={'done'}
								underlineColorAndroid={'transparent'}
								autoCapitalize={'none'}
								autoCorrect={false}
								autoComplete={'email'}
							/>
						</View>

						<View style={[styles.keyboardGroup, styles.keyboardLast]}>
							<Image
								source={Images.iconLock}
								style={styles.icon}
								resizeMode={'contain'}
							/>
							<TextField
								label={'Password'}
								value={password}
								onChangeText={password => this.setState({ password })}
								secureTextEntry={visible}
								tintColor={'rgb(108, 64, 190)'}
								renderAccessory={() => this.renderAccessory('password')}
								containerStyle={styles.input}
								returnKeyType={'done'}
								underlineColorAndroid={'transparent'}
								autoCapitalize={'none'}
								autoCorrect={false}
								autoComplete={'password'}
							/>
						</View>
					</View>
				</View>
			</View>
		);
	};

	renderAccessory = field => {
		const { email, password, visible } = this.state;

		if (field === 'password' && password) {
			return (
				<TouchableOpacity
					style={styles.inputAccessory}
					onPress={() => this.setState({ visible: !visible })}
				>
					<Icon src={visible ? Images.eye : Images.eyeOff} size={'tiny'} />
				</TouchableOpacity>
			);
		} else if (field === 'text' && email) {
			return (
				<TouchableOpacity
					style={styles.inputAccessory}
					onPress={() => {
						this.setState({
							email: ''
						});
					}}
				>
					<Icon src={Images.clear} size={'tiny'} />
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	};

	render() {
		const { hideLoginButton } = this.state;
		const { navigation } = this.props;
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: Colors.white,
					alignItems: 'center'
				}}
			>
				<Animated.Image
					source={Images.logoRn}
					style={[styles.logo, { height: this.imageHeight }]}
				/>
				<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
					<KeyboardAvoidingView
						style={styles.container}
						behavior="padding"
						keyboardShouldPersistTaps={'always'}
					>
						{this._renderInputs()}
					</KeyboardAvoidingView>
				</ScrollView>
				{!hideLoginButton && (
					<View style={styles.keyboardNotAccess}>
						<TouchableOpacity
							style={styles.buttonRegistered}
							onPress={() => navigation.navigate('HomeScreenTab')}
						>
							<Text style={styles.buttonRegisteredLabel}>
								{'Entrar'.toUpperCase()}
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}
}

export default LoginScreen;
