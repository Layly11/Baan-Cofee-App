import {
    RNButton, RNInput, RNStyles, RNText
} from "@/sources/common";
import { Images } from "@/sources/constants";
import { NavRoutes } from "@/sources/navigation";
import { Colors, FontFamily, FontSize, hp, isIOS, wp } from "@/sources/theme";
import { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
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
import SVG from "@/sources/constants/Svg";
import { checkCustomerExistRequester, registerCustomerRequester } from "@/sources/utils/requestUtils";
import validator from 'validator'
import { useFocusEffect } from "@react-navigation/native";

const Register = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const phoneRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const isPasswordStrong = (password: string): boolean => {
        const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;
        return passwordPolicy.test(password);
    };


    useFocusEffect(
        useCallback(() => {
            setName("")
            setEmail("");
            setPassword("");
            setPhone("")

            return () => {
            };
        }, [])
    );

    const handleRegister = async () => {
        if (!name.trim() || !validator.isEmail(email) || phone.length !== 10) {
            Alert.alert('Required Register Details','Please fill in all fields correctly.');
            return;
        }
        if (!isPasswordStrong(password)) {
            Alert.alert('Invalid Password Policy','Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
            return;
        }

        try {
            setLoading(true)

             const {emailExists, phoneExists} = await checkCustomerExistRequester({email, phone});

             if(emailExists){
                 Alert.alert('Email has been exist','Email is already registered')
                 return
             } 
             if(phoneExists) {
                 Alert.alert('Phone has been exist','Phone is already registered')
                 return
             }
             navigation.navigate(NavRoutes.OTP, { email, redirectAfter:'register' })
            await registerCustomerRequester({ name, email, password, phone })
        } catch (err: any) {
            console.log(err.res_code)
            console.error(err)
        } finally {
            setLoading(false)
        }
    };


    if (loading) {
        return (
            <View style={[styles.root, RNStyles.center]}>
                <ActivityIndicator size="large" color={Colors.Brown} />
                <RNText style={{ marginTop: 10, color: Colors.Brown }}>
                    Loading...
                </RNText>
            </View>
        )
    }

    return (
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

    );
};

export default Register;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.White,
    },
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
