import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';

import { Colors } from '../../Themes/';

class LoadingSpinner extends Component {
	render() {
		const {
			color,
			size,
			backgroundColor,
			text,
			textColor,
			textSize,
			contentContainerStyle
		} = this.props;
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: backgroundColor,
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					...contentContainerStyle
				}}
			>
				<ActivityIndicator
					color={color}
					size={size}
					style={{ marginBottom: 10 }}
				/>
				<Text
					style={{
						color: textColor,
						fontSize: textSize
					}}
				>
					{text}
				</Text>
			</View>
		);
	}
}

LoadingSpinner.defaultProps = {
	color: Platform.OS === 'android' ? Colors.tomatoRed : Colors.brownGrey,
	size: 'large',
	backgroundColor: 'transparent',
	textColor: Platform.OS === 'android' ? Colors.tomatoRed : Colors.brownGrey,
	textSize: 18,
	contentContainerStyle: []
};

export default LoadingSpinner;
