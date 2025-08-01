import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { RNHeader, RNImage, RNStyles, RNText } from "../../common";
import {
  Colors,
  FontFamily,
  FontSize,
  hp,
  isIOS,
  normalize,
  wp,
} from "../../theme";
import SVG from "../../constants/Svg";
import { NavRoutes } from "../../navigation";
import { fetchCategoryRequester, fetchProductDataRequester } from "@/sources/utils/requestUtils";
import { getCategoryIcon } from "@/sources/common/categoryIcon";

const { width } = Dimensions.get("window");
const HEADER_TOP_PADDING = isIOS ? hp(5) : hp(5);
const HEADER_BOTTOM_PADDING = hp(-2.5);
const HEADER_HEIGHT = HEADER_TOP_PADDING + HEADER_BOTTOM_PADDING;
const GAP_BETWEEN_HEADER_AND_CIRCLE = hp(1);
const CIRCLE_TOP = HEADER_HEIGHT + GAP_BETWEEN_HEADER_AND_CIRCLE;
const OUTER_RADIUS = width * 0.7;
const INNER_RADIUS = width * 0.58;
const CENTER_X = width / 2;
const CENTER_Y = CIRCLE_TOP + OUTER_RADIUS;
const ITEM_COUNT = 8;
const ANGLE_BETWEEN = Math.PI / (ITEM_COUNT - 1);
const ITEM_WIDTH = wp(55);
const SPACER_WIDTH = (wp(100) - ITEM_WIDTH) / 2;

function polarToCartesian(centerX:any, centerY:any, radius:any, angleInRad:any) {
  return {
    x: centerX + radius * Math.cos(angleInRad),
    y: centerY + radius * Math.sin(angleInRad),
  };
}

function describeArc(x:any, y:any, radius:any, startAngle:any, endAngle:any) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

// const categories = [
//   { label: "Snacks", icon: SVG.SNACKS },
//   { label: "Snacks", icon: SVG.SNACKS },
//   { label: "Hot Coffee", icon: SVG.HOT_COFFEE },
//   { label: "Cold Coffee", icon: SVG.COLD_COFFEE },
//   { label: "Drinks", icon: SVG.DRINKS },
//   { label: "Snacks", icon: SVG.SNACKS },
//   { label: "Snacks", icon: SVG.SNACKS },
//   { label: "Snacks", icon: SVG.SNACKS },
// ];


