import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		paddingBottom: Metrics.baseMargin
	},
	wrapper: {
		width: '100%'
		// marginTop: 8,
		// marginBottom: 8
	},
	logo: {
		marginTop: Metrics.doubleSection,
		height: Metrics.images.logo,
		width: Metrics.images.logo,
		resizeMode: 'contain'
	},
	centered: {
		alignItems: 'center'
	},

	iconHeader: {
		height: 20,
		width: 20
	},
	wrapperTabBarLabel: {
		marginTop: 15
	},
	label: {
		textAlign: 'center',
		fontSize: 10
	},
	wrapperItem: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		margin: 16
	},
	headerLabelStyle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff'
	},
	wrapperHeaderLeft: {
		marginLeft: 16
	},
	wrapperHeaderRight: {
		marginRight: 16
	}
});
