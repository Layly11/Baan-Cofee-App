import * as ImagePicker from 'expo-image-picker';
import { RNButton, RNHeader, RNImage, RNInput, RNText } from "@/sources/common";
import ConfirmModal from "@/sources/component/ConfirmModal";
import SVG from "@/sources/constants/Svg";
import { onAuthChange, setAsyncStorageValue } from "@/sources/redux/Reducers/AuthReducers";
import { Colors, FontSize, hp, isIOS, normalize, wp } from "@/sources/theme";
import { clearAuthData } from "@/sources/utils/auth";
import { useMemo, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { deleteProfileRequester, updateProfileRequester, uploadProfileImageRequester } from '@/sources/utils/requestUtils';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

const EditProfile = ({ navigation, route }: any) => {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const { profile } = route.params;
    const [pickedImageUri, setPickedImageUri] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [userData, setUserData] = useState({
        id: profile.id,
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        profile_img: profile.profile_img || ""
    });

    const errors = useMemo(() => {
        const e: Record<string, string> = {};
        if (!userData.name.trim()) e.name = "Name is required";
        if (!emailRegex.test(userData.email.trim())) e.email = "Invalid email";
        if (!phoneRegex.test(userData.phone.trim())) e.phone = "Phone must be 10 digits";
        return e;
    }, [userData]);

    const canSave = useMemo(
        () => !saving && !uploading && Object.keys(errors).length === 0,
        [saving, uploading, errors]
    );
    const pickImage = async () => {
        // ขอ permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access gallery is required.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.9,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            setPickedImageUri(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!userData.id) {
            alert('User id not found');
            return;
        }
        try {
            setSaving(true);
            let newUrl = userData.profile_img;
            if (pickedImageUri) {
                setUploading(true);

                const upRes = await uploadProfileImageRequester({ userId: userData.id, uri: pickedImageUri })
                newUrl = upRes?.data?.imageUrl || '';
                setUploading(false);
            }

            const payload = {
                id: userData.id,
                name: userData.name.trim(),
                email: userData.email.trim(),
                phone: userData.phone.trim(),
            };

            const resp = await updateProfileRequester(payload);

            const updatedUser = resp?.user
                ? { ...resp.user, profile_img: newUrl || resp.user.profile_img }
                : { ...userData, ...payload, profile_img: newUrl };

            // 3) อัปเดต Redux ให้จออื่นเห็นทันที
            dispatch(setAsyncStorageValue({ user: updatedUser }));

            alert('Profile saved.');
            navigation.goBack();

        } catch (err: any) {
            console.log(err);
            alert(err?.response?.data?.res_desc || 'Save failed');
        }
    }

    const handelAlertSave = () => {
        Alert.alert("Cannot Save Profile", "Please make sure all fields are filled correctly before saving.")
    }

    const handleDeleteAccount = async () => {
        setModalVisible(false);
        try {

            const res = await deleteProfileRequester()
            console.log("res: ", res)
            dispatch(onAuthChange(false))
            dispatch(setAsyncStorageValue({}));
            clearAuthData()
        } catch (err) {
             console.log(err);
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <RNHeader
                containerStyle={styles.header}
                LeftSvg={SVG.BACK}
                title={"Edit Profile"}
                RightText={saving || uploading ? "Saving..." : "Save"}
                onRightPress={canSave ? handleSave : handelAlertSave}
            />
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <View style={styles.profileImageContainer}>
                    {(pickedImageUri || userData.profile_img) ? (
                        <RNImage
                            source={{ uri: pickedImageUri ?? userData.profile_img }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <SVG.PROFILE width={wp(26)} height={wp(26)} style={styles.avatar} />
                    )}
                    <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                        <SVG.EDIT width={wp(5)} height={wp(5)} />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: wp(5), gap: hp(2) }}>
                    <RNInput
                        value={userData.name}
                        onChangeText={(text: any) => setUserData({ ...userData, name: text })}
                        placeholder={"Full Name"}
                        style={{ fontSize: FontSize.font16 }}
                        placeholderTextColor={Colors.Placeholder}
                    />
                    {errors.name ? <RNText color={Colors.Red}>{errors.name}</RNText> : null}

                    <RNInput
                        value={userData.phone}
                        onChangeText={(text: any) => setUserData({ ...userData, phone: text })}
                        placeholder={"Phone No."}
                        maxLength={10}
                        style={{ fontSize: FontSize.font16 }}
                        placeholderTextColor={Colors.Placeholder}
                        keyboardType="phone-pad"
                    />
                    {errors.phone ? <RNText color={Colors.Red}>{errors.phone}</RNText> : null}

                    <RNInput
                        value={userData.email}
                        onChangeText={(text: any) => setUserData({ ...userData, email: text })}
                        placeholder={"Email"}
                        style={{ fontSize: FontSize.font16 }}
                        placeholderTextColor={Colors.Placeholder}
                    />
                    {errors.email ? <RNText color={Colors.Red}>{errors.email}</RNText> : null}
                </View>

                <View style={styles.deleteButton}>
                    <RNButton
                        title={"Delete Account"}
                        onPress={() => setModalVisible(true)}
                    />
                </View>

                <ConfirmModal
                    visible={modalVisible}
                    title={"Delete Account"}
                    subTitle={"Are you sure you want to Delete your Account?"}
                    cancelText={"Cancel"}
                    confirmText={"Delete"}
                    onConfirm={handleDeleteAccount}
                    onCancel={() => setModalVisible(false)}
                />
            </View>
        </View>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.DarkBrown,
        paddingTop: isIOS ? hp(7) : hp(5),
        borderBottomLeftRadius: normalize(50),
        borderBottomRightRadius: normalize(50),
        paddingHorizontal: wp(6),
        paddingBottom: hp(2.5),
    },
    container: {
        flex: 1,
        gap: hp(1.5),
        backgroundColor: Colors.White,
    },
    profileImageContainer: {
        alignItems: "center",
        marginVertical: hp(4),
    },
    profileImage: {
        width: wp(26),
        height: wp(26),
        borderRadius: normalize(100),
    },
    editIcon: {
        position: "absolute",
        bottom: hp(0),
        right: wp(37.5),
        backgroundColor: Colors.Beige,
        padding: wp(1),
        borderRadius: normalize(50),
    },
    deleteButton: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: isIOS ? hp(0) : hp(1),
    },
    avatar: {
        height: wp(20),
        width: wp(20),
        borderRadius: normalize(50),
        backgroundColor: Colors.Beige,
    },
});
