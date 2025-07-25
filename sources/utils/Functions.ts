import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserData = async () => {
    const value = await AsyncStorage.getItem('user')
    return JSON.parse(value as any)
}

const setUserData = async (data:any) => {
    await AsyncStorage.setItem('user', JSON.stringify(data))
}

const Functions = {
    getUserData,
    setUserData
}

export default Functions;