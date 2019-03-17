import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Styles
import styles from './Styles/ButtonStyles';

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * render the Button
   * @author samuelmatias
   * @method _renderButton
   * @param none
   * @return {func} render
   */
  _renderButton = () => {
    const {
      onPress,
      isDisabled,
      buttonContainer,
      buttonStyle,
      buttonLabelStyle,
      buttonLabel,
      isAbsolute
    } = this.props;
    const {} = this.state;
    const chooseButtonStyle = isAbsolute
      ? styles.containerButtonAbsolute
      : styles.containerButton;
    return (
      <View style={[chooseButtonStyle, buttonContainer]}>
        <TouchableOpacity
          style={[styles.buttonStyle, buttonStyle]}
          onPress={() => onPress()}
          disabled={isDisabled}
        >
          <Text style={[styles.buttonLabelStyle, buttonLabelStyle]}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return this._renderButton();
  }
}

Button.defaultProps = {
  /**
   *(PropsTypes)
   *imageProps: Images.iconBlankStateTwo,
   *boolProps: false,
   *nullProps: null,
   *stringProps: '',
   *funcProps: () => {},
   *numProps: 2,
   */
  onPress: () => {},
  isDisabled: false,
  buttonContainer: styles.containerButton,
  buttonStyle: styles.buttonStyle,
  buttonLabelStyle: styles.buttonLabelStyle,
  buttonLabel: 'Enter',
  isAbsolute: false
};

Button.propTypes = {
  /**
   *(used for some props with any type)
   *  anyType: PropTypes.any
   *(used to boolean props)
   *  boolType: PropTypes.bool
   *(used to stirng props)
   *  stringType: PropTypes.string
   *(user to number props)
   *  numberProps: PropTypes.number
   *(used to func props (onPress, overlay, etc.))
   *  funcType: PropTypes.func
   *(used to styles props)
   *  objectType: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ])
   *(used to images(url/images on project))
   *  imageType: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
   */
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  buttonContainer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  buttonStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  buttonLabelStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  buttonLabel: PropTypes.string,
  isAbsolute: PropTypes.bool
};

export default Button;
