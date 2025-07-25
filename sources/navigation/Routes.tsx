import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Functions from "../utils/Functions";
import { onAuthChange, setAsyncStorageValue } from "../redux/Reducers/AuthReducers";
import { RNImage } from "../common";
import { wp } from "../theme";
import { NavigationContainer } from "@react-navigation/native";
import NavConfigs from "./NavConfigs";
import { createStackNavigator } from "@react-navigation/stack";
import AuthRoute from "./AuthRoute";
import { Dimensions, ImageBackground } from "react-native";

const Stack = createStackNavigator();

const Routes = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            
        }
    },[])

    if (loading) {
        return (
            <ImageBackground
                source={require("../assets/Images/SplashScreen.png")}
                style={{ width: wp(100), height: '100%'}}
                resizeMode="cover"
            />
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
                <Stack.Screen
                    name="Auth"
                    component={AuthRoute}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;