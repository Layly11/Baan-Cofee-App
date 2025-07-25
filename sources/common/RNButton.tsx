import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors, FontFamily, FontSize, hp, normalize, wp} from '../theme';
import RNStyles from './RNStyles';
import RNText from './RNText';

const RNButton = ({
  title,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  onPress,
  disable,
}:any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disable}
      style={[styles.Container, style]}>
      <View style={styles.content}>
        {icon && iconPosition === 'left' && (
          <View style={styles.icon}>{icon}</View>
        )}
        {title && (
          <RNText style={[styles.buttonText, textStyle]}>{title}</RNText>
        )}
        {icon && iconPosition === 'right' && (
          <View style={styles.icon}>{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    ...RNStyles.center,
    width: wp(50),
    alignSelf: 'center',
    backgroundColor: Colors.DarkBrown,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: normalize(50),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: wp(1.5),
  },
  buttonText: {
    fontSize: FontSize.font16,
    fontFamily: FontFamily.SemiBold,
    color: Colors.White,
  },
});

export default RNButton;
