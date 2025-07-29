import { createDrawerNavigator } from "@react-navigation/drawer";
import NavConfigs from "../NavConfigs";
import { wp } from "@/sources/theme";
import Index from "../BottomTabs";

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                ...NavConfigs.screenOptions,
                drawerType: "front",
                drawerStyle: {
                    width: wp(80),
                },
            }}
        >
            <Drawer.Screen name="BottomTabs" component={Index}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator