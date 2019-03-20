import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	Image,
	View,
	TouchableOpacity,
	Linking
} from 'react-native';

// Themes
import { Images } from '../Themes';

// External Libs
import axios from 'axios';
import moment from 'moment';
import Share from 'react-native-share';

// Components
import { Map } from '../Components/';
import { SpinnerOverlay, Button } from '../Components/Common';

// Utils
import { Translate } from '../Utils/';

// Styles
import styles from './Styles/WeatherDetailScreenStyles';

class WeatherDetailScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<Text style={[styles.headerTitle, styles.headerTitleMargin]}>
				{'Detalhes'}
			</Text>
		),
		headerLeft: (
			<TouchableOpacity
				style={styles.wrapperHeaderLeft}
				hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
				onPress={() => {
					navigation.goBack();
				}}
			>
				<Image
					style={styles.iconHeader}
					source={Images.iconArrowLeftWhite}
					resizeMode={'contain'}
				/>
			</TouchableOpacity>
		),
		headerRight:
			navigation.state.params && navigation.state.params.headerRight
				? navigation.state.params.headerRight
				: null
	});

	constructor(props) {
		super(props);
		this.state = {
			place: '',
			lat: '',
			lon: '',
			weather: '',
			descWeather: '',
			recommendedDish: '',
			linkRecommendedDish: '',
			loading: false
		};
	}

	componentDidMount() {
		const { navigation } = this.props;
		const { state } = navigation;
		const { params } = state;
		const place = params && params.place ? params.place : 'Não informado.';
		const weather =
			params && params.weather ? params.weather : 'Não informado.';
		const recommendedDish =
			params && params.recommendedDish ? params.recommendedDish : '';
		const linkRecommendedDish =
			params && params.linkRecommendedDish ? params.linkRecommendedDish : '';

		this._renderShareModal(
			place,
			weather,
			recommendedDish,
			linkRecommendedDish
		);
		this.setState({
			loading: true
		});
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 2300);
		this.setState({
			place: params && params.place ? params.place : 'Não informado.',
			lat: params && params.lat ? params.lat : '-22.9056',
			lon: params && params.lon ? params.lon : '-47.0609',
			weather: params && params.weather ? params.weather : 'Não informado.',
			descWeather:
				params && params.descWeather ? params.descWeather : 'Não informado.',
			recommendedDish:
				params && params.recommendedDish ? params.recommendedDish : '',
			linkRecommendedDish:
				params && params.linkRecommendedDish ? params.linkRecommendedDish : ''
		});
	}

	/**
	 * Render the Share Modal
	 * @author samuelmataraso
	 * @method _renderShareModal
	 * @param  place - string
	 * @param weather - string
	 * @param recommendedDish - string
	 * @param linkRecommendedDish - string
	 * @return json
	 */
	_renderShareModal = (
		place,
		weather,
		recommendedDish,
		linkRecommendedDish
	) => {
		const { navigation } = this.props;
		let shareOptions = {
			title: 'Vem pro iFood nesse Clima!',
			message: `Hey!, hoje por aqui (${place}), está com um clima ${weather}. \nAcho que seria uma boa nesse clima comer um ${recommendedDish}. \nSimbora pedir no iFood ;D? \n`,
			url: 'Link: ' + linkRecommendedDish,
			subject: 'Vem pro iFood nesse Clima!',
			failOnCancel: false
		};

		navigation.setParams({
			headerRight: (
				<TouchableOpacity
					style={styles.wrapperHeaderRight}
					hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
					onPress={() => {
						Share.open(shareOptions);
					}}
				>
					<Image
						style={styles.iconHeader}
						source={Images.iconSocialShare}
						resizeMode={'contain'}
					/>
				</TouchableOpacity>
			)
		});
	};

	/**
	 * open the url to native browser
	 * @author samuelmataraso
	 * @method _openURL
	 * @param  url - string
	 * @return func
	 */
	_openURL = url => {
		Linking.openURL(url);
	};

	render() {
		const {
			place,
			lat,
			lon,
			weather,
			descWeather,
			recommendedDish,
			linkRecommendedDish,
			loading
		} = this.state;
		return (
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<View style={styles.wrapper}>
					<SpinnerOverlay visible={loading} />
					<View>
						<View style={styles.wrapperInfo}>
							<View>
								<Text style={styles.rowBlackStyle}>{'Local'}</Text>
							</View>
							<Text style={styles.rowStyle}>{place}</Text>
						</View>
						<View style={styles.wrapperMap}>
							{
								<Map
									lat={lat.toString()}
									long={lon.toString()}
									request={false}
									place={place}
									weather={weather}
								/>
							}
						</View>
					</View>
					<View style={styles.wrapperInfo}>
						<View style={styles.wrapperDetails}>
							<View>
								<Text style={styles.rowBlackStyle}>{'Detalhes do clima'}</Text>
							</View>
							<Text
								style={styles.rowStyle}
								numberOfLines={2}
								ellipsizeMode={'tail'}
							>
								{'Clima: ' + weather}
							</Text>
							<Text
								style={styles.rowStyle}
								numberOfLines={2}
								ellipsizeMode={'tail'}
							>
								{'Mais informações: ' + descWeather}
							</Text>
							<View style={styles.marginBetweenRows}>
								<Text style={styles.rowBlackStyle}>
									{'Recomendação de prato para esse clima'}
								</Text>
								<View style={styles.wrapperFood}>
									<Text
										style={styles.rowFoodStyle}
										numberOfLines={2}
										ellipsizeMode={'tail'}
									>
										{recommendedDish + ' !'}
									</Text>
									<View style={styles.wrapperFoodImg}>
										<Image
											source={Translate.weatherImgRecommendedDish(weather)}
											style={
												recommendedDish === 'Sorvete'
													? styles.foodIceStyle
													: styles.foodStyle
											}
											resizeMode="stretch"
										/>
									</View>
								</View>
								<View style={styles.wrapperButton}>
									<Button
										buttonLabel={'Comprar no iFood'}
										buttonStyle={styles.buttonIfoodStyle}
										onPress={() => {
											this._openURL(linkRecommendedDish);
										}}
									/>
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}

export default WeatherDetailScreen;
