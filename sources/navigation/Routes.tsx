import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { onAuthChange, setAsyncStorageValue } from "../redux/Reducers/AuthReducers";
import { RNImage } from "../common";
import { wp } from "../theme";
import { NavigationContainer } from "@react-navigation/native";
import NavConfigs from "./NavConfigs";
import { createStackNavigator } from "@react-navigation/stack";
import AuthRoute from "./AuthRoute";
import { ImageBackground } from "react-native";
import { getAuthToken } from "../utils/auth";
import AppRoute from "./AppRoute";

const Stack = createStackNavigator();

const Routes = () => {
    const { isAuth } = useSelector((state:any) => state.Auth);
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken()
            setIsAuthenticated(!!token)
            if(token) {
                dispatch(onAuthChange(true))
            }
        }
        checkAuth()
    }, [dispatch])

    if (isAuthenticated === null) {
        return (
            <ImageBackground
                source={require("../assets/Images/SplashScreen.png")}
                style={{ width: wp(100), height: '100%' }}
                resizeMode="cover"
            />
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
                {isAuth ? (
                    <Stack.Screen
                        name="App"
                        component={AppRoute}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <Stack.Screen
                        name="Auth"
                        component={AuthRoute}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;