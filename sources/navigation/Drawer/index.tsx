import { createDrawerNavigator} from "@react-navigation/drawer";
import NavConfigs from "../NavConfigs";
import { wp } from "@/sources/theme";
import Index from "../BottomTabs";

import DrawerContent from './DrawerContent'

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
            drawerContent={(props) => <DrawerContent {...props}/>}
        >
            <Drawer.Screen name="BottomTabs" component={Index}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator