import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

const { mapComponentMetrics } = Metrics;

export default StyleSheet.create({
	...ApplicationStyles.screen,

	mapContainer: {
		...mapComponentMetrics.mapContainer
	}
});
