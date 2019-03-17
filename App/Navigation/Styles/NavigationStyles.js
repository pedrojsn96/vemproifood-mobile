import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes';

export default StyleSheet.create({
	tabBarLabel: {
		...Fonts.style.tabBarLabel,
		...Metrics.tabBarLabel
	},
	tabBarItem: {
		alignItems: 'center',
		display: 'flex',
		flex: 1,
		flexDirection: 'column'
	},
	tabBar: {
		...Metrics.tabBar,
		backgroundColor: Colors.paleGrey_0_95
	},
	headerStyle: {
		backgroundColor: Colors.bloodOrange,
		elevation: 2
	},
	tabBarItemImage: {
		resizeMode: 'contain'
	}
});
