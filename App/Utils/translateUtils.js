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

export const weatherDesc = str => {
	switch (str) {
		case 'light rain':
			return 'Chuva leve';
			break;
		case 'few clouds':
			return 'Poucas nuvens';
			break;
		case 'clear sky':
			return 'Céu limpo';
			break;
		case 'scattered clouds':
			return 'Nuvens dispersas';
			break;
		case 'broken clouds':
			return 'Nuvens quebradas';
			break;
		case 'moderate rain':
			return 'Chuva moderada';
			break;
		default:
			return null;
	}
};

export const weatherRecommendedDish = str => {
	switch (str) {
		case 'Rain':
			return 'Pizza';
			break;
		case 'Clouds':
			return 'Hambúrguer';
			break;
		case 'Clear':
			return 'Sorvete';
			break;
		default:
			return null;
	}
};

export const weatherImgRecommendedDish = str => {
	switch (str) {
		case 'Chuvoso':
			return Images.emojiPizaa;
			break;
		case 'Nublado':
			return Images.emojiHambuger;
			break;
		case 'Céu limpo':
			return Images.emojiIceCream;
			break;
		default:
			return null;
	}
};

export const weatherLinkRecommendedDish = str => {
	switch (str) {
		case 'Rain':
			return 'https://www.ifood.com.br/busca?q=Pizza';
			break;
		case 'Clouds':
			return 'https://www.ifood.com.br/busca?q=Hamb%C3%BArguer';
			break;
		case 'Clear':
			return 'https://www.ifood.com.br/busca?q=Sorvete';
			break;
		default:
			return null;
	}
};

export default {
	weatherType,
	weatherImage,
	weatherDesc,
	weatherRecommendedDish,
	weatherImgRecommendedDish,
	weatherLinkRecommendedDish
};
