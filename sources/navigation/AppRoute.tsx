import { createStackNavigator } from "@react-navigation/stack";
import NavConfigs from "./NavConfigs";
import NavRoutes from "./NavRoutes";
import Home from "../screen/Main/Home";
import DrawerNavigator from "./Drawer";
import EditProfile from "../screen/Main/EditProfile";

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
        </Stack.Navigator>
    )
}

export default AppRoute