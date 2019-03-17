import React, { Component } from 'react';
import {
	Text,
	View,
	FlatList,
	Image,
	Button,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

// Utils
import { Translate } from '../Utils/';

//Styles
import styles from './Styles/CardItemStyles';

class CardItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { weather, where, when, whatTime, onPress, keyId } = this.props;
		return (
			<View style={styles.container} key={keyId}>
				<Image
					style={styles.imageStyle}
					resizeMethod={'resize'}
					resizeMode={'contain'}
					source={Translate.weatherImage(weather)}
				/>
				<View style={styles.wrapperInfo}>
					<Text style={styles.optionTextStyle}>{'Clima: ' + weather}</Text>
					<Text style={styles.optionTextStyle}>{'Onde: ' + where}</Text>
					<Text style={styles.optionTextStyle}>{'Quando: ' + when}</Text>
					<Text style={styles.optionTextStyle}>{'Que horas: ' + whatTime}</Text>
					<View style={styles.wrapperSeeMore}>
						<TouchableOpacity
							hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
							onPress={() => onPress()}
							key={keyId}
						>
							<Text style={styles.seeMoreStyle}>{'Ver mais '}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

CardItem.defaultProps = {
	/**
	 *(PropsTypes)
	 *imageProps: Images.iconBlankStateTwo,
	 *boolProps: false,
	 *nullProps: null,
	 *stringProps: '',
	 *funcProps: () => {},
	 *numProps: 2,
	 */
	weather: '',
	where: '',
	when: '',
	whatTime: '',
	onPress: () => {},
	keyId: ''
};

CardItem.propTypes = {
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
	weather: PropTypes.string,
	where: PropTypes.string,
	when: PropTypes.string,
	whatTime: PropTypes.string,
	onPress: PropTypes.func,
	keyId: PropTypes.string
};

export default CardItem;