const productData:any = {
  "Hot Coffee": [
    {
      id: 1,
      title: "Classic Hot Coffee",
      desc: "Milk, instant Arabica coffee powder, sugar",
      price: "$30.00",
      image: require("../../assets/Images/HotCoffee1.png"),
    },
    {
      id: 2,
      title: "Cappuccino",
      desc: "Espresso, steamed milk, milk foam",
      price: "$28.00",
      image: require("../../assets/Images/HotCoffee2.png"),
    },
    {
      id: 3,
      title: "Espresso",
      desc: "Finely ground coffee beans, hot water",
      price: "$22.00",
      image: require("../../assets/Images/HotCoffee3.png"),
    },
    {
      id: 4,
      title: "Hot Latte",
      desc: "Creamy espresso blend",
      price: "$28.00",
      image: require("../../assets/Images/HotCoffee4.png"),
    },
    {
      id: 5,
      title: "Hot Americano", 
      desc: "Bold espresso with hot water",
      price: "$25.00",
      image: require("../../assets/Images/HotCoffee5.png"),
    },
  ],
  "Cold Coffee": [
    {
      id: 1,
      title: "Iced Americano",
      desc: "Creamy blend of espresso, steamed milk, and frothy milk foam",
      price: "$30.00",
      image: require("../../assets/Images/ColdCoffee.png"),
    },
    {
      id: 2,
      title: "Hazelnut Freppino",
      desc: "Espresso shot, hazelnut syrup, milk, ice, whipped cream",
      price: "$32.00",
      image: require("../../assets/Images/ColdCoffee2.png"),
    },
    {
      id: 3,
      title: " Popcorn Cold Coffee",
      desc: "Finely ground coffee, sugar, corn syrup, ice, whipped cream, chocolate sauce",
      price: "$30.00",
      image: require("../../assets/Images/ColdCoffee3.png"),
    },
    {
      id: 4,
      title: "Freppino",
      desc: "Blended cold espresso and cream",
      price: "$32.00",
      image: require("../../assets/Images/ColdCoffee4.png"),
    },
  ],
  Drinks: [
    {
      id: 1,
      title: "Café Frappe",
      desc: "Cream-blended, vanilla ice cream topped cold coffee",
      price: "$40.00",
      image: require("../../assets/Images/Drinks1.png"),
    },
    {
      id: 2,
      title: "Affogato",
      desc: "Single scoop of vanilla ice cream topped with dark roast espresso",
      price: "$30.00",
      image: require("../../assets/Images/Drinks2.png"),
    },
    {
      id: 3,
      title: "Gingerbread Frappe",
      desc: "Gingerbread syrup, roasted coffee, vanilla essence, whipped cream, nutmeg",
      price: "$35.00",
      image: require("../../assets/Images/Drinks3.png"),
    },
  ],
  Snacks: [
    {
      id: 1,
      title: "Choco Muffin",
      desc: "Moist chocolate muffin with chips",
      price: "$18.00",
      image: require("../../assets/Images/ColdCoffee4.png"),
    },
    {
      id: 2,
      title: "Chocolate Chip Cookie",
      desc: "Chocolate chip cookie with a scoop of vanilla ice cream",
      price: "$15.00",
      image: require("../../assets/Images/ColdCoffee5.png"),
    },
    {
      id: 3,
      title: "Choco ",
      desc: "Moist chocolate muffin with chips",
      price: "$18.00",
      image: require("../../assets/Images/ColdCoffee4.png"),
    },
    {
      id: 4,
      title: "Chocolate Chip ",
      desc: "Chocolate chip cookie with a scoop of vanilla ice cream",
      price: "$15.00",
      image: require("../../assets/Images/ColdCoffee5.png"),
    },
  ],
};

