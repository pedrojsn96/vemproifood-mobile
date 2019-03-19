import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/';

const { profileScreenMetrics } = Metrics;
const { profileScreenFonts } = Fonts.style;

export default StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		paddingBottom: Metrics.baseMargin
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
	},
	//
	header: {
		...profileScreenMetrics.header,
		backgroundColor: Colors.tomatoRed
	},
	avatarContent: {
		...profileScreenMetrics.avatarContent,
		alignSelf: 'center',
		position: 'absolute',
		borderColor: Colors.white
	},
	bodyContent: {
		...profileScreenMetrics.bodyContent,
		flex: 1,
		alignItems: 'center'
	},
	textNameStyle: {
		...profileScreenFonts.textNameStyle,
		color: Colors.dark
	},
	wrapperEmail: {
		...profileScreenMetrics.wrapperEmail
	},
	textEmailStyle: {
		...profileScreenFonts.textEmailStyle,
		color: Colors.brownGrey
	},
	logoutContent: {
		...profileScreenMetrics.logoutContent
	},
	centered: {
		alignItems: 'center'
	}
});
