import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	Image,
	View,
	TouchableOpacity,
	Platform,
	AsyncStorage
} from 'react-native';

// Themes
import { Images, Colors } from '../Themes';

// External Libs
import FacebookService from '../Services/FacebookService';

// Components
import { LoadingSpinner } from '../Components/Common';

// Styles
import styles from './Styles/ProfileScreenStyles';

class ProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: <Text style={styles.headerLabelStyle}>{'Perfil'}</Text>,
		headerLeft: <View style={styles.wrapperHeaderLeft} />,
		tabBarIcon: ({ focused }) => {
			if (focused) {
				return (
					<Image
						style={styles.iconHeader}
						source={Images.iconProfileUserOn}
						resizeMode={'contain'}
					/>
				);
			} else {
				return (
					<Image
						style={styles.iconHeader}
						source={Images.iconProfileUserOff}
						resizeMode={'contain'}
					/>
				);
			}
		},
		tabBarLabel: ({ focused }) => (
			<View style={Platform.OS === 'ios' ? styles.wrapperTabBarLabel : {}}>
				<Text
					style={[
						styles.label,
						{
							color: focused ? Colors.tomatoRed : Colors.blackGray
						}
					]}
				>
					{'Perfil'}
				</Text>
			</View>
		)
	});

	constructor(props) {
		super(props);

		this.state = {
			profile: null
		};
	}

	componentDidMount() {
		this.loadData();
	}

	/**
	 * Read the data of phoneStorage by AsyncStorage.
	 * @author samuelmataraso
	 * @method loadData
	 * @param none
	 * @return json
	 */
	async loadData() {
		const profileAS = await AsyncStorage.getItem('fb');
		this.setState({
			profile: JSON.parse(profileAS)
		});
	}

	/**
	 * Handle the user logout of app.
	 * @author samuelmataraso
	 * @method _handleLogout
	 * @param none
	 * @return func
	 */
	_handleLogout = () => {
		AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	/**
	 * render the startting loading
	 * @author samuelmataraso
	 * @method _renderLoading
	 * @return {func} render
	 */
	_renderLoading = () => {
		return (
			<View style={styles.wrapper}>
				<LoadingSpinner
					text="Carregando Informações"
					backgroundColor={Colors.white}
				/>
			</View>
		);
	};

	render() {
		const { profile } = this.state;
		if (!profile) {
			return this._renderLoading();
		}
		const profileName = profile && profile.name ? profile.name : null;
		const profileEmail = profile && profile.email ? profile.email : null;
		const profileAvatar =
			profile && profile.picture.data.url ? profile.picture.data.url : null;
		return (
			<View style={styles.mainContainer}>
				<ScrollView
					style={styles.container}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.header} />
					<Image
						source={
							profileAvatar ? { uri: profileAvatar } : Images.iconPlaceholder
						}
						style={styles.avatarContent}
					/>
					<View style={styles.bodyContent}>
						{profileName && (
							<Text style={styles.textNameStyle}>{profileName}</Text>
						)}
						{profileEmail && (
							<View style={styles.wrapperEmail}>
								<Text style={styles.textEmailStyle}>{profileEmail}</Text>
							</View>
						)}
						<View style={styles.logoutContent}>
							{FacebookService.makeLogoutButton(accessToken => {
								this._handleLogout();
							})}
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default ProfileScreen;
