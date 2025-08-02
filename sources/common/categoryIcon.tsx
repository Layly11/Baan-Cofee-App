import SVG from "@/sources/constants/Svg";

export const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
        case "tea":
            return SVG.HOT_COFFEE;
        case "coffee":
            return SVG.COLD_COFFEE;
        case "drinks":
            return SVG.DRINKS;
        case "bakery":
            return SVG.SNACKS;
        default:
            return SVG.HOT_COFFEE;
    }
};