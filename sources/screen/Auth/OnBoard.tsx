import { useEffect, useRef, useState } from "react";
import Images from "../../constants/Images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, ImageSourcePropType, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import { NavRoutes } from "@/sources/navigation";
import { Colors, FontFamily, FontSize, hp, normalize, wp } from "@/sources/theme";
import { RNButton, RNImage, RNStyles, RNText } from "@/sources/common";
import SVG from "@/sources/constants/Svg";



interface onBoardingSlidesProps {
    id: number;
    imageSource: ImageSourcePropType;
    title: string;
    description: string;
}

const onBoardingSlides: onBoardingSlidesProps[] = [
    {
        id: 1,
        imageSource: Images.OnBoard1,
        title: "Welcome to Baan Coffee!",
        description:
            "Discover your favorite coffee blends and more. Let’s get started on your coffee journey.",
    },
    {
        id: 2,
        imageSource: Images.OnBoard2,
        title: "Personalize Your Experience",
        description:
            "Set your preferences and favorite drinks to get tailored recommendations and offers just for you.",
    },
    {
        id: 3,
        imageSource: Images.OnBoard3,
        title: "Order with Ease",
        description:
            "Browse the menu, customize your drinks, and place your orders effortlessly with just a few taps.",
    },
]

const OnBoard = ({ navigation }:any) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)
    const flatListRef = useRef<FlatList<any>>(null);
    const insets = useSafeAreaInsets()

    const handleNextSlide = () => {
        if (activeSlideIndex < onBoardingSlides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: activeSlideIndex + 1 });
        } else {
            navigation.navigate(NavRoutes.LOGIN)
        }
    }

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x /
            event.nativeEvent.layoutMeasurement.width
        );
        setActiveSlideIndex(index)
    }

    const renderPaginationDots = () => (
        <View style={{ ...RNStyles.flexRowCenter, gap: wp(3) }}>
            {onBoardingSlides.map((_, index) => {
                const isActive = activeSlideIndex === index
                return (
                    <View key={index} style={[isActive && styles.dotWrapper]}>
                        <View
                            style={[
                                styles.dot,
                                { backgroundColor: isActive ? Colors.Brown : Colors.White },
                            ]}
                        />
                    </View>
                );
            })}
        </View>
    );

    const renderItem = ({ item }: any) => (
        <View style={styles.slide}>
            <RNImage source={item.imageSource} style={styles.image} />
            <RNText
                size={FontSize.font28}
                color={Colors.White}
                family={FontFamily.SemiBold}
                pTop={hp(6)}
                pHorizontal={wp(2)}
                numOfLines={1}
                align="center"
            >
                {item.title}
            </RNText>
            <RNText
                color={Colors.White}
                family={FontFamily.Regular}
                pHorizontal={wp(5)}
                pTop={hp(2)}
                align="center"
            >
                {item.description}
            </RNText>
        </View>
    )


    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <SVG.ON_BOARD_BACK style={styles.svgBack} />

            {activeSlideIndex !== onBoardingSlides.length - 1 && (
                <RNButton
                    title={"Skip"}
                    style={styles.skipButton}
                    onPress={() => navigation.navigate(NavRoutes.LOGIN)}
                />
            )}
            <View style={{ gap: hp(8), top: hp(8) }}>
                <FlatList
                    ref={flatListRef}
                    data={onBoardingSlides}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                />

                {renderPaginationDots()}
                <RNButton
                    icon={<SVG.NEXT />}
                    onPress={handleNextSlide}
                    style={styles.nextButton}
                />
            </View>
        </View>
    )
}

export default OnBoard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: hp(1.5),
        backgroundColor: Colors.DarkBrown,
    },
    svgBack: {
        position: "absolute",
        top: hp(2),
        right: 0,
    },
    skipButton: {
        width: wp(20),
        position: "absolute",
        top: hp(5),
        right: 0,
    },
    slide: {
        width: wp(100),
        ...RNStyles.center,
    },
    image: {
        width: wp(72),
        height: wp(72),
    },
    dotWrapper: {
        ...RNStyles.center,
        width: wp(7),
        height: wp(7),
        borderRadius: normalize(14),
        borderWidth: normalize(2),
        borderColor: Colors.Brown,
    },
    dot: {
        width: wp(2),
        height: wp(2),
        borderRadius: normalize(10),
    },
    nextButton: {
        alignSelf: "center",
        marginBottom: hp(4),
        borderRadius: normalize(20),
    },
});