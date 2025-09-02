import { RNButton, RNHeader, RNStyles, RNText } from "@/sources/common";
import SVG from "@/sources/constants/Svg";
import { NavRoutes } from "@/sources/navigation";
import { Colors, FontFamily, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme";
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAddressBySelectedRequester, fetchAddressRequester, PaymentRequester } from "@/sources/utils/requestUtils";
import { useFocusEffect } from "@react-navigation/native";


const fullPaymentOptions = [
    { id: "credit", label: "Credit Card" },
    { id: "qr", label: "QR Payment" },

];
const Payment = ({ navigation, route }: any) => {
    const [selectedMethod, setSelectedMethod] = useState("credit")
    const insets = useSafeAreaInsets();
    const [selectedAddress, setSelectedAddress] = useState(route.params?.selectedAddress || null);
    const [loading, setLoading] = useState(false);

    const { amount, product } = route.params


    const fetchAddress = async () => {
        try {
            const storeId = await AsyncStorage.getItem('selectedAddressId')
            if (storeId) {
                const res = await fetchAddressBySelectedRequester(storeId)
                setSelectedAddress(res.data.address)
            } else {
                setSelectedAddress(null)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handlePayment = async () => {
        if (!selectedAddress) {
            Alert.alert("Address Required", "Please Select Your Address or Add New Address")
            return
        }

        setLoading(true)

        try {
            const res = await PaymentRequester({amount, selectedMethod, product})

            console.log("Redirect URL: ", res.redirect_url)

            navigation.replace(NavRoutes.PAYMENT_WEB_VIEW, { url: res.redirect_url })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAddress()
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchAddress()

            return () => {
            };
        }, [])
    );


        if (loading) {
            return (
                <View style={[styles.root, RNStyles.center]}>
                    <ActivityIndicator size="large" color={Colors.Brown} />
                    <RNText style={{ marginTop: 10, color: Colors.Brown }}>
                        Loading...
                    </RNText>
                </View>
            )
        }

    return (
        <View style={{ flex: 1 }}>
            <RNHeader
                containerStyle={styles.header}
                LeftSvg={SVG.BACK}
                title="Payment"
                fontFamily={FontFamily.Bold}
            />
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <ScrollView>
                    {fullPaymentOptions.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.option}
                            onPress={() => setSelectedMethod(item.id)}>
                            <View style={{ ...RNStyles.flexRowCenter, gap: wp(3) }}>
                                {/* <item.icon width={wp(6)} height={wp(6)} /> */}
                                <RNText family={FontFamily.SemiBold} >{item.label}</RNText>
                            </View>
                            <View
                                style={[
                                    styles.radioOuter,
                                    {
                                        backgroundColor:
                                            selectedMethod === item.id
                                                ? Colors.DarkBrown
                                                : Colors.White,
                                    },
                                ]}
                            >
                                <View style={[styles.radioInner]} />
                            </View>
                        </TouchableOpacity>
                    ))}

                    <View style={{ gap: hp(2) }}>
                        <TouchableOpacity onPress={() => navigation.navigate(NavRoutes.ADDRESS)}>
                            {selectedAddress &&
                                <View style={styles.addressCard}>
                                    <View style={RNStyles.flexRowBetween}>
                                        <RNText
                                            size={FontSize.font18}
                                            family={FontFamily.Bold}
                                        >{selectedAddress?.name}</RNText>
                                        <SVG.RIGHT />
                                    </View>
                                    <View style={{ ...RNStyles.flexRow, gap: wp(2), width: wp(80) }}>
                                        <SVG.LOCATION />
                                        <RNText
                                            color={Colors.Brown}
                                            family={FontFamily.SemiBold}
                                        >{selectedAddress?.house_no ? selectedAddress?.house_no + ', ' : ''}{selectedAddress?.village ? selectedAddress?.village + ', ' : ''}{selectedAddress?.street}{selectedAddress?.city ? ', ' + selectedAddress?.city : ''}</RNText>
                                    </View>
                                </View>
                            }
                        </TouchableOpacity>

                        <RNText
                            align={"center"}
                            size={FontSize.font16}
                            family={FontFamily.Bold}
                            pVertical={hp(2)}
                            onPress={() => navigation.navigate(NavRoutes.ADDRESS)}
                        >+ Add New Address </RNText>
                    </View>
                </ScrollView>
                <RNButton
                    title={`Continue`}
                    onPress={handlePayment}
                    style={{ bottom: isIOS ? hp(0) : hp(2) }}
                />
            </View>

        </View>
    )
}

export default Payment;

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
        padding: wp(5),
        gap: hp(1.5),
        backgroundColor: Colors.White,
    },
    option: {
        backgroundColor: Colors.Beige,
        borderRadius: normalize(50),
        padding: wp(4),
        ...RNStyles.flexRowBetween,
        marginBottom: hp(1.5),
    },
    radioOuter: {
        ...RNStyles.center,
        width: wp(6),
        height: wp(6),
        borderRadius: normalize(12),
        backgroundColor: Colors.DarkBrown,
    },
    radioInner: {
        width: wp(3),
        height: wp(3),
        borderRadius: normalize(6),
        backgroundColor: Colors.White,
    },
    changeAddress: {
        color: Colors.Red,
        textAlign: "center",
        textDecorationLine: "underline",
    },
    addressCard: {
        marginTop: hp(1),
        backgroundColor: Colors.White,
        borderRadius: normalize(20),
        padding: wp(3),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
        gap: hp(1),
    },
});
