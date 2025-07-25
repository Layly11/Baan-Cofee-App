import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors, FontFamily, FontSize, hp, wp} from '../theme';
import RNText from './RNText';
import RNStyles from './RNStyles';

const RNHeader = ({
  title,
  onLeftPress,
  LeftIcon,
  LeftSvg,
  LeftText,
  RightText,
  rightTextStyle,
  RightIcon,
  RightSvgs = [],
  onRightPress,
  containerStyle,
  titleStyle,
  rightIconStyle,
  rightIconWidth = wp(6),
  rightIconHeight = wp(6),
}:any) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.Container, containerStyle]}>
      {LeftIcon || LeftSvg || LeftText ? (
        <TouchableOpacity
          onPress={() => (onLeftPress ? onLeftPress() : navigation.goBack())}
          style={styles.Left}>
          {LeftSvg && <LeftSvg width={wp(10)} height={wp(10)} />}
          {LeftIcon && (
            <Image
              source={LeftIcon}
              resizeMode={'contain'}
              style={[RNStyles.image90, {marginRight: wp(2)}]}
            />
          )}
          {LeftText && <RNText style={styles.leftText}>{LeftText}</RNText>}
        </TouchableOpacity>
      ) : (
        <View style={styles.Left} />
      )}

      {title && <RNText style={[styles.title, titleStyle]}>{title}</RNText>}

      <View style={styles.RightContainer}>
        {RightText ? (
          <TouchableOpacity onPress={onRightPress}>
            <RNText style={[styles.rightText, rightTextStyle]}>
              {RightText}
            </RNText>
          </TouchableOpacity>
        ) : null}

        {RightIcon && (
          <TouchableOpacity
            onPress={onRightPress}
            style={[styles.Right, rightIconStyle]}>
            {RightIcon && (
              <RightIcon width={rightIconWidth} height={rightIconHeight} />
            )}
          </TouchableOpacity>
        )}

        {RightSvgs.map((SvgComp:any, index:any) => (
          <TouchableOpacity
            key={index}
            onPress={() => SvgComp.onPress && SvgComp.onPress()}
            style={styles.Right}>
            <SvgComp.component
              width={SvgComp.width || wp(6)}
              height={SvgComp.height || wp(6)}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    ...RNStyles.flexRowBetween,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    alignItems: 'center',
  },
  Left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSize.font23,
    fontFamily: FontFamily.Bold,
    color: Colors.White,
    paddingRight: wp(10),
  },
  RightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  Right: {
    ...RNStyles.center,
    width: wp(6),
    height: wp(6),
    marginLeft: wp(1.5),
  },
  rightText: {
    color: Colors.White,
    fontSize: FontSize.font16,
    fontFamily: FontFamily.Bold,
  },
  leftText: {
    color: Colors.White,
    fontSize: FontSize.font25,
    fontFamily: FontFamily.Bold,
    marginLeft: wp(3),
  },
});

export default RNHeader;
