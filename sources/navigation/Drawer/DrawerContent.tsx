import { RNButton, RNImage, RNStyles, RNText } from "@/sources/common";
import ConfirmModal from "@/sources/component/ConfirmModal";
import SVG from "@/sources/constants/Svg";
import { onAuthChange, setAsyncStorageValue } from "@/sources/redux/Reducers/AuthReducers";
import { Colors, FontFamily, FontSize, hp, normalize, wp } from "@/sources/theme";
import { clearAuthData } from "@/sources/utils/auth";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import NavRoutes from "../NavRoutes";

const DrawerContent = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);
    // const [profile, setProfile] = useState({}) as any
    const dispatch = useDispatch();
    const customer = useSelector((state: any) => state.Auth.AsyncValue.user)
    const handleNavigate = (route: any, params = {}) => {
        navigation.navigate(route, params);
        navigation.closeDrawer();
    }

    return (
        <View
            style={[
                styles.container,
                { paddingTop: insets.top, paddingBottom: insets.bottom },
            ]}
        >
            <View style={RNStyles.flexRowBetween}>
                <SVG.ADD
                    width={wp(8)}
                    height={wp(8)}
                    style={{
                        transform: [{ rotate: "135deg" }],
                    }}
                    onPress={() => navigation.navigate("BottomTabs")}
                />
                <RNText
                    size={FontSize.font20}
                    family={FontFamily.Black}
                >
                    My Profile
                </RNText>
                <SVG.EDIT
                    onPress={() => navigation.navigate(NavRoutes.EDIT_PROFILE, { profile: customer })}
                />
            </View>

            <View style={styles.profileContainer}>
                {customer?.profile_img ? (
                    <RNImage source={{ uri: customer.profile_img }} style={styles.avatar} />
                )
                    : (
                        <SVG.PROFILE width={wp(20)} height={wp(20)} style={styles.avatar} />
                    )
                }
                <RNText
                    size={FontSize.font20}
                    family={FontFamily.Bold}
                >{customer?.name}</RNText>
                <RNText family={FontFamily.SemiBold} >{customer?.phone}</RNText>
            </View>

            <ScrollView>
                {[
                    {
                        label: "My Addresses",
                        route: NavRoutes.ADDRESS,
                        params: { fromDrawer: true },
                    },
                    {
                        label: "Track Order",
                        route: NavRoutes.TRACK_ORDER,
                        params: { fromDrawer: true },
                    },
                    {
                        label: "Order History",
                        route: NavRoutes.ORDER_HISTORY,
                        params: { fromDrawer: true },
                    },
                    {
                        label: "Terms & Conditions",
                        route: NavRoutes.TERMS,
                        params: { fromDrawer: true },
                    },
                    {
                        label: "Contact Us",
                        route: NavRoutes.CONTACT_US,
                        params: { fromDrawer: true },
                    },
                ].map((item: any, index: any) => (
                    <Pressable
                        key={index}
                        style={styles.menuItem}
                        onPress={() => handleNavigate(item.route, item.params)}
                    >
                        <RNText
                            family={FontFamily.SemiBold}
                            size={FontSize.font15}
                        >{item.label}</RNText>
                        <SVG.RIGHT />
                    </Pressable>
                ))}
            </ScrollView>

            <RNButton
                title={"Logout"}
                onPress={() => setModalVisible(true)}
                style={{ marginBottom: hp(2) }}
            />

            <ConfirmModal
                visible={modalVisible}
                onConfirm={() => {
                    setModalVisible(false);
                    dispatch(onAuthChange(false))
                    dispatch(setAsyncStorageValue({}));
                    clearAuthData()
                }}
                onCancel={() => setModalVisible(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        borderTopRightRadius: normalize(50),
        borderBottomRightRadius: normalize(50),
        gap: hp(2),
        paddingVertical: hp(3),
    },
    profileContainer: {
        alignItems: "center",
        gap: hp(0.5),
    },
    avatar: {
        height: wp(20),
        width: wp(20),
        borderRadius: normalize(50),
        backgroundColor: Colors.Beige,
    },
    menuItem: {
        ...RNStyles.flexRowBetween,
        backgroundColor: Colors.Beige,
        paddingHorizontal: wp(5),
        paddingVertical: hp(1.8),
        borderRadius: normalize(50),
        marginVertical: hp(1),
    },
});

export default DrawerContent;