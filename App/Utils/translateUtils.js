import { Images } from '../Themes/';
export const weatherType = str => {
	switch (str) {
		case 'Rain':
			return 'Chuvoso';
			break;
		case 'Clouds':
			return 'Nublado';
			break;
		case 'Clear':
			return 'Céu limpo';
			break;
		default:
			return null;
	}
};

export const weatherImage = str => {
	switch (str) {
		case 'Chuvoso':
			return Images.emojiRain;
			break;
		case 'Nublado':
			return Images.emojiClouds;
			break;
		case 'Céu limpo':
			return Images.emojiClear;
			break;
		default:
			return null;
	}
};

export default {
	weatherType,
	weatherImage
};
