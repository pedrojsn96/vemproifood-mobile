import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import MapView, { Marker } from 'react-native-maps';

import styles from './Styles/MapStyles';

import { Images } from '../Themes/';

const LATITUDEDELTA = 0.005;
const LONGITUDEDELTA = 0.005;
class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			moveToUserLocation: true,
			region: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: LATITUDEDELTA,
				longitudeDelta: LONGITUDEDELTA
			}
		};
	}

	componentWillReceiveProps(nextProps) {
		const { lat, long } = this.props;
		this.setState({
			region: {
				latitude: parseFloat(lat),
				longitude: parseFloat(long),
				latitudeDelta: LATITUDEDELTA,
				longitudeDelta: LONGITUDEDELTA
			}
		});
	}

	_renderMap = () => {
		const { region } = this.state;
		const { lat, long, request, place, weather } = this.props;
		const doubleCheck =
			!request && region.latitude && region.longitude ? true : false;
		const placeName = place ? place : 'Não informado.';
		const placeWeather = weather
			? 'Clima: ' + weather
			: 'Clima: Não informado.';
		return (
			<View style={styles.mapContainer}>
				{doubleCheck && (
					<MapView
						ref={ref => (this.map = ref)}
						showsUserLocation
						region={region}
						onRegionChange={this.onRegionChange}
						style={{ width: '100%', height: '100%' }}
						loadingEnabled={true}
						loadingIndicatorColor="#666666"
						loadingBackgroundColor="#eeeeee"
						moveOnMarkerPress={false}
					>
						<Marker
							onPress={() => {}}
							coordinate={{
								latitude: parseFloat(lat),
								longitude: parseFloat(long)
							}}
							title={placeName}
							description={placeWeather}
						/>
					</MapView>
				)}
			</View>
		);
	};

	render() {
		return this._renderMap();
	}
}

Map.defaultProps = {
	/**
	 *(PropsTypes)
	 *imageProps: Images.iconBlankStateTwo,
	 *boolProps: false,
	 *nullProps: null,
	 *stringProps: '',
	 *funcProps: () => {},
	 *numProps: 2,
	 */
	lat: '37,785834',
	long: '-122,406417',
	request: true,
	nearby: [],
	place: '',
	weather: ''
};

Map.propTypes = {
	/**
   *(used for some props with any type)
   *  anyType: PropTypes.any
   *(used to boolean props)
   *  boolType: PropTypes.bool
   *(used to stirng props)
   *  stringType: PropTypes.string
   *(user to number props)
   *  numberProps: PropTypes.number
   *(used to func props (onPress, overlay, etc.))
   *  funcType: PropTypes.func
   *(used to styles props)
   *  objectType: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ])
   *(used to images(url/images on project))
   *  imageType: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
   */
	lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	long: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	request: PropTypes.bool,
	nearby: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	place: PropTypes.string,
	weather: PropTypes.string
};

export default Map;