const Menu = ({ navigation, route }:any) => {
  const [categories, setCategory] = useState<{ label: string; icon: React.ComponentType<any> }[]>([])
  const [productData, setProductData] = useState<Record<string, any[]>>({})
  const fetchCatgory = async () => {
    try {
        const res = await fetchCategoryRequester()
        const category = res.category
  
        const itemsWithIcons = category.map((cat: any) => ({
            id: cat.id,
            label: cat.name,
            icon: getCategoryIcon(cat.name),
        }));

        const categoryWithIcon = [
          { label: "Snacks", icon: SVG.SNACKS },
          { label: "Snacks", icon: SVG.SNACKS },
          ...itemsWithIcons,
          { label: "Snacks", icon: SVG.SNACKS },
          { label: "Snacks", icon: SVG.SNACKS },
        ]
        setCategory(categoryWithIcon)
  
    } catch (err) {
        console.error(err)
    }
  }

  const fetchProductData = async () => {
    try {
      const res = await fetchProductDataRequester()
      console.log("ProductData: ",res.productData)
      setProductData(res.productData)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchCatgory()
    fetchProductData()
  },[])
  
  const initialIndex = React.useMemo(() => {
    if (route?.params?.category) {
      const index = categories.findIndex(
        (cat) => cat.label === route.params.category
      );
      return index >= 0 ? index : 2;
    }
    return 2;
  }, [route?.params?.category]);

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  

  useEffect(() => {
    if (route?.params?.category) {
      const index = categories.findIndex(
        (cat) => cat.label === route.params.category
      );
      if (index >= 0 && index !== selectedIndex) {
        setSelectedIndex(index);
      }
      navigation.setParams({ category: undefined });
    }
  }, [route?.params?.category]);

  const selectedCategory = categories[selectedIndex]?.label;
  const filteredDrinks = productData[selectedCategory] || [];
  const repeatedDrinks = [
    ...filteredDrinks,
    ...filteredDrinks,
    ...filteredDrinks,
  ];
  const initialProductIndex = filteredDrinks.length;

  const scrollX = useRef(
    new Animated.Value(ITEM_WIDTH * initialProductIndex)
  ).current;
  const flatListRef = useRef(null) as any
  const [centerIndex, setCenterIndex] = useState(initialProductIndex);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: ITEM_WIDTH * initialProductIndex,
        animated: false,
      })
      setCenterIndex(initialProductIndex);
    }, 50);
  }, [selectedCategory]);

  const selectedAngle = selectedIndex * ANGLE_BETWEEN - Math.PI;
  const startAngle = selectedAngle - 0.15;
  const endAngle = selectedAngle + 0.15;

  const renderProductText = () => {
    return repeatedDrinks.map((item, index) => {
      const inputRange = [
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
      ];
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
        extrapolate: "clamp",
      });
      const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [10, 0, 10],
        extrapolate: "clamp",
      });

      return (
        <Animated.View
          key={"text-" + index}
          style={{
            position: "absolute",
            width: wp(50),
            opacity,
            transform: [{ translateY }],
            alignItems: "center",
          }}
        >
          <RNText
            size={FontSize.font22}
            family={FontFamily.Black}
            align="center"
          >{item.title}</RNText>
          <RNText
            size={FontSize.font15}
            family={FontFamily.Medium}
            align="center"
            numberOfLines={3}
          >{item.desc}</RNText>
          <RNText
            size={FontSize.font22}
            family={FontFamily.Bold}
            align="center"
          >{item.price}</RNText>
        </Animated.View>
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <RNHeader
        containerStyle={styles.header}
        LeftText={"Menu"}
        RightIcon={SVG.SEARCH}
        rightIconWidth={wp(5)}
        rightIconHeight={wp(5)}
        rightIconStyle={styles.searchIcon}
        onRightPress={() => navigation.navigate(NavRoutes.SEARCH)}
      />

      <View style={{ flex: 1, backgroundColor: Colors.White }}>
        <Svg height="100%" width="100%" style={styles.svg}>
          <Circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={OUTER_RADIUS}
            fill={Colors.Brown}
          />
          <Path
            d={describeArc(
              CENTER_X,
              CENTER_Y,
              OUTER_RADIUS,
              startAngle,
              endAngle
            )}
            stroke={Colors.Beige}
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>

        {categories.map((category, i) => {
          if (i < 2 || i > categories.length - 3) return null;
          const angle = i * ANGLE_BETWEEN - Math.PI;
          const pos = polarToCartesian(CENTER_X, CENTER_Y, INNER_RADIUS, angle);
          const isActive = selectedIndex === i;
          return (
            <View
              key={`${category.label}-${i}`}
              style={{
                position: "absolute",
                left: pos.x - wp(8.5),
                top: pos.y - wp(8.5),
              }}
            >
              <TouchableOpacity onPress={() => setSelectedIndex(i)}>
                <View style={[styles.categoryIconContainer]}>
                  <View style={styles.categoryIcon}>
                    <category.icon />
                  </View>
                </View>
                <RNText style={styles.categoryLabel}>{category.label}</RNText>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={styles.circleContainer}>
          <Animated.FlatList
            ref={flatListRef}
            data={repeatedDrinks}
            keyExtractor={(_, index) => "drink-" + index}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            bounces={false}
            scrollEventThrottle={16}
            removeClippedSubviews={false}
            contentContainerStyle={{
              paddingHorizontal: SPACER_WIDTH,
              left: isIOS ? wp(-20) : wp(-40),
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              let index = Math.round(offsetX / ITEM_WIDTH);
              if (index <= filteredDrinks.length - 1) {
                flatListRef.current?.scrollToOffset({
                  offset: ITEM_WIDTH * (index + filteredDrinks.length),
                  animated: false,
                });
                index += filteredDrinks.length;
              } else if (index >= filteredDrinks.length * 2) {
                flatListRef.current?.scrollToOffset({
                  offset: ITEM_WIDTH * (index - filteredDrinks.length),
                  animated: false,
                });
                index -= filteredDrinks.length;
              }
              setCenterIndex(index);
            }}
            renderItem={({ item, index }) => {
              if (!item?.title) return <View style={{ width: ITEM_WIDTH }} />;
              const inputRange = [
                (index - 2) * ITEM_WIDTH,
                (index - 1) * ITEM_WIDTH,
                index * ITEM_WIDTH,
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: "clamp",
              });
              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [hp(12), 0, hp(12)],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  style={[
                    styles.productContainer,
                    {
                      width: ITEM_WIDTH,
                      transform: [{ scale }, { translateY }],
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.productImageContainer}
                    onPress={() =>
                      navigation.navigate(NavRoutes.PRODUCT, { product: item })
                    }
                  >
                    <RNImage source={{uri:item.image }} style={styles.productImage} />
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />

          <View style={styles.bottomContainer}>{renderProductText()}</View>
        </View>
      </View>

      {filteredDrinks.length > 0 && (
        <View style={styles.dotsContainer}>
          {filteredDrinks.map((_:any, index:any) => {
            const dotInputRange = [
              (index + filteredDrinks.length - 1) * ITEM_WIDTH,
              (index + filteredDrinks.length) * ITEM_WIDTH,
              (index + filteredDrinks.length + 1) * ITEM_WIDTH,
            ];
            const dotScale = scrollX.interpolate({
              inputRange: dotInputRange,
              outputRange: [1, 1.4, 1],
              extrapolate: "clamp",
            });
            const dotOpacity = scrollX.interpolate({
              inputRange: dotInputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    transform: [{ scale: dotScale }],
                    opacity: dotOpacity,
                    backgroundColor: Colors.Brown,
                  },
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.DarkBrown,
    paddingTop: isIOS ? hp(7) : hp(5),
    paddingBottom: hp(2.5),
    paddingHorizontal: wp(6),
    borderBottomLeftRadius: normalize(50),
    borderBottomRightRadius: normalize(50),
  },
  searchIcon: {
    ...RNStyles.center,
    backgroundColor: Colors.White,
    width: wp(9),
    height: wp(9),
    borderRadius: wp(5),
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  categoryLabel: {
    fontFamily: FontFamily.Bold,
    fontSize: FontSize.font14,
    color: Colors.White,
    textAlign: "center",
  },
  categoryIconContainer: {
    ...RNStyles.center,
  },
  categoryIcon: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(15),
    backgroundColor: Colors.White,
    ...RNStyles.center,
    padding: wp(2),
  },
  circleContainer: {
    width: wp(130),
    height: hp(100),
    position: "absolute",
    top: hp(20),
    left: wp(-15),
    backgroundColor: Colors.LightBrown,
    borderRadius: normalize(300),
  },
  productContainer: {
    alignItems: "center",
    gap: hp(1),
    top: hp(3),
  },
  productImageContainer: {
    marginTop: hp(3),
    ...RNStyles.center,
    width: wp(50),
    height: wp(50),
    backgroundColor: Colors.Beige,
    borderRadius: normalize(100),
  },
  productImage: {
    width: wp(65),
    height: wp(65),
    borderRadius: wp(65), 
    resizeMode: "contain",
    marginTop: -hp(5),
  },
  bottomContainer: {
    position: "absolute",
    top: hp(33),
    zIndex: 1,
    alignSelf: "center",
    width: wp(50),
    height: hp(14),
  },
  dotsContainer: {
    ...RNStyles.flexRowCenter,
    alignSelf: "center",
    bottom: hp(15),
    position: "absolute",
  },
  dot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    marginHorizontal: wp(1),
  },
});
