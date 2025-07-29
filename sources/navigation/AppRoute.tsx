import { createStackNavigator } from "@react-navigation/stack";
import NavConfigs from "./NavConfigs";
import NavRoutes from "./NavRoutes";
import Home from "../screen/Main/Home";
import DrawerNavigator from "./Drawer";

const Stack = createStackNavigator();
const AppRoute = () => {
    return (
        <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
            <Stack.Screen 
            name={'Drawer'}
            component={DrawerNavigator}
            options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default AppRoute