import {
    RNButton, RNHeader, RNInput, RNText
} from "@/sources/common";
import { Images } from "@/sources/constants";
import { NavRoutes } from "@/sources/navigation";
import { Colors, FontFamily, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme";
import Functions from "@/sources/utils/Functions";
import { useRef, useState } from "react";
import {
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { onAuthChange, setAsyncStorageValue } from "@/sources/redux/Reducers/AuthReducers";
import SVG from "@/sources/constants/Svg";
import { registerCustomerRequester } from "@/sources/utils/requestUtils";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import validator from 'validator'
const Register = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const phoneRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name.trim() || !validator.isEmail(email) || password.length < 6 || phone.length !== 10) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Invalid Input',
                textBody: 'Please fill in all fields correctly.',
                autoClose: 1500,
            });
            return;
        }

        try {
            setLoading(true)
            await registerCustomerRequester({ name, email, password, phone })

            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Register Success',
                textBody: 'Your account has been created.',
                autoClose: 1000,
                onHide: () => {navigation.navigate(NavRoutes.LOGIN)}
            });
        } catch (err: any) {
            console.log(err.res_code)
            if (err.res_code === "0401") {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Email is already registered',
                    textBody: 'This email is already registered.',
                    autoClose: 1500,
                });
            } else if (err.res_code === "0402") {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Phone is already registered',
                    textBody: 'This Phone is already registered.',
                    autoClose: 1500,
                });
            }
            else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Something went wrong.',
                    autoClose: 1500,
                });
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <AlertNotificationRoot>
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <ImageBackground source={Images.AuthBack} style={{ width: wp(100), height: "100%" }}>
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
                                        Create Account
                                    </RNText>
                                </View>



                                <View style={{ gap: hp(1.5) }}>
                                    <RNText
                                        size={FontSize.font20}
                                        family={FontFamily.Bold}
                                        align="center"
                                        pHorizontal={wp(12)}
                                    >
                                        Fill in your details to get started
                                    </RNText>

                                    <View style={{ paddingHorizontal: wp(5), gap: hp(1) }}>
                                        <RNInput
                                            placeholder="Full Name"
                                            placeholderTextColor={Colors.Brown}
                                            style={styles.input}
                                            value={name}
                                            onChangeText={setName}
                                            returnKeyType="next"
                                            onSubmitEditing={() => phoneRef.current?.focus()}
                                        />
                                        <RNInput
                                            ref={phoneRef}
                                            placeholder="Phone Number"
                                            placeholderTextColor={Colors.Brown}
                                            keyboardType="phone-pad"
                                            textContentType="telephoneNumber"
                                            style={styles.input}
                                            maxLength={10}
                                            value={phone}
                                            onChangeText={setPhone}
                                            returnKeyType="next"
                                            onSubmitEditing={() => passwordRef.current?.focus()}
                                        />
                                        <RNInput
                                            placeholder="Email"
                                            placeholderTextColor={Colors.Brown}
                                            style={styles.input}
                                            keyboardType="email-address"
                                            textContentType="emailAddress"
                                            autoCapitalize="none"
                                            value={email}
                                            onChangeText={setEmail}
                                            returnKeyType="next"
                                        />
                                        <RNInput
                                            ref={passwordRef}
                                            placeholder="Password"
                                            placeholderTextColor={Colors.Brown}
                                            style={styles.input}
                                            secureTextEntry
                                            textContentType="none"
                                            autoComplete="off"
                                            value={password}
                                            onChangeText={setPassword}
                                            returnKeyType="done"
                                            onSubmitEditing={handleRegister}
                                        />
                                    </View>

                                    <RNText
                                        size={FontSize.font14}
                                        family={FontFamily.Bold}
                                        color={Colors.Brown}
                                        align="center"
                                        pHorizontal={wp(3)}
                                    >
                                        Already have an account?{" "}
                                        <RNText
                                            style={{ textDecorationLine: "underline" }}
                                            color={Colors.Brown}
                                            onPress={() => navigation.navigate(NavRoutes.LOGIN)}
                                        >
                                            Login
                                        </RNText>
                                    </RNText>
                                </View>

                                <RNButton
                                    title="Register"
                                    style={{ bottom: isIOS ? hp(3) : hp(5) }}
                                    onPress={handleRegister}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>

        </AlertNotificationRoot>

    );
};

export default Register;

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
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    }
});
