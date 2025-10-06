import { RNButton, RNHeader, RNStyles, RNText } from "@/sources/common";
import ConfirmModal from "@/sources/component/ConfirmModal";
import SVG from "@/sources/constants/Svg";
import { NavRoutes } from "@/sources/navigation";
import { Colors, FontFamily, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme";
import { CancelOrderRequester, getTrackOrderRequester } from "@/sources/utils/requestUtils";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";


const TimelineStep = ({ step }: any) => {
    const isDone = step.status === "done";
    return (
        <View style={styles.stepRow}>
            <View
                style={[
                    styles.stepCircle,
                    { backgroundColor: isDone ? Colors.DarkBrown : Colors.White },
                ]}
            >
                {isDone && <SVG.DONE />}
            </View>
            <RNText family={FontFamily.Bold}>{step.label}</RNText>
        </View>
    );
};


const TrackOrder = ({ navigation, route }: any) => {
    const insets = useSafeAreaInsets();
    const { orderId } = route.params || {};
    const [order, setOrder] = useState({}) as any
    const [modalCancelOrderVisible, setModalCancelVisible] = useState(false);
    const customer = useSelector((state: any) => state.Auth.AsyncValue.user)
    const [loading, setLoading] = useState(false)
    const STEPS = [] as any

    if (order?.status === "cancelled") {
        STEPS.push({ label: "Order Placed", status: "done" });
        STEPS.push({ label: "Cancelled", status: "done" });
    } else {
        STEPS.push({ label: "Order Placed", status: "done" });
        STEPS.push({
            label: "Preparing",
            status: order?.status === "preparing" ? "done" : (["out_for_delivery", "complete"].includes(order?.status) ? "done" : "pending")
        });
        STEPS.push({
            label: "Out for Delivery",
            status: order?.status === "out_for_delivery" ? "done" : (order?.status === "complete" ? "done" : "pending")
        });
        STEPS.push({
            label: "Delivered",
            status: order?.status === "complete" ? "done" : "pending"
        });
    }


    const canCancel = order?.status === "pending" || order?.status === "preparing";

    const ferchTrackOrder = async () => {
        try {
            const res = await getTrackOrderRequester(orderId)
            setOrder(res.order)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        ferchTrackOrder()
    }, [orderId])

    const handleCancelOrder = async () => {
        setModalCancelVisible(false)
        setLoading(true)
        try {
            await CancelOrderRequester({ order_id: order.order_id })
            setOrder((prev: any) => ({
                ...prev,
                status: "cancelled",
            }));

            Alert.alert("Cancel Success", "Your order has been cancelled");
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
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

    if (!order || !order.order_id) {
        return (
            <View style={styles.container}>
                <RNHeader
                    containerStyle={styles.header}
                    LeftSvg={SVG.BACK}
                    onLeftPress={() => navigation.goBack()}
                    title={"Track Order"}
                />
                <View style={[styles.content, { paddingBottom: insets.bottom, ...RNStyles.center }]}>
                    <SVG.EMPTY_BOX width={wp(40)} height={wp(40)} />
                    <RNText size={FontSize.font20} family={FontFamily.Bold} color={Colors.Brown}>
                        No Orders Found
                    </RNText>
                    <RNText size={FontSize.font14} color={Colors.Placeholder}>
                        You don’t have any active orders.
                    </RNText>
                    <View style={{ marginTop: hp(2) }}>
                        <RNButton
                            title="Go Shopping"
                            onPress={() => navigation.navigate('Drawer', {
                                screen: 'BottomTabs',
                                params: {
                                    screen: NavRoutes.HOME,
                                },
                            })} // ไปหน้า Home
                        />
                    </View>
                </View>
            </View>
        );
    }

    const renderTimeline = () => (
        <View style={{ gap: hp(4) }}>
            <View style={styles.dashedLine} />
            {STEPS.map((step: any, index: any) => (
                <TimelineStep key={index} step={step} />
            ))}
        </View>
    )
    return (
        <View style={styles.container}>
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
                title={"My Addresses"}
            />
            <View style={[styles.content, { paddingBottom: insets.bottom }]}>
                <View style={{ ...RNStyles.center, gap: hp(1) }}>
                    <RNText>Estimated Delivery Time</RNText>
                    <RNText
                        size={FontSize.font25}
                        family={FontFamily.Black}
                    >{order?.time}</RNText>
                </View>

                <View style={styles.orderStatusContainer}>
                    <View style={RNStyles.flexRowBetween}>
                        <RNText family={FontFamily.Bold} >Track Order</RNText>
                        <RNText family={FontFamily.Bold} >{order?.order_id}</RNText>
                    </View>
                    {renderTimeline()}
                </View>

                <View style={styles.addressCard}>
                    <RNText
                        size={FontSize.font18}
                        family={FontFamily.Bold}
                    >Delivery Address</RNText>
                    <View style={{ ...RNStyles.flexRow, gap: wp(2) }}>
                        <SVG.LOCATION />
                        <RNText
                            size={FontSize.font15}
                            color={Colors.Brown}
                            style={{ width: wp(78) }}
                        >{order?.shipping_address?.house_no}, {order?.shipping_address?.village}, {order?.shipping_address?.street}, {order?.shipping_address?.city}</RNText>
                    </View>
                    <View style={{ ...RNStyles.flexRow, gap: wp(2) }}>
                        <SVG.CONTACT />
                        <RNText
                            size={FontSize.font15}
                            color={Colors.Brown}
                        >{customer?.phone}</RNText>
                    </View>
                </View>


                <View style={styles.deleteButton}>
                    {canCancel && (
                        <View style={{ marginTop: hp(2) }}>
                            <RNButton title="Cancel Order" bgColor={Colors.Red} onPress={() => setModalCancelVisible(true)} />
                        </View>
                    )}
                    <RNButton
                        title={"Back to Home"}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>

            <ConfirmModal
                visible={modalCancelOrderVisible}
                title={"Cancel Order"}
                subTitle={"Are you sure you want to Cancel your Order?"}
                cancelText={"Cancel"}
                confirmText={"Confirm"}
                onConfirm={handleCancelOrder}
                onCancel={() => setModalCancelVisible(false)}
            />
        </View>
    )
}

export default TrackOrder;

const styles = StyleSheet.create({
      root: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    container: { flex: 1 },
    header: {
        backgroundColor: Colors.DarkBrown,
        paddingTop: isIOS ? hp(7) : hp(5),
        borderBottomLeftRadius: normalize(50),
        borderBottomRightRadius: normalize(50),
        paddingHorizontal: wp(6),
        paddingBottom: hp(2.5),
    },
    content: {
        flex: 1,
        padding: wp(5),
        gap: hp(2),
        backgroundColor: Colors.White,
    },
    orderStatusContainer: {
        gap: hp(3),
        backgroundColor: Colors.Beige,
        borderRadius: normalize(20),
        padding: wp(5),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 5,
    },
    dashedLine: {
        position: "absolute",
        top: hp(1.5),
        left: wp(2.4),
        height: hp(20),
        borderRightWidth: normalize(2),
        borderRightColor: Colors.Brown,
        borderStyle: "dashed",
        zIndex: -1,
    },
    stepRow: {
        ...RNStyles.flexRow,
        gap: wp(3),
    },
    stepCircle: {
        width: wp(6),
        height: wp(6),
        borderRadius: wp(3),
        justifyContent: "center",
        alignItems: "center",
    },
    addressCard: {
        backgroundColor: Colors.White,
        borderRadius: normalize(20),
        padding: wp(3),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        gap: hp(1),
    },
    deleteButton: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: isIOS ? hp(0) : hp(2),
        gap: hp(2)
    },
});
