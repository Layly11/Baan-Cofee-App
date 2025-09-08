import { RNButton, RNHeader, RNImage, RNStyles, RNText } from "@/sources/common";
import SVG from "@/sources/constants/Svg";
import { NavRoutes } from "@/sources/navigation";
import { Colors, FontFamily, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme";
import { fetchOrderHistoryRequester } from "@/sources/utils/requestUtils";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OrderHistory = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const [OrderHistory, setOrderHistory] = useState([])
  const fetchOrderHistory = async () => {
    try {
      const res = await fetchOrderHistoryRequester()
      setOrderHistory(res.orderHistory)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchOrderHistory()
  }, [])
  
  

  return (
    <View style={{ flex: 1 }}>
      <RNHeader
        containerStyle={styles.header}
        LeftSvg={SVG.BACK}
        onLeftPress={() => {
          if (route?.params?.fromDrawer) {
            navigation.openDrawer();
          } else {
            navigation.goBack();
          }
        }}
        title={"Order History"}
      />

        {OrderHistory.length === 0 
        ? (

          <View style={[styles.container, RNStyles.center]}>
          <SVG.EMPTY_BOX width={wp(40)} height={wp(40)} />
          <RNText
            size={FontSize.font20}
            family={FontFamily.Bold}
            color={Colors.Brown}
            style={{ marginTop: hp(2) }}
          >
            No Order History
          </RNText>
          <RNText size={FontSize.font14} color={Colors.Placeholder}>
            You have not placed any orders yet.
          </RNText>
          <View style={{ marginTop: hp(2) }}>
            <RNButton
              title="Go Shopping"
              onPress={() => navigation.navigate(NavRoutes.HOME)}
            />
          </View>
        </View>
        ) 
        : (
          <ScrollView style={[styles.container, { paddingBottom: insets.bottom }]}>
        {OrderHistory.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate(NavRoutes.TRACK_ORDER, { orderId: item.orderID })}
          >
            <View key={item.id} style={styles.addressCard}>
              <View style={styles.imageContainer}>
                <View style={styles.imageBackground} />
                <RNImage source={{ uri: item.imageSource }} style={styles.image} />
              </View>
              <View style={{ width: wp(55), gap: hp(0.8) }}>
                <View style={RNStyles.flexRowBetween}>
                  <RNText
                    size={FontSize.font14}
                    family={FontFamily.Black}
                    color={Colors.Brown}
                  >{item.size}</RNText>
                  <RNText
                    size={FontSize.font14}
                    family={FontFamily.Black}
                    color={Colors.Brown}
                  >{item.orderID}</RNText>
                </View>
                <RNText
                  size={FontSize.font18}
                  family={FontFamily.Black}
                >{item.name}</RNText>
                <RNText
                  size={FontSize.font14}
                  color={Colors.Brown}
                >{item.description}</RNText>
                <View style={RNStyles.flexRowBetween}>
                  <RNText size={FontSize.font14} family={FontFamily.Bold}>
                    Order on :{" "}
                    <RNText
                      color={Colors.Brown}
                      size={FontSize.font14}
                      family={FontFamily.Bold}
                    >{item.time}</RNText>
                  </RNText>
                  <RNText
                    size={FontSize.font18}
                    family={FontFamily.Black}
                  >{item.price}</RNText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
        )}
    </View>
  )
}

export default OrderHistory;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.DarkBrown,
    paddingTop: isIOS ? hp(7) : hp(5),
    borderBottomLeftRadius: normalize(50),
    borderBottomRightRadius: normalize(50),
    paddingHorizontal: wp(6),
    paddingBottom: hp(2.5),
  },
  container: {
    flex: 1,
    padding: wp(5),
    gap: hp(1.5),
    backgroundColor: Colors.White,
  },
  addressCard: {
    ...RNStyles.flexRow,
    backgroundColor: Colors.White,
    borderRadius: normalize(20),
    padding: wp(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    gap: hp(1),
    marginBottom: hp(2)
  },
  deleteButton: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageContainer: {
    ...RNStyles.center,
    width: wp(28),
    height: wp(30),
    backgroundColor: Colors.Beige,
    borderRadius: normalize(20),
    overflow: "hidden",
  },
  imageBackground: {
    position: "absolute",
    bottom: hp(-14),
    left: wp(-4),
    right: 0,
    width: wp(36),
    height: hp(20),
    borderRadius: normalize(100),
    backgroundColor: Colors.Brown,
  },
  image: {
    width: wp(27),
    height: wp(27),
  },
});
