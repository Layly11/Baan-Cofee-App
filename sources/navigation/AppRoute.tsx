import { createStackNavigator } from "@react-navigation/stack";
import NavConfigs from "./NavConfigs";
import NavRoutes from "./NavRoutes";
import DrawerNavigator from "./Drawer";
import EditProfile from "../screen/Main/EditProfile";
import Address from "../screen/Main/Address";

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
        </Stack.Navigator>
    )
}

export default AppRoute