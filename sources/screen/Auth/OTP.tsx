import { RNButton, RNHeader, RNStyles, RNText } from "@/sources/common";
import { Images } from "@/sources/constants";
import SVG from "@/sources/constants/Svg";
import { NavRoutes } from "@/sources/navigation";
import { onAuthChange, setAsyncStorageValue } from "@/sources/redux/Reducers/AuthReducers";
import { Colors, FontFamily, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme";
import { saveAuthData } from "@/sources/utils/auth";
import { LoginCustomerRequester, resendOtpRequester, resendResetOtpRequester, verifyOtpRequester, verifyResetOtpRequester } from "@/sources/utils/requestUtils";
import { useRef, useState } from "react";
import { Alert, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const OTP = ({ navigation, route }: any) => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { email, password, redirectAfter } = route.params;
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpRefs = useRef([]) as any;


    const handleNext = async () => {
        if (otp.join("").length !== 6) {
            Alert.alert("OTP Invalid", "Enter full 6-digit OTP");
            return;
        }

        try {
            const joinedOtp = otp.join("");
            await verifyOtpRequester({ email, otp: joinedOtp })
            Alert.alert('OTP Verified Successfully!', 'Your account has been verified.')

            if (redirectAfter === 'login') {
                const res = await LoginCustomerRequester({ email, password })
                await saveAuthData(res.data.token)
                dispatch(onAuthChange(true))
                dispatch(setAsyncStorageValue({ user: res.data.customer }));
            } else {
                navigation.navigate(NavRoutes.LOGIN);
            }
        } catch (err: any) {
            console.log(err.message)
            if (err.res_code === '0499') {
                Alert.alert('Too many OTP attempts', err.message)
                return
            }
            Alert.alert('OTP Invalid', 'Please try again')
        }
    };

    const handelResetPassword = async () => {
        if (otp.join("").length !== 6) {
            Alert.alert("OTP Invalid", "Enter full 6-digit OTP");
            return;
        }

        try {
            const joinedOtp = otp.join("");
            await verifyResetOtpRequester({ email, otp: joinedOtp })
            navigation.navigate(NavRoutes.LOGIN);
        } catch (err) {
            console.log(err)
        }
    }

    const handleOtpChange = (text: string, index: number) => {
        if (text.length > 1) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = text;
        setOtp(updatedOtp);
        if (text && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleResendOtp = async () => {
        try {
            if (redirectAfter === 'forgot') {
                await resendResetOtpRequester({ email })
                Alert.alert("OTP has been resent", "OTP has been resent to your email.");
                setOtp(["", "", "", "", "", ""]);
                otpRefs.current[0]?.focus();
            } else {
                await resendOtpRequester({ email });
                Alert.alert("OTP has been resent", "OTP has been resent to your email.");
                setOtp(["", "", "", "", "", ""]);
                otpRefs.current[0]?.focus();
            }
        } catch (err: any) {
            console.log(err.res_code)
            if (err.res_code === '0499') {
                Alert.alert('Too many OTP attempts', err.message)
                return
            }
            if(err.res_code === '0477'){
                 Alert.alert('Too many OTP attempts', err.message)
                return
            }
            if(err.res_code === '0413') {
                Alert.alert('Too many OTP attempts', 'Please wait a moment before requesting a new OTP.')
                return
            }
            Alert.alert("Failed to resend OTP", "Please try again.");
            console.error(err);
        }
    }

    const renderInputFields = () => (
        <View style={styles.otpContainer}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                    key={index}
                    ref={(ref: any) => (otpRefs.current[index] = ref)}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    returnKeyType={index === 5 ? "done" : "next"}
                    value={otp[index]}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={({ nativeEvent }) => {
                        if (
                            nativeEvent.key === "Backspace" &&
                            otp[index] === "" &&
                            index > 0
                        ) {
                            otpRefs.current[index - 1]?.focus();
                        }
                    }}
                    onSubmitEditing={() => {
                        if (index === 5) handleNext();
                        else otpRefs.current[index + 1]?.focus();
                    }}
                />
            ))}
        </View>
    );

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <ImageBackground
                source={Images.AuthBack}
                style={{ width: wp(100), height: "100%" }}
            >

                <RNHeader
                    LeftSvg={SVG.BACK}
                    onLeftPress={() => navigation.goBack()}
                    containerStyle={{ paddingTop: insets.top }}
                />

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, justifyContent: "space-between" }}>
                            <RNText
                                size={FontSize.font30}
                                family={FontFamily.Bold}
                                color={Colors.White}
                                align="center"
                                pTop={hp(0)}
                            >Verify Your OTP</RNText>
                            <View style={{ gap: hp(1.5) }}>
                                <RNText
                                    size={FontSize.font14}
                                    family={FontFamily.Bold}
                                    align="center"
                                    pHorizontal={wp(12)}
                                >Enter the OTP sent to {email}</RNText>

                                <View style={{ paddingHorizontal: wp(5), gap: hp(1) }}>
                                    {renderInputFields()}
                                </View>


                                <RNText
                                    size={FontSize.font14}
                                    family={FontFamily.Bold}
                                    color={Colors.Brown}
                                    align="center"
                                    pHorizontal={wp(3)}
                                >
                                    Don’t receive code?{" "}
                                    <RNText
                                        size={FontSize.font14}
                                        family={FontFamily.Bold}
                                        color={Colors.Brown}
                                        style={{ textDecorationLine: "underline" }}
                                        onPress={handleResendOtp}
                                    >Resend</RNText>
                                </RNText>
                            </View>


                            <RNButton
                                title={"Next"}
                                style={{ bottom: isIOS ? hp(3) : hp(5) }}
                                onPress={redirectAfter === 'forgot' ? handelResetPassword : handleNext}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    )
}

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
        gap: wp(3),
        marginTop: hp(2),
    },
    otpInput: {
        backgroundColor: "#E8DACD",
        width: wp(12),
        height: wp(12),
        borderRadius: normalize(50),
        textAlign: "center",
        fontSize: FontSize.font20,
        fontFamily: FontFamily.Medium,
        color: Colors.Brown,
    },
});


export default OTP;