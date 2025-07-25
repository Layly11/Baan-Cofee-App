import React from 'react'
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from './redux'
import Routes from './navigation/Routes';

SplashScreen.preventAutoHideAsync()

const App = () => {
    const [fontsLoaded] = useFonts({
        "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
        "Lato-Medium": require("./assets/fonts/Lato-Medium.ttf"),
        "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
    });

    React.useEffect(() => {
        if(fontsLoaded){
             SplashScreen.hideAsync();
        }
    },[fontsLoaded])

    if(!fontsLoaded){
        return null;
    }

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <Routes />
            </Provider>
        </SafeAreaProvider>
    )
}

export default App