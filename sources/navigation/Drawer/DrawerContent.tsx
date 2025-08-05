import { RNButton, RNImage, RNStyles, RNText } from "@/sources/common";
import SVG from "@/sources/constants/Svg";
import { Colors, FontFamily, FontSize, hp, normalize, wp } from "@/sources/theme";
import { Pressable, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NavRoutes from "../NavRoutes";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import ConfirmModal from "@/sources/component/ConfirmModal";
import { clearAuthData } from "@/sources/utils/auth";
import { useDispatch } from "react-redux";
import { onAuthChange, setAsyncStorageValue } from "@/sources/redux/Reducers/AuthReducers";

const DrawerContent = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const handleNavigate = (route: any, params = {}) => {
        navigation.navigate(route, params);
        navigation.closeDrawer();
    };

    const profile = {
        name: "John Robert",
        phone: "+111 854 8745",
        profile_img: "https://randomuser.me/api/portraits/men/32.jpg",
        email: "john@gmail.com",
    };
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
                    onPress={() => navigation.navigate(NavRoutes.EDIT_PROFILE, { profile })}
                />
            </View>

            <View style={styles.profileContainer}>
                <RNImage source={{ uri: profile.profile_img }} style={styles.avatar} />
                <RNText
                    size={FontSize.font20}
                    family={FontFamily.Bold}
                >{profile.name}</RNText>
                <RNText family={FontFamily.SemiBold} >{profile.phone}</RNText>
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