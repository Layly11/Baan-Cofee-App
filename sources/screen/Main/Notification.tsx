import { RNHeader, RNStyles, RNText } from "@/sources/common";
import SVG from "@/sources/constants/Svg";
import { Colors, FontFamily, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme";
import { fetchNotifyOrderRequester } from "@/sources/utils/requestUtils";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Notification = ({ navigation, route } :any) => {
  const insets = useSafeAreaInsets();
  const [notification, setNotification] = useState<any>([])

  const fetchNoftifyOder = async () => {
    try {
        const res = await fetchNotifyOrderRequester()
        console.log("Notification: ",res.notification)
        setNotification(res.notification)
    } catch (err) {
        console.log(err)
    }
  }

  useEffect(() => {
    fetchNoftifyOder()
  },[])

  return (
    <View style={{ flex: 1 }}>
      <RNHeader
        containerStyle={styles.header}
        LeftSvg={SVG.BACK}
        title={"Notification"}
      />
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {notification.map((item:any) => (
          <View key={item.id} style={styles.addressCard}>
            <SVG.BELL />
            <View style={{ width: wp(68), gap: hp(0.5) }}>
              <View style={RNStyles.flexRowBetween}>
                <RNText family={FontFamily.Bold} >{item.title}</RNText>
                <RNText
                  size={FontSize.font14}
                  family={FontFamily.SemiBold}
                  color={Colors.Brown}
                >{item.time}</RNText>
              </View>
              <RNText
                size={FontSize.font14}
                family={FontFamily.SemiBold}
                color={Colors.Brown}
              >{item.desc}</RNText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Notification;

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
    alignItems: "center",
    backgroundColor: Colors.White,
    borderRadius: normalize(20),
    padding: wp(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    gap: wp(3),
  },
});
