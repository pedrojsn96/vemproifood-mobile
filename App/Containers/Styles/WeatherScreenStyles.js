import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes';

const { weatherScreenMetrics } = Metrics;
const { weatherScreenFonts } = Fonts.style;

export default StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		paddingBottom: Metrics.baseMargin
	},
	wrapper: {
		flex: 1,
		backgroundColor: Colors.white
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
		height: 25,
		width: 25
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
	blankStateContainer: {
		...weatherScreenMetrics.blankStatePlacesContainer,
		alignItems: 'center',
		display: 'flex',
		flex: 1,
		justifyContent: 'center'
	},
	blankStatePlacesImage: {
		...weatherScreenMetrics.blankStatePlacesImage,
		resizeMode: 'contain'
	},
	blankStatePlacesTextContainer: {
		...weatherScreenMetrics.blankStatePlacesTextContainer
	},
	blankStatePlacesTextLine2: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	blankStatePlacesText: {
		...weatherScreenFonts.blankStatePlacesText,
		...weatherScreenMetrics.blankStatePlacesText,
		color: Colors.brownGrey,
		textAlign: 'center'
	},
	blankStatePlacesTextAccent: {
		...weatherScreenFonts.blankStatePlacesTextAccent,
		color: Colors.ceruleanBlue
	},
	blankStateButton: {
		...weatherScreenMetrics.blankStateButton,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center'
	},
	blankStateButtonText: {
		...weatherScreenFonts.placesBlankStateButtonText,
		color: Colors.white
	}
});
