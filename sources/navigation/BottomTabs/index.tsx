import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavRoutes from "../NavRoutes";

import TabContent from "./TabContent";
import { RNHeader } from "../../common";
import { StyleSheet } from "react-native";
import { Colors, hp, isIOS, normalize, wp } from "../../theme";
import SVG from "../../constants/Svg";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Home from "@/sources/screen/Main/Home";
import Menu from "@/sources/screen/Main/Menu";
import Cart from "@/sources/screen/Main/Cart";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const truncateText = (text: string | undefined | null, maxLength: number) => {
  if (!text) return "";
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const Index = () => {
  const navigation = useNavigation();
  const customer = useSelector((state: any) => state.Auth.AsyncValue.user)

  const customerName = truncateText(customer?.name, 10);
  const LeftText = `Welcome ${customerName}!`
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Colors.Transparent,
          elevation: 0,
          borderTopWidth: 0,
          height: 0,
        },
      }}
      tabBar={(p) => <TabContent {...p} />}
    >
      <Tab.Screen
        name={NavRoutes.HOME}
        component={Home}
        options={{
          headerShown: true,
          header: () => (
            <RNHeader
              containerStyle={styles.header}
              LeftSvg={SVG.DRAWER}
              LeftText={LeftText}
              onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              RightIcon={SVG.NOTIFICATION}
              rightIconWidth={wp(10)}
              rightIconHeight={wp(10)}
              onRightPress={() => (navigation as any).navigate(NavRoutes.NOTIFICATION)}
            />
          ),
        }}
      />
      <Tab.Screen name={NavRoutes.MENU} component={Menu} />
      <Tab.Screen name={NavRoutes.CART} component={Cart} />
    </Tab.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.DarkBrown,
    paddingTop: isIOS ? hp(7) : hp(5.5),
    borderBottomLeftRadius: normalize(50),
    borderBottomRightRadius: normalize(50),
    paddingHorizontal: wp(6),
    paddingBottom: hp(2.5),
  },
});
