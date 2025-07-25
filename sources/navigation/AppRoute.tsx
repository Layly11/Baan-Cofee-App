import { createStackNavigator } from "@react-navigation/stack";
import NavConfigs from "./NavConfigs";
import NavRoutes from "./NavRoutes";
import Home from "../screen/Main/Home";

const Stack = createStackNavigator();
const AppRoute = () => {
    return (
        <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
             <Stack.Screen name={NavRoutes.HOME} component={Home} />
        </Stack.Navigator>
    )
}

export default AppRoute