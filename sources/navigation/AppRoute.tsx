import { createStackNavigator } from "@react-navigation/stack";
import NavConfigs from "./NavConfigs";
import NavRoutes from "./NavRoutes";
import DrawerNavigator from "./Drawer";
import EditProfile from "../screen/Main/EditProfile";
import Address from "../screen/Main/Address";
import Product from "../screen/Main/Product";
import Payment from "../screen/Main/Payment";

const Stack = createStackNavigator();
const AppRoute = () => {
    return (
        <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
            <Stack.Screen 
            name={'Drawer'}
            component={DrawerNavigator}
            options={{headerShown: false}}
            />
            <Stack.Screen name={NavRoutes.EDIT_PROFILE} component={EditProfile} />
            <Stack.Screen name={NavRoutes.ADDRESS} component={Address} />
            <Stack.Screen name={NavRoutes.PRODUCT} component={Product} />
            <Stack.Screen name={NavRoutes.PAYMENT} component={Payment} />
        </Stack.Navigator>
    )
}

export default AppRoute