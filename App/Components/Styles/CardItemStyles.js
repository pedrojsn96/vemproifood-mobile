import { StyleSheet, Platform } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes';

const { cardItemComponentMetrics } = Metrics;
const { cardItemComponentFonts } = Fonts.style;

export default StyleSheet.create({
	container: {
		...cardItemComponentMetrics.container
	},
	imageStyle: {
		...cardItemComponentMetrics.imageStyle,
		backgroundColor: Colors.steel,
		flex: 1,
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center'
	},
	wrapperInfo: {
		...cardItemComponentMetrics.wrapperInfo,
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: Colors.opacity
	},
	optionTextStyle: {
		...cardItemComponentFonts.optionTextStyle,
		color: Colors.white
	},
	wrapperSeeMore: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},
	seeMoreStyle: {
		...cardItemComponentFonts.seeMoreStyle,
		color: Colors.white
	}
});
