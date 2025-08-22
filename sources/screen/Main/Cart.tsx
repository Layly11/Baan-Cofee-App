import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";



const OPTIONS = ["Dine-In", "Takeaway", "Delivery"];
const Cart = ({navigation, route}:any) => {
    const [selectedType, setSelectedType] = useState("Dine-In");
    const insets = useSafeAreaInsets();

    
    return (
        <>
        </>
    )
}
export default Cart