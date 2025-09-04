import { RNImage, RNStyles, RNText } from "@/sources/common"
import SVG from "@/sources/constants/Svg"
import { NavRoutes } from "@/sources/navigation"
import { Colors, FontFamily, FontSize, hp, normalize, wp } from "@/sources/theme"
import { useCallback, useRef, useState } from "react"
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, TouchableOpacity, View } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient";
import { fetchBestSellerRequester, fetchCategoryRequester } from "@/sources/utils/requestUtils"
import { getCategoryIcon } from "@/sources/common/categoryIcon"
import { useFocusEffect } from "@react-navigation/native"

const Home = ({ navigation }: any) => {
    // const dispatch = useDispatch()
    const [activeBannerIndex, setActiveBannerIndex] = useState(0)
    const bannerRef = useRef(null)
    const insets = useSafeAreaInsets();
    const [category, setCategory] = useState([])
    const [bestSeller, setBestSeller] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false)


    const retryFetch = () => {
        setTimeout(() => {
            fetchBestSeller()
            fetchCatgory()
        }, 10000)
    }

    const fetchCatgory = async () => {
        setIsLoading(true)
        try {
            const res = await fetchCategoryRequester()
            const category = res.category

            const itemsWithIcons = category.map((cat: any) => ({
                ...cat,
                icon: getCategoryIcon(cat.name),
            }));

            setCategory(itemsWithIcons)
            setHasError(false)
        } catch (err) {
            setHasError(true)
            console.error(err)
            retryFetch()
        } finally {
            setIsLoading(false)
        }
    }

    const fetchBestSeller = async () => {
        setIsLoading(true)
        try {
            const res = await fetchBestSellerRequester()
            const bestSeller = res.bestSeller
            console.log("BestSeller: ", bestSeller)
            setBestSeller(bestSeller)
            setHasError(false)
        } catch (err) {
            setHasError(true)
            console.error(err)
            retryFetch()
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchCatgory()
            fetchBestSeller()
            return () => {
            };
        }, [])
    );

    const Banner = [
        { id: 1, imageSource:'https://baancoffee.blob.core.windows.net/banner/Banner1.png' },
        { id: 2, imageSource: 'https://baancoffee.blob.core.windows.net/banner/Banner1.png' },
        { id: 3, imageSource: 'https://baancoffee.blob.core.windows.net/banner/Banner1.png' },
    ];

    const handleBannerScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const scrollX = event.nativeEvent.contentOffset.x
        const index = Math.round(scrollX / (wp(85) + wp(4)));
        setActiveBannerIndex(index);
    }

    const renderMenuItem = ({ item }: any) => (
        <View style={{ gap: hp(1), ...RNStyles.center }}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                    navigation.navigate(NavRoutes.MENU, {
                        category: item.name,
                    })
                }
            >
                <item.icon />
            </TouchableOpacity>
            <RNText
                size={FontSize.font14}
                family={FontFamily.Black}
                color={Colors.Brown}
            >
                {item.name}
            </RNText>
        </View>
    );

    const renderBestSeller = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(NavRoutes.PRODUCT, {product: {
                id: item.product_id,
                title: item.name,
                price: item.price,
                image: item.imageSource,
                desc: item.Desc,
            }})}
        >
            <View style={styles.imageContainer}>
                <View style={styles.imageBackground} />
                <RNImage source={{ uri: item.imageSource }} style={styles.image} />
            </View>
            <LinearGradient
                start={{ x: 0, y: 2 }}
                end={{ x: 0, y: 0 }}
                colors={["white", "white", "#ffffff2b", "transparent"]}
                style={styles.gradient}
            />
            <View style={styles.infoContainer}>
                <RNText
                    size={FontSize.font18}
                    family={FontFamily.Black}
                >{item.name}</RNText>
                <RNText
                    size={FontSize.font14}
                    family={FontFamily.SemiBold}
                >{item.Desc}</RNText>
                <View style={RNStyles.flexRowBetween}>
                    <RNText
                        size={FontSize.font18}
                        family={FontFamily.Bold}
                    >{item.price}</RNText>
                    <SVG.ADD />
                </View>
            </View>
        </TouchableOpacity>
    )


    if (isLoading || hasError) {
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
        <View style={[styles.root, { paddingBottom: insets.bottom }]}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={{ gap: hp(2), marginTop: hp(2) }}>
                    {/* <RNInput
                        placeholder="Search"
                        LeftIcon={<SVG.SEARCH />}
                        inputStyle={styles.input}
                    /> */}

                    <View>
                        <RNText style={styles.menuTitle} >Our Menu</RNText>
                        <View style={{
                            alignItems: category.length < 4 ? "flex-start" : "center",
                            marginTop: hp(2),
                            paddingLeft: category.length < 4 ? wp(5) : 0,
                        }}>
                            <FlatList
                                data={category}
                                renderItem={renderMenuItem}
                                keyExtractor={(item: any) => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: wp(5) }}
                            />
                        </View>
                    </View>

                    <View>
                        <FlatList
                            ref={bannerRef}
                            data={Banner}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            onScroll={handleBannerScroll}
                            onScrollBeginDrag={handleBannerScroll}
                            onMomentumScrollEnd={handleBannerScroll}
                            decelerationRate="fast"
                            snapToInterval={wp(85) + wp(4)}
                            scrollEventThrottle={16}
                            renderItem={({ item }) => (
                                <RNImage
                                    source={{ uri: item.imageSource}}
                                    style={{
                                        width: wp(85),
                                        height: hp(18),
                                        borderRadius: normalize(20),
                                        marginRight: wp(4),
                                    }}
                                    resizeMode="stretch"
                                />
                            )}
                            contentContainerStyle={{ paddingLeft: wp(4) }}

                        />


                        <View style={styles.paginationContainer}>
                            {Banner.map((_, index) => (
                                <View
                                    key={index}
                                    style={{
                                        height: wp(2),
                                        borderRadius: normalize(10),
                                        backgroundColor:
                                            activeBannerIndex === index
                                                ? Colors.Brown
                                                : Colors.LightBrown,
                                        width: activeBannerIndex === index ? wp(4) : wp(2),
                                    }}
                                />
                            ))}
                        </View>
                    </View>

                    <View>
                        <RNText style={styles.menuTitle} >Best Seller</RNText>
                        <FlatList
                            data={bestSeller}
                            renderItem={renderBestSeller}
                            keyExtractor={(item: any) => item.product_id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: wp(3), paddingHorizontal: wp(4) }}
                        />
                    </View>


                </View>
            </ScrollView>
        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    input: {
        width: wp(90),
        alignSelf: "center",
        paddingHorizontal: wp(5),
        fontSize: FontSize.font16,
    },
    menuTitle: {
        fontSize: FontSize.font20,
        fontFamily: FontFamily.Bold,
        marginBottom: hp(1),
        paddingHorizontal: wp(5),
    },
    menuItem: {
        ...RNStyles.center,
        width: wp(16),
        height: wp(16),
        backgroundColor: Colors.Beige,
        borderRadius: normalize(50),
    },
    card: {
        ...RNStyles.center,
        borderRadius: normalize(25),
        width: wp(47),
        overflow: "hidden",
        backgroundColor: Colors.Beige,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 10,
        marginBottom: hp(15),
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: hp(5),
    },
    imageContainer: {
        ...RNStyles.center,
        marginTop: hp(1.2),
        width: wp(40),
        height: hp(13),
        backgroundColor: Colors.White,
        borderRadius: normalize(20),
        overflow: "hidden",
    },
    imageBackground: {
        position: "absolute",
        bottom: hp(-14),
        left: wp(-4),
        right: 0,
        width: wp(47),
        height: hp(20),
        borderRadius: normalize(100),
        backgroundColor: Colors.Brown,
    },
    image: {
        width: wp(40),
        height: wp(40),
    },
    infoContainer: {
        gap: hp(1),
        padding: wp(3),
    },
    paginationContainer: {
        ...RNStyles.flexRowCenter,
        marginTop: hp(1),
        gap: wp(1),
    },
    dot: {
        height: wp(2),
        borderRadius: normalize(5),
    },
});
