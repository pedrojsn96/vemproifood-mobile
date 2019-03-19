import React, { Component, Fragment } from 'react';
import {
	ActivityIndicator,
	Text,
	Image,
	View,
	FlatList,
	Platform,
	TouchableOpacity,
	SafeAreaView,
	StatusBar
} from 'react-native';

// Themes
import { Images, Colors } from '../Themes';

// External Libs
import axios from 'axios';
import moment from 'moment';
import RNLocation from 'react-native-location';
import OneSignal from 'react-native-onesignal';

// Components
import { CardItem } from '../Components/';
import { LoadingSpinner } from '../Components/Common';

// Utils
import { Translate } from '../Utils/';

// Styles
import styles from './Styles/WeatherScreenStyles';

const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?';

class WeatherScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<Text style={[styles.headerTitle, styles.headerTitleMargin]}>
				{'Clima'}
			</Text>
		),
		headerLeft: <View style={styles.wrapperHeaderLeft} />,
		tabBarIcon: ({ focused }) => {
			if (focused) {
				return (
					<Image
						style={styles.iconHeader}
						source={Images.iconCloudOn}
						resizeMode={'contain'}
					/>
				);
			} else {
				return (
					<Image
						style={styles.iconHeader}
						source={Images.iconCloudOff}
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
							color: focused ? Colors.tomatoRed : Colors.brownGrey
						}
					]}
				>
					{'Clima'}
				</Text>
			</View>
		)
	});

	constructor(props) {
		super(props);
		OneSignal.init('8dde699e-71a8-4590-8f2a-1b35e41a906f');
		OneSignal.addEventListener('received', this.onReceived);
		OneSignal.addEventListener('opened', this.onOpened);
		OneSignal.addEventListener('ids', this.onIds);
		this.unsubscribeLocationWatcher = null;
		this.state = {
			openWeather: null,
			perPage: 10,
			loading: false,
			totalData: null,
			isRefreshing: false,
			requestingGeolocation: false,
			lat: '',
			lon: ''
		};
	}

	componentDidMount() {
		this.init();
	}

	componentWillUnmount() {
		OneSignal.removeEventListener('received', this.onReceived);
		OneSignal.removeEventListener('opened', this.onOpened);
		OneSignal.removeEventListener('ids', this.onIds);
	}

	onReceived(notification) {
		console.log('Notification received: ', notification);
	}

	onOpened(openResult) {
		console.log('Message: ', openResult.notification.payload.body);
		console.log('Data: ', openResult.notification.payload.additionalData);
		console.log('isActive: ', openResult.notification.isAppInFocus);
		console.log('openResult: ', openResult);
	}

	onIds(device) {
		console.log('Device info: ', device);
	}

	/**
	 * init the necessaries functions
	 * @author samuelmataraso
	 * @method init
	 * @return func
	 */
	async init() {
		const locationPermissionGranted = await this.askForLocation();
		if (locationPermissionGranted) {
			this.unsubscribeLocationWatcher = RNLocation.subscribeToLocationUpdates(
				locations => {
					this.setState({ requestingGeolocation: false });
					const latitude = locations[0].latitude;
					const longitude = locations[0].longitude;
					if (latitude && longitude) {
						this.setState({
							lat: latitude.toString(),
							lon: longitude.toString()
						});
						this.getTotalCnt();
					}
				}
			);
		} else {
			this.setState({
				requestingGeolocation: false,
				openWeather: 'requestPermissionDenied'
			});
		}
		this.unsubscribeLocationWatcher &&
			setTimeout(() => {
				this.unsubscribeLocationWatcher();
			}, 3000);
	}

	/**
	 * asking for geolocation permissions
	 * @author samuelmataraso
	 * @method askForLocation
	 * @return permissions
	 */
	async askForLocation() {
		this.setState({ requestingGeolocation: true });
		return RNLocation.requestPermission({
			ios: 'whenInUse',
			android: {
				detail: 'fine',
				rationale: {
					title: 'Acessar sua localização',
					message:
						'Para exibir as informações climáticas, o Vem pro iFood gostaria de acessar sua localização.',
					buttonPositive: 'OK'
				}
			}
		});
	}

	/**
	 * get the total cnt(total data) of the API data.
	 * @author samuelmataraso
	 * @method getTotalCnt
	 * @return {state} totalData
	 */
	getTotalCnt = async () => {
		const { lat, lon } = this.state;
		await axios
			.get(
				`${baseURL}lat=${lat}&lon=${lon}&appid=a67ef818d8c8e3945f7eee5f541c47e5`
			)
			.then(response => {
				this.setState({
					totalData: response.data.cnt
				});
				this.loadData();
			})
			.catch(error => {
				console.log('error', error);
			});
	};

	/**
	 * load the API data
	 * @author samuelmataraso
	 * @method loadData
	 * @return {state} json
	 */
	loadData = async () => {
		const { perPage, loading, totalData, openWeather, lat, lon } = this.state;
		if (loading) return;
		if (!openWeather) {
			this.setState({ loading: true });

			const response = await fetch(
				`${baseURL}lat=${lat}&lon=${lon}&cnt=${perPage}&appid=a67ef818d8c8e3945f7eee5f541c47e5`
			);
			const repositories = await JSON.parse(response._bodyText);
			this.setState({
				openWeather: repositories,
				perPage: perPage + 10,
				loading: false
			});
		} else {
			if (openWeather.cnt < totalData) {
				this.setState({ loading: true });

				const response = await fetch(
					`${baseURL}lat=${lat}&lon=${lon}&cnt=${perPage}&appid=a67ef818d8c8e3945f7eee5f541c47e5`
				);
				const repositories = await JSON.parse(response._bodyText);

				this.setState({
					openWeather: repositories,
					perPage: perPage + 10,
					loading: false
				});
			} else {
				return null;
			}
		}
	};

	/**
	 * refresh the API data by Pull To Refresh
	 * @author samuelmataraso
	 * @method refresh
	 * @return {state} json
	 */
	refresh = async () => {
		const { lat, lon } = this.state;
		await axios
			.get(
				`${baseURL}lat=${lat}&lon=${lon}&cnt=${10}&appid=a67ef818d8c8e3945f7eee5f541c47e5`
			)
			.then(response => {
				this.setState({
					openWeather: response.data,
					perPage: 10,
					isRefreshing: false
				});
			});
	};

	/**
	 * render the footer list with a spinner when onEndReached is started
	 * @author samuelmataraso
	 * @method renderFooter
	 * @return {func} render
	 */
	renderFooter = () => {
		const { loading } = this.state;
		if (!loading) return null;
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 20,
					marginBottom: 20
				}}
			>
				{Platform.OS === 'android' ? (
					<ActivityIndicator color={Colors.tomatoRed} />
				) : (
					<ActivityIndicator />
				)}
			</View>
		);
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

	/**
	 * render when the user denied the geolocation permission
	 * @author samuelmataraso
	 * @method _renderRequestPermissionDenied
	 * @return {func} render
	 */
	_renderRequestPermissionDenied = () => {
		return (
			<View style={styles.wrapper}>
				<View style={styles.blankStateContainer}>
					<Image
						style={styles.blankStatePlacesImage}
						source={Images.cloudError}
					/>
					<View style={styles.blankStatePlacesTextContainer}>
						<Text style={styles.blankStatePlacesText}>{'Ops!'}</Text>
						<View style={styles.blankStatePlacesTextLine2}>
							<Text style={styles.blankStatePlacesText}>
								{'E neceesário aceitar a permissão de localizaçao'}
							</Text>
							<TouchableOpacity
								onPress={() => {
									this.setState({
										openWeather: null
									});
									this.init();
								}}
							>
								<Text style={styles.blankStatePlacesTextAccent}>
									{'tente novamente.'}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.blankStateButton} />
				</View>
			</View>
		);
	};

	/**
	 * render the weather list when the geolocation permission is accepted
	 * @author samuelmataraso
	 * @method _renderWeatherList
	 * @return {func} render
	 */
	_renderWeatherList = () => {
		const { openWeather, isRefreshing } = this.state;
		const { navigation } = this.props;
		const { navigate } = navigation;
		const { city, list } = openWeather;
		const { name, coord } = city;
		let dateAndTime;
		let date;
		let time;
		return (
			<Fragment>
				<SafeAreaView style={{ flex: 0, backgroundColor: Colors.tomatoRed }} />
				<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
					{this._handlerStatusBar()}
					<View style={styles.wrapper}>
						<FlatList
							data={list}
							keyExtractor={item => item.dt.toString()}
							renderItem={({ item }) => {
								dateAndTime = item.dt_txt.split(' ');
								date = moment(dateAndTime[0]).format('DD/MM/YYYY');
								time = dateAndTime[1].substring(0, 5);
								return (
									<CardItem
										weather={Translate.weatherType(item.weather[0].main)}
										where={name}
										when={date}
										whatTime={time}
										keyId={item.dt.toString()}
										onPress={() =>
											navigate('WeatherDetailScreen', {
												place: name,
												lat: coord.lat.toString(),
												lon: coord.lon.toString(),
												weather: Translate.weatherType(item.weather[0].main),
												descWeather: Translate.weatherDesc(
													item.weather[0].description
												),
												recommendedDish: Translate.weatherRecommendedDish(
													item.weather[0].main
												),
												linkRecommendedDish: Translate.weatherLinkRecommendedDish(
													item.weather[0].main
												)
											})
										}
									/>
								);
							}}
							showsVerticalScrollIndicator={false}
							refreshing={isRefreshing}
							onRefresh={() => {
								this.setState({
									isRefreshing: true
								});
								this.refresh();
							}}
							onEndReached={this.loadData}
							onEndReachedThreshold={0.1}
							ListFooterComponent={this.renderFooter()}
							removeClippedSubviews={false}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	};

	_handlerStatusBar = () => {
		if (Platform.OS === 'ios') {
			return <StatusBar barStyle="light-content" />;
		} else {
			if (Platform.Version <= 22) {
				return (
					<StatusBar
						barStyle="light-content"
						backgroundColor={Colors.tomatoRed}
					/>
				);
			} else {
				return (
					<StatusBar
						barStyle="light-content"
						backgroundColor={Colors.tomatoRed}
					/>
				);
			}
		}
	};

	render() {
		const { openWeather } = this.state;
		if (!openWeather) {
			return this._renderLoading();
		} else if (openWeather === 'requestPermissionDenied') {
			return this._renderRequestPermissionDenied();
		} else {
			return this._renderWeatherList();
		}
	}
}

export default WeatherScreen;
