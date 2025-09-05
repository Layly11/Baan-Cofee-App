import { RNButton, RNHeader, RNImage, RNStyles, RNText } from "@/sources/common";
import SVG from "@/sources/constants/Svg";
import { NavRoutes } from "@/sources/navigation";
import { Colors, FontFamily, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme";
import { deleteCartRequester, fetchCartRequester, updateQuantityRequester } from "@/sources/utils/requestUtils";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { debounce, size } from "lodash";
import { useFocusEffect } from "@react-navigation/native";


const BASE_SHIPPING_FEE = 10;
const PER_ITEM_FEE = 5;
const TAX_RATE = 0.07;

const Cart = ({ navigation, route }: any) => {
    const insets = useSafeAreaInsets();


    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            const res = await fetchCartRequester()
            // console.log("Cart: ", res.data.cart)
            setCartItems(res.data.cart)
            console.log("CartItems: ", res.data.cart)
        } catch (err) {
            console.log(err)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchCartItems()

            return () => {
            };
        }, [])
    );

    useEffect(() => {
        fetchCartItems()
    }, [])

    const updateQuantity = async (id: any, newQuantity: any, extra_price: any) => {
        try {
            await updateQuantityRequester({ id, newQuantity, extra_price })
        } catch (err) {
            console.log(err)
        }
    }

    const debouncedUpdateQuantity = debounce((id: any, quantity: any, extra_price: any) => {
        updateQuantity(id, quantity, extra_price);
    },100)

    const handleIncrement = (id: any) => {
        setCartItems((prev: any) =>
            prev.map((item: any) => {
                if (item.id === id) {
                    if (item.quantity >= 10) {
                        Alert.alert("Limit Full", "Maximum quantity is 10");
                        return item;
                    }
                    const newQty = item.quantity + 1;
                    debouncedUpdateQuantity(id, newQty, (item.unit_price * newQty));
                    return { ...item, extra_price: (item.unit_price * newQty), quantity: newQty, };
                }
                return item;
            }
            )
        );
    };

    const handleDecrement = (id: any) => {
        setCartItems((prev: any) =>
            prev.map((item: any) => {
                if (item.id === id && item.quantity === 1) {
                    handleDeleteCart(item.id)
                }
                if (item.id === id && item.quantity > 1) {
                    const newQty = item.quantity - 1;
                    debouncedUpdateQuantity(id, newQty, (item.unit_price * newQty));
                    return { ...item, extra_price: (item.unit_price * newQty), quantity: newQty };
                }
                return item;
            }
            )
        );
    };

    const handleDeleteCart = async (id: any) => {
        try {
            await deleteCartRequester(id)
            setCartItems((prev: any) => prev.filter((item: any) => item.id !== id))
        } catch (err) {
            console.log(err)
        }
    }


    const getSubTotal = () => {
        return cartItems.reduce(
            (acc: number, item: any) => acc + (Number(item.extra_price) || 0),
            0
        );
    };
    const getShippingFees = () => {
        const totalItems = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
        const fee = BASE_SHIPPING_FEE + PER_ITEM_FEE * totalItems;
        return fee.toFixed(2);
    }

    const getTotal = () => {
        if (cartItems.length === 0) return 0;
        return Number(getSubTotal()) + Number(getShippingFees()) + Number(getSubTotal() * TAX_RATE)
    }

    return (
        <View style={styles.root}>
            <RNHeader
                containerStyle={styles.header}
                LeftText="Cart"
                fontFamily={FontFamily.Bold}
            />
            <View style={[styles.root, { paddingBottom: insets.bottom }]}>

                {cartItems.length > 0 ? (
                     <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={{ gap: hp(1.5), paddingHorizontal: wp(4), paddingTop: hp(3), }}>
                            {cartItems.map((item: any) => (
                                <View key={item.id} style={styles.addressCard}>
                                    <View style={styles.imageContainer}>
                                        <View style={styles.imageBackground} />
                                        {item.imageSource  && (
                                            <RNImage
                                            source={{ uri: item.imageSource }}
                                            style={{ width: wp(27), height: wp(27) }}
                                        />
                                        )}
                                    </View>
                                    <View style={{ width: wp(55), gap: hp(0.8) }}>
                                        <View style={RNStyles.flexRowBetween}>
                                            <RNText
                                                size={FontSize.font14}
                                                family={FontFamily.Black}
                                                color={Colors.Brown}
                                            >{item.size}</RNText>
                                            <SVG.CLOSE onPress={() => handleDeleteCart(item.id)} />
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
                                            <RNText
                                                size={FontSize.font18}
                                                family={FontFamily.Black}
                                            >{item.extra_price}</RNText>
                                            <View
                                                style={{
                                                    ...RNStyles.flexRow,
                                                    gap: wp(2),
                                                    alignItems: "center",
                                                }}
                                            >
                                                <SVG.DECREMENT onPress={() => handleDecrement(item.id)} />
                                                <RNText
                                                    size={FontSize.font18}
                                                    family={FontFamily.Black}
                                                >{item.quantity.toString()}</RNText>
                                                <SVG.INCREMENT onPress={() => handleIncrement(item.id)} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <CartSummary
                            subtotal={getSubTotal().toFixed(2)}
                            shipping={cartItems.length > 0 ? getShippingFees() : '0.00'}
                            Taxes={Number(getSubTotal() * TAX_RATE).toFixed(2)}
                            totalPayment={getTotal().toFixed(2)}
                        />
                        <RNButton
                            title={"Checkout"}
                            onPress={() => navigation.navigate(NavRoutes.PAYMENT, { amount: getTotal().toFixed(2), product: cartItems.map((p: any) => ({ id: p.product_id, name: p.name, amount: p.quantity, price: p.extra_price, size: p.size  })) })}
                            style={{ marginVertical: hp(2) }}
                        />
                    </ScrollView>
                ) : (
                 <View style={styles.emptyContainer}>
                        <RNImage
                            source={require("../../assets/Images/empty-cart.png")} 
                            style={{ width: wp(40), height: wp(40), marginBottom: hp(2) }}
                            resizeMode="contain"
                        />
                        <RNText size={FontSize.font18} family={FontFamily.Bold} color={Colors.Brown}>
                            Your cart is empty
                        </RNText>
                        <RNText size={FontSize.font14} color={Colors.Brown} style={{ marginTop: hp(1) }}>
                            Looks like you have not added anything yet.
                        </RNText>
                        <RNButton
                            title="Go Shopping"
                            onPress={() => navigation.navigate(NavRoutes.HOME)} // เปลี่ยนไปหน้า shop ของคุณ
                            style={{ marginTop: hp(3) }}
                        />
                    </View>
                )}
            </View>
        </View>
    )
};

const CartSummary = ({ subtotal, shipping, Taxes, totalPayment }: any) => {
    return (
        <View style={styles.cartSummaryContainer}>
            <View style={{ gap: hp(1) }}>
                <SummaryRow label="Subtotal" value={subtotal} />
                <SummaryRow label="Shipping Fees" value={`${shipping}`} />
                <SummaryRow label="Taxes (7%)" value={`${Taxes}`} />
            </View>
            <View style={styles.divider} />
            <SummaryRow label="Total" value={`${totalPayment}`} />
        </View>
    );
};
const SummaryRow = ({ label, value }: any) => (
    <View style={RNStyles.flexRowBetween}>
        <RNText size={FontSize.font15} family={FontFamily.Bold} >{label}</RNText>
        <RNText size={FontSize.font15} family={FontFamily.Black} >{value}</RNText>
    </View>
);
export default Cart


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp(5),
        gap: hp(1.5),
    },
    header: {
        backgroundColor: Colors.DarkBrown,
        paddingTop: isIOS ? hp(7) : hp(5),
        paddingBottom: hp(2.5),
        paddingHorizontal: wp(6),
        borderBottomLeftRadius: normalize(50),
        borderBottomRightRadius: normalize(50),
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
    typeButton: {
        flex: 1,
        borderRadius: normalize(50),
        paddingVertical: hp(1.8),
        ...RNStyles.center,
    },
    promoCodeContainer: {
        ...RNStyles.flexRowBetween,
        backgroundColor: Colors.Beige,
        borderRadius: normalize(50),
        padding: wp(1.5),
    },
    promoCodeInput: {
        flex: 1,
        paddingHorizontal: wp(3),
        color: Colors.Brown,
        fontSize: FontSize.font14,
        fontFamily: FontFamily.SemiBold,
    },
    scrollContent: {
        paddingBottom: hp(12),
        gap: hp(2),
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.Black,
        borderStyle: "dashed",
        width: "100%",
    },
    cartSummaryContainer: {
        backgroundColor: Colors.Beige,
        padding: wp(5),
        borderRadius: normalize(20),
        gap: hp(2),
        marginHorizontal: wp(4),
    },
});
