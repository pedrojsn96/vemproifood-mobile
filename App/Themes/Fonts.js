import { Platform, PixelRatio, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();
const vw = width / 100;

const sizeNormalize = size => {
	if (Platform.OS === 'ios') {
		if (pixelRatio === 2 && vw === 3.2) {
			// 5, SE
			return size * 1;
		} else if (pixelRatio === 2 && vw === 3.75) {
			// 6, 7, 8, // XR
			return size * 1.1;
		} else if (pixelRatio === 2 && vw === 4.14) {
			// XR
			return size * 1.3;
		} else if (pixelRatio === 3 && vw === 4.14) {
			// 6, 7, 8 plus
			return size * 1.3;
		} else if (pixelRatio === 3 && vw === 3.75) {
			// X, XS
			return size * 1.2;
		} else if (pixelRatio === 3 && vw === 4.14) {
			// XS Max
			return size * 1.3;
		} else {
			return size * 1;
		}
	} else {
		if (pixelRatio <= 1) {
			return size * 0.9;
		} else if (pixelRatio <= 1.5) {
			return size * 1;
		} else if (pixelRatio <= 2) {
			return size * 1.1;
		} else if (pixelRatio <= 3) {
			return size * 1.2;
		} else if (pixelRatio <= 3.5) {
			return size * 1.3;
		} else {
			return size * 1.1;
		}
	}
};

const lineHeight = size => {
	return Platform.select({
		ios: sizeNormalize(size),
		android: parseInt(sizeNormalize(size))
	});
};

const type = {
	...Platform.select({
		ios: {
			avenir: {
				light: 'Avenir-Light',
				roman: 'Avenir-Roman',
				medium: 'Avenir-Medium',
				book: 'Avenir-Book',
				black: 'Avenir-Black',
				heavy: 'Avenir-Heavy'
			}
		},
		android: {
			avenir: {
				light: 'AvenirLTStd-Light',
				roman: 'AvenirLTStd-Roman',
				medium: 'AvenirLTStd-Medium',
				book: 'AvenirLTStd-Book',
				black: 'AvenirLTStd-Black',
				heavy: 'AvenirLTStd-Heavy'
			}
		}
	})
};

const size = {
	h5: sizeNormalize(22),
	h6: sizeNormalize(18),
	h7: sizeNormalize(17),
	regular: sizeNormalize(16),
	regularMinus: sizeNormalize(15),
	medium: sizeNormalize(14),
	mediumMinus: sizeNormalize(13),
	small: sizeNormalize(12),
	smallMinus: sizeNormalize(11),
	tiny: sizeNormalize(10)
};

const style = {
	headerTitle: {
		fontFamily: type.avenir.heavy,
		fontSize: size.h6
	},
	/**
	 * exampleScreenFonts
	 */
	exampleScreenFonts: {
		fontFamily: type.avenir.book,
		fontSize: size.medium,
		lineHeight: lineHeight(20)
	},
	/**
	 * cardItemComponentFonts
	 */
	cardItemComponentFonts: {
		optionTextStyle: {
			fontFamily: type.avenir.book,
			fontSize: size.regular
		},
		seeMoreStyle: {
			fontFamily: type.avenir.heavy,
			fontSize: size.regular
		}
	},
	/**
	 * weatherDetailScreenFonts
	 */
	weatherDetailScreenFonts: {
		rowStyle: {
			fontFamily: type.avenir.roman,
			fontSize: size.regular
		},
		rowFoodStyle: {
			fontFamily: type.avenir.roman,
			fontSize: size.h5
		},
		rowBlackStyle: {
			fontFamily: type.avenir.heavy,
			fontSize: size.h6,
			lineHeight: lineHeight(25)
		},
		sectionTitle: {
			fontFamily: type.avenir.heavy,
			fontSize: size.regularMinus
		}
	},
	/**
	 * buttonComponentFonts
	 */
	buttonComponentFonts: {
		buttonLabel: {
			fontFamily: type.avenir.heavy,
			fontSize: size.medium
		}
	}
};

export default {
	type,
	size,
	style,
	lineHeight
};
