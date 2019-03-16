import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputCustom: {
		height: 50,
		backgroundColor: '#fff',
		marginHorizontal: 10,
		marginVertical: 5,
		// paddingVertical: 5,
		// paddingHorizontal: 15,
		width: window.width - 30
	},
	logo: {
		height: IMAGE_HEIGHT,
		resizeMode: 'contain',
		marginBottom: 20,
		padding: 10,
		marginTop: 20
	},
	register: {
		marginBottom: 20,
		width: window.width - 100,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		backgroundColor: '#ffae'
	},
	// keyboard: {
	// 	marginBottom: 20
	// },
	// containerKeyboard: {
	// 	flex: 1,
	// 	alignItems: 'center',
	// 	flexDirection: 'column',
	// 	justifyContent: 'space-between'
	// },
	keybordForm: {
		// paddingTop: 24,
		paddingHorizontal: 16
	},
	keyboardGroup: {
		backgroundColor: Colors.white,
		width: Metrics.screenWidth - 32,
		// paddingBottom: 9,
		paddingHorizontal: 16,
		marginBottom: 16,
		alignItems: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	keyboardLast: {
		marginBottom: 16
	},
	keyboardAction: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	keyboardNotAccess: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		position: 'absolute',
		bottom: 20
	},
	keyboardNotAccessText: {
		textAlign: 'center',
		fontSize: 13,
		color: '#031f5e'
	},
	keyboardWave: {
		width: Metrics.screenWidth,
		height: 88
	},
	icon: {
		width: 24,
		height: 24,
		marginRight: 14,
		marginTop: 30
	},
	input: {
		width: Metrics.screenWidth - 104,
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
		marginBottom: 0,
		marginTop: 0
	},
	buttonRecoverPassword: {
		marginRight: 37
	},
	buttonRecoverPasswordText: {
		fontWeight: 'bold',
		fontSize: 13,
		color: Colors.grayAccent
	},
	buttonLogIn: {
		borderRadius: 25,
		borderWidth: 1,
		borderColor: Colors.purpleAccent,
		backgroundColor: Colors.purpleAccent,
		flex: 1,
		height: 53,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 0,
		paddingLeft: 0,
		paddingRight: 0,
		paddingBottom: 0,
		marginVertical: 0
	},
	buttonLogInDisabled: {
		borderRadius: 26.5,
		borderWidth: 1,
		borderColor: '#cecece',
		backgroundColor: '#cecece',
		flex: 1,
		height: 53,
		paddingTop: 0,
		paddingLeft: 0,
		paddingRight: 0,
		paddingBottom: 0,
		marginVertical: 0
	},
	buttonRegisteredLabel: {
		fontWeight: 'bold',
		fontSize: 13,
		color: '#fff'
	},
	buttonRegistered: {
		borderRadius: 25,
		borderWidth: 2,
		borderColor: Colors.purpleAccent,
		backgroundColor: Colors.purpleAccent,
		width: Metrics.screenWidth - 32,
		height: 53,
		marginTop: 16,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	buttonLogInLabel: {
		fontWeight: 'bold',
		fontSize: 13,
		color: '#fff'
	},
	inputAccessory: {
		width: 30,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
