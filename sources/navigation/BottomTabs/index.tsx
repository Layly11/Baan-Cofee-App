// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import NavRoutes from "../NavRoutes";

// import TabContent from "./TabContent";
// import { RNHeader } from "../../common";
// import { StyleSheet } from "react-native";
// import { Colors, hp, isIOS, normalize, wp } from "../../theme";
// import SVG from "../../constants/Svg";
// import { useNavigation, DrawerActions } from "@react-navigation/native";

// const Tab = createBottomTabNavigator();

// const Index = () => {
//   const navigation = useNavigation();

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           position: "absolute",
//           backgroundColor: Colors.Transparent,
//           elevation: 0,
//           borderTopWidth: 0,
//           height: 0,
//         },
//       }}
//       tabBar={(p) => <TabContent {...p} />}
//     >
//       <Tab.Screen
//         name={NavRoutes.HOME}
//         component={Home}
//         options={{
//           headerShown: true,
//           header: () => (
//             <RNHeader
//               containerStyle={styles.header}
//               LeftSvg={SVG.DRAWER}
//               LeftText="Good Morning!"
//               onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//               RightIcon={SVG.NOTIFICATION}
//               rightIconWidth={wp(10)}
//               rightIconHeight={wp(10)}
//               onRightPress={() => (navigation as any).navigate(NavRoutes.NOTIFICATION)}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen name={NavRoutes.MENU} component={Menu} />
//       <Tab.Screen name={NavRoutes.CART} component={Cart} />
//     </Tab.Navigator>
//   );
// };

// export default Index;

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: Colors.DarkBrown,
//     paddingTop: isIOS ? hp(7) : hp(5.5),
//     borderBottomLeftRadius: normalize(50),
//     borderBottomRightRadius: normalize(50),
//     paddingHorizontal: wp(6),
//     paddingBottom: hp(2.5),
//   },
// });
