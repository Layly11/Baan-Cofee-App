import React from "react";
import { StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, hp, isIOS, normalize, wp } from "../../theme";
import SVG from "../../constants/Svg";
import { RNStyles } from "../../common";

const TabContent = ({ state, navigation }: any) => {
  const insets = useSafeAreaInsets();

  const ICONS = [
    { active: <SVG.HOME />, offset: wp(12) },
    { active: <SVG.MENU />, offset: wp(-7.5) },
    { active: <SVG.CART />, offset: wp(-11) },
  ];

  const CURVE_ICONS = [
    <SVG.HOME_CURVE key={'Home'} style={styles.curveSvg} width={wp(96)} />,
    <SVG.MENU_CURVE key={'Curve'} style={styles.curveSvg} width={wp(96)} />,
    <SVG.CART_CURVE key={'Cart'} style={styles.curveSvg} width={wp(96)} />,
  ];

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: insets.bottom,
          bottom: insets.bottom,
        },
      ]}
    >
      {CURVE_ICONS[state.index]}
      <View style={styles.row}>
        {state.routes.map((route: any, index: any) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View key={index}>
              {isFocused ? (
                <View
                  style={[styles.curveContainer, { left: ICONS[index].offset }]}
                >
                  <TouchableOpacity
                    onPress={onPress}
                    style={styles.focusedIcon}
                  >
                    {ICONS[index].active}
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={onPress} style={styles.iconButton}>
                  {ICONS[index].active}
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: wp(2),
    right: wp(2),
    borderRadius: normalize(15),
    backgroundColor: Colors.Transparent,
    paddingHorizontal: wp(4),
  },
  curveSvg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  row: {
    ...RNStyles.flexRowEvenly,
    gap: wp(7),
  },
  curveContainer: {
    ...RNStyles.center,
    position: "absolute",
    bottom: hp(-3.5),
    zIndex: 2,
  },
  focusedIcon: {
    ...RNStyles.center,
    width: wp(14),
    height: wp(14),
    backgroundColor: Colors.DarkBrown,
    borderRadius: wp(8),
  },
  iconButton: {
    ...RNStyles.center,
    top: hp(2),
  },
});

export default TabContent;
