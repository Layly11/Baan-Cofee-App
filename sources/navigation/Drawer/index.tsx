import { createDrawerNavigator} from "@react-navigation/drawer";
import NavConfigs from "../NavConfigs";
import { wp } from "@/sources/theme";
import Index from "../BottomTabs";

import DrawerContent from './DrawerContent'
import NavRoutes from "../NavRoutes";
import Address from "@/sources/screen/Main/Address";

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
            <Drawer.Screen name={NavRoutes.ADDRESS} component={Address} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator