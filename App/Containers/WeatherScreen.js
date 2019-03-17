import React, { Component } from 'react';
import {
	ActivityIndicator,
	Text,
	Image,
	View,
	FlatList,
	Platform
} from 'react-native';

// Themes
import { Images, Colors } from '../Themes';

// External Libs
import axios from 'axios';
import moment from 'moment';
import RNLocation from 'react-native-location';

// Components
import { CardItem } from '../Components/';
import { SpinnerOverlay } from '../Components/Common';

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
						source={Images.iconRadarActive}
						resizeMode={'contain'}
					/>
				);
			} else {
				return (
					<Image
						style={styles.iconHeader}
						source={Images.iconRadarInactive}
						resizeMode={'contain'}
					/>
				);
			}
		}
	});

	constructor(props) {
		super(props);
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
					} else {
					}
				}
			);
		} else {
			this.setState({ requestingGeolocation: false });
		}
		this.unsubscribeLocationWatcher &&
			setTimeout(() => {
				this.unsubscribeLocationWatcher();
			}, 3000);
	}

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
				console.log('error lol', error);
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

	render() {
		const { openWeather, isRefreshing } = this.state;
		const { navigation } = this.props;
		const { navigate } = navigation;
		if (!openWeather) {
			return (
				<View style={styles.wrapper}>
					<SpinnerOverlay visible={true} />
				</View>
			);
		} else {
			const { city, list } = openWeather;
			const { name, coord } = city;
			let dateAndTime;
			let date;
			let time;
			return (
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
			);
		}
	}
}

export default WeatherScreen;
