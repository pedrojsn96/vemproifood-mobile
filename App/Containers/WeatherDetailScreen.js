import React, { Component } from 'react';
import { ScrollView, Text, Image, View, FlatList } from 'react-native';

// Themes
import { Images } from '../Themes';

// External Libs
import axios from 'axios';
import moment from 'moment';

// Components
import { CardItem } from '../Components/';
import { SpinnerOverlay } from '../Components/Common';

// Utils
import { Translate } from '../Utils/';

// Styles
import styles from './Styles/WeatherScreenStyles';

class WeatherScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: <Text style={styles.headerLabelStyle}>{'Clima'}</Text>,
		headerLeft: (
			<TouchableOpacity
				style={styles.wrapperHeaderLeft}
				onPress={() => {
					navigation.goBack();
				}}
			>
				<Image
					style={styles.iconHeader}
					source={Images.iconArrowLeft}
					resizeMode={'contain'}
				/>
			</TouchableOpacity>
		)
	});

	constructor(props) {
		super(props);

		this.state = {
			openWeather: null
		};
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		const { openWeather } = this.state;
		if (!openWeather) {
			return <SpinnerOverlay visible={true} />;
		} else {
			const { city, list } = openWeather;
			const { name } = city;
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
									onPress={() => {}}
									// handleNaviagation={this.handleNaviagation}
								/>
							);
						}}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			);
		}
	}
}

export default WeatherScreen;
