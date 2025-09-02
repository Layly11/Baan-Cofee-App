import { RNButton, RNHeader, RNImage, RNStyles, RNText } from "@/sources/common";
import { Colors, FontFamily, FontSize, hp, wp, normalize, isIOS } from "@/sources/theme";
import { NavRoutes } from "@/sources/navigation";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PaymentSuccess = ({ navigation, route }: any) => {
    const insets = useSafeAreaInsets();
    // const { amount } = route.params; 

    return (
        <View style={styles.root}>
            <RNHeader
                containerStyle={styles.header}
                LeftText="Payment"
                fontFamily={FontFamily.Bold}
            />
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <RNImage
                    source={require("../../assets/Images/credit-card.png")} // รูป local asset
                    style={styles.successImage}
                    resizeMode="contain"
                />
                <RNText size={FontSize.font22} family={FontFamily.Black} color={Colors.Brown}>
                    Payment Successful!
                </RNText>
                <RNText size={FontSize.font16} color={Colors.Brown} style={{ marginTop: hp(1) }}>
                    You have paid ??
                </RNText>
                <RNButton
                    title="Go to Home"
                    onPress={() => navigation.navigate('Drawer', {
                        screen: 'BottomTabs',
                        params: {
                            screen: NavRoutes.HOME,
                        },
                    })}
                    style={{ marginTop: hp(3) }}
                />
                <RNButton
                    title="View Orders"
                    onPress={() => navigation.navigate(NavRoutes.ORDER_HISTORY)}
                    style={{ marginTop: hp(2) }}
                    type="secondary"
                />
            </View>
        </View>
    );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    header: {
        backgroundColor: Colors.DarkBrown,
        paddingTop: isIOS ? hp(7) : hp(5),
        paddingBottom: hp(2.5),
        paddingHorizontal: wp(6),
        borderBottomLeftRadius: normalize(50),
        borderBottomRightRadius: normalize(50),
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp(5),
        gap: hp(2),
    },
    successImage: {
        width: wp(40),
        height: wp(40),
        marginBottom: hp(2),
    },
});
