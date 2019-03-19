import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes';

const { weatherDetailScreenMetrics } = Metrics;
const { weatherDetailScreenFonts } = Fonts.style;

export default StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		flex: 1,
		backgroundColor: Colors.white
	},
	wrapper: {
		flex: 1,
		backgroundColor: Colors.white
	},
	rowStyle: {
		...weatherDetailScreenFonts.rowStyle,
		color: Colors.blackGray
	},
	iconHeader: {
		height: 25,
		width: 25
	},
	rowFoodStyle: {
		...weatherDetailScreenFonts.rowFoodStyle,
		color: Colors.blackGray
	},
	marginBetweenRows: {
		...weatherDetailScreenMetrics.marginBetweenRows
	},
	rowBlackStyle: {
		...weatherDetailScreenFonts.rowBlackStyle,
		color: Colors.dark
	},
	wrapperMap: {
		...weatherDetailScreenMetrics.wrapperMap
	},
	wrapperDetails: {
		flex: 1,
		...weatherDetailScreenMetrics.wrapperDetails
	},
	sectionTitle: {
		...weatherDetailScreenMetrics.sectionTitle,
		...weatherDetailScreenFonts.sectionTitle,
		color: Colors.lightNavy
	},
	wrapperInfo: {
		...weatherDetailScreenMetrics.wrapperInfo,
		flex: 1
	},
	wrapperFood: {
		...weatherDetailScreenMetrics.marginBetweenRows,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	foodStyle: {
		...weatherDetailScreenMetrics.foodStyle
	},
	foodIceStyle: {
		...weatherDetailScreenMetrics.foodIceStyle
	},
	wrapperFoodImg: {
		...weatherDetailScreenMetrics.wrapperFoodImg
	},
	wrapperButton: {
		...weatherDetailScreenMetrics.wrapperButton,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonIfoodStyle: {
		...weatherDetailScreenMetrics.buttonIfoodStyle
	},
	wrapperHeaderRight: {
		marginRight: 16
	}
});
