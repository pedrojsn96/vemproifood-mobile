import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { Images } from '../Themes';

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

		this.state = {};
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image
					source={Images.background}
					style={styles.backgroundImage}
					resizeMode="stretch"
				/>
				<ScrollView style={styles.container}>
					<View style={styles.centered}>
						<Image source={Images.launch} style={styles.logo} />
					</View>

					<View style={styles.section} />
				</ScrollView>
			</View>
		);
	}
}

export default ProfileScreen;
