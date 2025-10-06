import React, { useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  TextInput,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

import { RNButton, RNInput, RNStyles, RNText } from "@/sources/common";
import { Colors, FontFamily, FontSize, hp, isIOS, wp } from "@/sources/theme";
import { Images } from "@/sources/constants";
import SVG from "@/sources/constants/Svg";
import { resetPasswordRequester } from "@/sources/utils/requestUtils";
import { NavRoutes } from "@/sources/navigation";


const NewPassword = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  // รองรับทั้งกรณีส่ง token หรือ email/otp มาทาง route
  const {  email } = route.params

  const newPassRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPasswordStrong = (password: string): boolean => {
    const policy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;
    return policy.test(password);
  };

  const errorText = useMemo(() => {
    if (!newPassword && !confirmPassword) return "";
    if (!isPasswordStrong(newPassword))
      return "Password must be 8+ chars & include A-Z, a-z, 0-9, and special character.";
    if (confirmPassword && newPassword !== confirmPassword)
      return "Passwords do not match.";
    return "";
  }, [newPassword, confirmPassword]);

  const canSubmit = useMemo(() => {
    return (
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      isPasswordStrong(newPassword) &&
      newPassword === confirmPassword &&
      !loading
    );
  }, [newPassword, confirmPassword, loading]);

  const handleSubmit = async () => {
    if (!canSubmit) {
        Alert.alert('Invalid Password', 'Please fill in all fields correctly. ')
        return
    }

    try {
      setLoading(true);
      await resetPasswordRequester({email, newPassword})
      Alert.alert("Success", "Password has been reset.");
      navigation.navigate(NavRoutes.LOGIN);
    } catch (err: any) {
      // แสดงข้อความจาก backend ถ้ามี

      console.log(err.res_code)
      const msg =
        err?.response?.data?.res_desc ||
        err?.res_desc ||
        "Unable to reset password, please try again.";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.root, RNStyles.center]}>
        <ActivityIndicator size="large" color={Colors.Brown} />
        <RNText style={{ marginTop: 10, color: Colors.Brown }}>Loading...</RNText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ImageBackground source={Images.AuthBack} style={{ width: wp(100), height: "100%" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              {/* Header */}
              <View style={[styles.headerRow, { paddingTop: insets.top + hp(2), paddingHorizontal: wp(5) }]}>
                <SVG.BACK onPress={() => navigation.goBack()} />
                <RNText
                  size={FontSize.font24}
                  family={FontFamily.Bold}
                  color={Colors.White}
                  style={{ marginLeft: wp(3) }}
                >
                  Reset Password
                </RNText>
              </View>

              {/* Form */}
              <View style={{ gap: hp(1.5) }}>
                <RNText
                  size={FontSize.font20}
                  family={FontFamily.Bold}
                  align="center"
                  pHorizontal={wp(12)}
                >
                  Enter your new password
                </RNText>

                <View style={{ paddingHorizontal: wp(5), gap: hp(1) }}>
                  <RNInput
                    ref={newPassRef}
                    placeholder="New Password"
                    placeholderTextColor={Colors.Brown}
                    style={styles.input}
                    secureTextEntry={!showNew}
                    textContentType="none"
                    autoComplete="off"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    returnKeyType="next"
                    onRightIconPress={() => setShowNew((s) => !s)}
                    onSubmitEditing={() => confirmRef.current?.focus()}
                  />

                  <RNInput
                    ref={confirmRef}
                    placeholder="Confirm New Password"
                    placeholderTextColor={Colors.Brown}
                    style={styles.input}
                    secureTextEntry={!showConfirm}
                    textContentType="none"
                    autoComplete="off"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    returnKeyType="done"
                    onRightIconPress={() => setShowConfirm((s) => !s)}
                    onSubmitEditing={handleSubmit}
                  />

                  {!!errorText && (
                    <RNText
                      size={FontSize.font14}
                      color={'red'}
                      style={{ marginTop: hp(0.5) }}
                    >
                      {errorText}
                    </RNText>
                  )}

                  {/* ตัวอย่างแถบความแข็งแรงแบบง่าย */}
                  <PasswordStrengthBar value={newPassword} />
                </View>
              </View>

              <RNButton
                title="Update Password"
                style={{ bottom: isIOS ? hp(3) : hp(5), alignSelf: "center" }}
                disabled={!canSubmit}
                onPress={handleSubmit}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default NewPassword;

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
  },
});

/** แถบแสดงความแข็งแรงของรหัสผ่านแบบง่าย */
const PasswordStrengthBar = ({ value }: { value: string }) => {
  const score = (() => {
    let s = 0;
    if (value.length >= 8) s++;
    if (/[A-Z]/.test(value)) s++;
    if (/[a-z]/.test(value)) s++;
    if (/\d/.test(value)) s++;
    if (/[^A-Za-z0-9]/.test(value)) s++;
    return s; // 0..5
  })();

  const widthPct = (score / 5) * 100;
  const color =
    score <= 2 ? 'red' : score === 3 ? 'orange' : 'green';

  return (
    <View style={{ width: wp(90), height: 8, backgroundColor: "#00000020", borderRadius: 8 }}>
      <View style={{ width: `${widthPct}%`, height: "100%", backgroundColor: color, borderRadius: 8 }} />
    </View>
  );
};
