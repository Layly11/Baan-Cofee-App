import { RNButton } from "@/sources/common"
import { onAuthChange } from "@/sources/redux/Reducers/AuthReducers"
import { clearAuthData } from "@/sources/utils/auth"
import { Text, View } from "react-native"
import { useDispatch } from "react-redux"

const Home = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        clearAuthData()
        dispatch(onAuthChange(false))
    }
    return (
        <View>
            <Text>Home</Text>
            <RNButton
                title="Next"
                onPress={handleLogout}
            />
        </View>
    )
}
export default Home