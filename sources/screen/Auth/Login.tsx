import { RNButton, RNInput, RNStyles, RNText } from "@/sources/common"
import { Images } from "@/sources/constants"
import { NavRoutes } from "@/sources/navigation"
import { onAuthChange, setAsyncStorageValue } from "@/sources/redux/Reducers/AuthReducers"
import { Colors, FontFamily, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme"
import { saveAuthData } from "@/sources/utils/auth"
import { LoginCustomerRequester, resendOtpRequester } from "@/sources/utils/requestUtils"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useRef, useState } from "react"
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"
import { isEmail } from 'validator'

const Login = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const phoneRef = useRef<TextInput>(null);

    const handleLogin = async () => {
        if (!isEmail(email) || password.length < 6) {
            alert("Enter valid email and password (min 6 characters)");
            return;
        }

        try {

            const res = await LoginCustomerRequester({ email, password })
            await saveAuthData(res.data.token)
            dispatch(onAuthChange(true))
            dispatch(setAsyncStorageValue({ user: res.data.customer }));

        } catch (err: any) {
            console.log(err)
            if (err.res_code === '0404') {
                alert('Email or Password Invalid')
            }
            if (err.res_code === '0410') {
                try {
                    navigation.navigate(NavRoutes.OTP, { email, password, redirectAfter: "login" });
                    alert('Account not verified. Please verify your email before logging in.')
                    await resendOtpRequester({ email });
                } catch (err:any) {
                    if(err.res_code === "0499"){
                        alert(err.message)
                        return
                    }
                    alert("Failed to resend OTP. Please try again later.");
                    console.error(err);
                }
            }

            if(err.res_code === '0488') {
                alert(err.message)
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            setEmail("");
            setPassword("");

            return () => {
            };
        }, [])
    );



    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <ImageBackground source={Images.AuthBack} style={{ width: wp(100), height: "100%" }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, justifyContent: "space-between" }}>
                            <RNText
                                size={FontSize.font30}
                                family={FontFamily.Bold}
                                color={Colors.White}
                                align="center"
                                pTop={hp(6)}
                            >
                                Welcome!
                            </RNText>

                            <View style={{ gap: hp(1.5) }}>
                                <RNText
                                    size={FontSize.font20}
                                    family={FontFamily.Bold}
                                    align="center"
                                    pHorizontal={wp(12)}
                                >
                                    Login to your account
                                </RNText>

                                <View style={{ paddingHorizontal: wp(5), gap: hp(1) }}>
                                    <RNInput
                                        placeholder="Email"
                                        placeholderTextColor={Colors.Brown}
                                        style={styles.input}
                                        textContentType="emailAddress"
                                        maxLength={30}
                                        value={email}
                                        onChangeText={setEmail}
                                        returnKeyType="next"
                                        onSubmitEditing={() => phoneRef.current?.focus()}
                                    />
                                    <RNInput
                                        ref={phoneRef}
                                        placeholder="Password"
                                        placeholderTextColor={Colors.Brown}
                                        style={styles.input}
                                        secureTextEntry
                                        textContentType="none"
                                        autoComplete="off"
                                        value={password}
                                        onChangeText={setPassword}
                                        returnKeyType="done"
                                        onSubmitEditing={handleLogin}
                                    />
                                </View>

                                <RNText
                                    size={FontSize.font14}
                                    family={FontFamily.Bold}
                                    color={Colors.Brown}
                                    align="center"
                                    pHorizontal={wp(3)}
                                >
                                    Don’t have an account?{" "}
                                    <RNText
                                        size={FontSize.font14}
                                        family={FontFamily.Bold}
                                        color={Colors.Brown}
                                        style={{ textDecorationLine: "underline" }}
                                        onPress={() => navigation.navigate(NavRoutes.REGISTER)}
                                    >
                                        Register
                                    </RNText>
                                </RNText>
                            </View>

                            <RNButton
                                title="Next"
                                style={{ bottom: isIOS ? hp(3) : hp(5) }}
                                onPress={handleLogin}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>

    );
};

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    input: {
        width: wp(90),
        backgroundColor: "#E8DACD",
        fontSize: FontSize.font16,
    },
    otpContainer: {
        ...RNStyles.flexRowCenter,
        gap: wp(5),
        marginTop: hp(2),
    },
    otpInput: {
        backgroundColor: "#E8DACD",
        width: wp(16),
        height: wp(16),
        borderRadius: normalize(50),
        textAlign: "center",
        fontSize: FontSize.font20,
        fontFamily: FontFamily.Medium,
        color: Colors.Brown,
    },
});
