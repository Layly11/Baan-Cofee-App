import { RNButton, RNHeader, RNImage, RNStyles, RNText } from "@/sources/common";
import { getFillSizeIcon, getSizeIcon } from "@/sources/common/categoryIcon";
import SVG from "@/sources/constants/Svg";
import { Colors, FontFamily, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme";
import { fetchProductSizeRequester } from "@/sources/utils/requestUtils";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const Product = ({ navigation, route }: any) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSizeId, setSelectedSizeId] = useState(null);
    const { product } = route.params;
    const [sizeItems, setSizeItems] = useState([])

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => quantity > 1 && setQuantity((prev) => prev - 1);

    const fetchSizeProduct = async () => {
        try {
            const res = await fetchProductSizeRequester(product.id)
            const sizes = res.sizes

            const formatSizeProduct = sizes.map((s: any) => ({
                ...s,
                icon: getSizeIcon(s.title),
                FillIcon: getFillSizeIcon(s.title)
            }))
            setSizeItems(formatSizeProduct)
        } catch (err) {
            console.log(err)
            console.error(err)
        }
    }

    useEffect(() => {
        console.log("Product: ", product)
        fetchSizeProduct()
    }, [])


    const menuItems = [
        {
            id: 1,
            title: "Short",
            Quntity: "230 ml",
            icon: <SVG.SIZE width={wp(8)} height={wp(8)} />,
            FillIcon: <SVG.F_SIZE width={wp(8)} height={wp(8)} />,
        },
        {
            id: 2,
            title: "Tall",
            Quntity: "354 ml",
            icon: <SVG.SIZE width={wp(9)} height={wp(9)} />,
            FillIcon: <SVG.F_SIZE width={wp(9)} height={wp(9)} />,
        },
        {
            id: 3,
            title: "Grade",
            Quntity: "473 ml",
            icon: <SVG.SIZE width={wp(10)} height={wp(10)} />,
            FillIcon: <SVG.F_SIZE width={wp(10)} height={wp(10)} />,
        },
        {
            id: 4,
            title: "Venti",
            Quntity: "591 ml",
            icon: <SVG.SIZE width={wp(12)} height={wp(12)} />,
            FillIcon: <SVG.F_SIZE width={wp(12)} height={wp(12)} />,
        },
    ];

    const renderMenuItem = ({ item }: any) => {
        const isSelected = selectedSizeId === item.id;
        return (
            <View>
                <TouchableOpacity
                    onPress={() => setSelectedSizeId(item.id)}
                    style={[
                        styles.menuItem,
                        { backgroundColor: isSelected ? Colors.DarkBrown : Colors.Beige },
                    ]}
                >
                    {isSelected ? item.FillIcon : item.icon}
                </TouchableOpacity>
                <View style={{ ...RNStyles.center, marginTop: hp(1) }}>
                    <RNText
                        size={FontSize.font16}
                        family={FontFamily.SemiBold}
                    >{item.title}</RNText>
                    <RNText
                        size={FontSize.font14}
                        family={FontFamily.SemiBold}
                        color={Colors.Brown}
                    >{item.Quntity}</RNText>
                </View>
            </View>
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <RNHeader
                containerStyle={styles.header}
                LeftSvg={SVG.BACK}
                title={"Detail"}
            />
            <View style={{ flex: 1, backgroundColor: Colors.White }}>
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: wp(5),
                        paddingBottom: hp(7),
                        gap: hp(3),
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.imageContainer}>
                        <RNImage
                            source={{ uri: product.image }}
                            style={{ width: wp(85), height: wp(85), marginTop: hp(-10) }}
                        />
                    </View>

                    <View style={{ gap: wp(2) }}>
                        <View style={RNStyles.flexRowBetween}>
                            <RNText
                                size={FontSize.font22}
                                family={FontFamily.Black}
                                numOfLines={2}
                                style={{ width: wp(65) }}
                            >{product.title}</RNText>
                            <RNText
                                size={FontSize.font22}
                                family={FontFamily.Black}
                            >{product.price}</RNText>
                        </View>
                        <RNText
                            size={FontSize.font15}
                            family={FontFamily.SemiBold}
                            color={Colors.Brown}
                        >{product.desc}</RNText>
                    </View>
                    <View style={{ gap: hp(1) }}>
                        <RNText
                            size={FontSize.font18}
                            family={FontFamily.Bold}
                        >Size Options</RNText>

                        <FlatList
                            data={sizeItems}
                            renderItem={renderMenuItem}
                            keyExtractor={(item:any) => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: wp(5), alignItems: "center" }}
                        />
                    </View>
                    <View style={{ gap: hp(1) }}>
                        <View style={{ ...RNStyles.flexRowBetween, marginTop: hp(2) }}>
                            <View style={{ ...RNStyles.flexRow, gap: wp(4) }}>
                                <TouchableOpacity onPress={handleDecrement}>
                                    <SVG.DECREMENT width={wp(10)} height={wp(10)} />
                                </TouchableOpacity>
                                <RNText
                                    size={FontSize.font18}
                                    family={FontFamily.Black}
                                >{quantity.toString()}</RNText>
                                <TouchableOpacity onPress={handleIncrement}>
                                    <SVG.INCREMENT width={wp(10)} height={wp(10)} />
                                </TouchableOpacity>
                            </View>
                            <RNButton
                                title={"Add to Cart"}
                                style={{ width: wp(50), backgroundColor: Colors.DarkBrown }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
export default Product;

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.DarkBrown,
        paddingTop: isIOS ? hp(7) : hp(5),
        borderBottomLeftRadius: normalize(50),
        borderBottomRightRadius: normalize(50),
        paddingHorizontal: wp(6),
        paddingBottom: hp(2.5),
    },
    imageContainer: {
        width: wp(60),
        height: wp(60),
        backgroundColor: Colors.Beige,
        ...RNStyles.center,
        alignSelf: "center",
        borderRadius: normalize(120),
        marginTop: hp(10),
    },
    menuItem: {
        ...RNStyles.center,
        width: wp(18),
        height: wp(18),
        borderRadius: normalize(50),
        padding: wp(2),
    },
});
