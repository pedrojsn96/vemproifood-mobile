import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../Themes/';

const { buttonComponentMetrics } = Metrics;
const { buttonComponentFonts } = Fonts.style;

export default StyleSheet.create({
	...ApplicationStyles.screen,
	containerButtonAbsolute: {
		...buttonComponentMetrics.containerButton,
		position: 'absolute',
		bottom: 0,
		left: 0,
		alignItems: 'center'
	},
	containerButton: {
		...buttonComponentMetrics.containerButton,
		alignItems: 'center'
	},
	buttonStyle: {
		...buttonComponentMetrics.buttonStyle,
		backgroundColor: Colors.tomatoRed,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	buttonLabelStyle: {
		...buttonComponentFonts.buttonLabel,
		color: Colors.white
	}
});
