import SVG from "@/sources/constants/Svg";
import { wp } from "../theme";

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


export const getSizeIcon = (name: string) => {
    switch (name.toLowerCase()) {
        case "Short":
            return <SVG.SIZE width={wp(8)} height={wp(8)} />;
        case "Tall":
            return <SVG.SIZE width={wp(9)} height={wp(9)} />;
        case "Grande":
            return <SVG.SIZE width={wp(10)} height={wp(10)} />;
        case "Venti":
            return <SVG.SIZE width={wp(12)} height={wp(12)} />;
        default:
            return <SVG.SIZE width={wp(8)} height={wp(8)} />;
    }
};

export const getFillSizeIcon = (name: string) => {
    switch (name.toLowerCase()) {
        case "Short":
            return <SVG.F_SIZE width={wp(8)} height={wp(8)} />;
        case "Tall":
            return <SVG.F_SIZE width={wp(9)} height={wp(9)} />;
        case "Grande":
            return <SVG.F_SIZE width={wp(10)} height={wp(10)} />;
        case "Venti":
            return <SVG.F_SIZE width={wp(12)} height={wp(12)} />;
        default:
            return <SVG.F_SIZE width={wp(8)} height={wp(8)} />;
    }
};

