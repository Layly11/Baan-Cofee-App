import { RNButton, RNInput, RNText } from "@/sources/common";
import { Images } from "@/sources/constants";
import { NavRoutes } from "@/sources/navigation";
import { Colors, FontFamily, FontSize, hp, isIOS, wp } from "@/sources/theme";
// import { forgotPasswordRequester } from "@/sources/utils/requestUtils";
import { isEmail } from "validator";
import { useState } from "react";
import {
    Alert,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SVG from "@/sources/constants/Svg";
import { checkCustomerExistRequester, forgotPasswordRequester } from "@/sources/utils/requestUtils";

const ForgotPassword = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState("");

    const handleSendReset = async () => {
        if (!isEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }
        try {
            const { emailExists } = await checkCustomerExistRequester({ email })

            if (!emailExists) {
                Alert.alert('Account Not Found', 'This email is not registered.');
                return;
            }
            navigation.navigate(NavRoutes.OTP, { email, redirectAfter: "forgot" });
            await forgotPasswordRequester({ email });
            Alert.alert("Success", "A OTP has been sent to your email.");
        } catch (err: any) {
            console.log(err.res_code);
            if(err.res_code === '0466') {
                Alert.alert('To Many Password Reset',err.message)
                 navigation.goBack()
            }
        }
    };

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <ImageBackground source={Images.AuthBack} style={styles.bg}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, justifyContent: "space-between" }}>
                            <View style={[styles.headerRow, { paddingTop: insets.top + hp(2), paddingHorizontal: wp(5) }]}>
                                <SVG.BACK onPress={() => navigation.goBack()} />
                                <RNText
                                    size={FontSize.font24}
                                    family={FontFamily.Bold}
                                    color={Colors.White}
                                    style={{ marginLeft: wp(3) }}
                                >
                                    Forgot Password
                                </RNText>
                            </View>

                            <View style={{ gap: hp(2), paddingHorizontal: wp(5) }}>
                                <RNText
                                    size={FontSize.font16}
                                    family={FontFamily.Medium}
                                    align="center"
                                    color={Colors.Brown}
                                >
                                    Enter your registered email address to receive an OTP.
                                </RNText>

                                <RNInput
                                    placeholder="Email"
                                    placeholderTextColor={Colors.Brown}
                                    style={styles.input}
                                    textContentType="emailAddress"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={{ marginBottom: hp(6) }}>
                                <RNButton
                                    title="Continue"
                                    onPress={handleSendReset}
                                    style={{ alignSelf: "center" }}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    bg: {
        width: wp(100),
        height: "100%",
    },
    input: {
        width: wp(90),
        backgroundColor: "#E8DACD",
        fontSize: FontSize.font16,
        alignSelf: "center",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    }
});
