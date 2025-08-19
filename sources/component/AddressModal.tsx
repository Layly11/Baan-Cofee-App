import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {Colors, FontSize, wp, hp, normalize, FontFamily} from '../theme';
import {RNButton, RNInput, RNStyles, RNText} from '../common';

interface AddAddressModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  defaultValues?: any;
  isEditing?: boolean;
}

const addressOptions = ['Home', 'Office', 'Other'];

// AddressModal.tsx (AddAddressModal)
const AddAddressModal = ({
  visible,
  onClose,
  onSave,
  defaultValues,
  isEditing = false,
}: AddAddressModalProps) => {
  const [addressType, setAddressType] = useState('Home');
  const [formData, setFormData] = useState({
    name: '',
    house_no: '',
    village: '',
    street: '',
    city: '',
  });

  useEffect(() => {
    if (visible) {
      if (isEditing && defaultValues) {
        setFormData({
          name: defaultValues.name || '',
          house_no: defaultValues.house_no || '',
          village: defaultValues.village || '',
          street: defaultValues.street || '',
          city: defaultValues.city || '',
        });
        setAddressType(defaultValues.type || 'Home');
      } else {
        setFormData({ name: '', house_no: '', village: '', street: '', city: '' });
        setAddressType('Home');
      }
    }
  }, [visible, isEditing, defaultValues]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // validate ง่ายๆ
    if (!formData.name.trim()) {
      // เปลี่ยนเป็น RNText แสดง error ก็ได้
      alert('Please enter a name');
      return;
    }
    if (!formData.house_no.trim()) {
      alert('Please enter house_no');
      return;
    }
    if (!formData.street.trim()) {
      alert('Please enter street/area');
      return;
    }
    if (!formData.city.trim()) {
      alert('Please enter city');
      return;
    }

    const payload = {
      type: addressType,
      name: formData.name.trim(),
      house_no: formData.house_no.trim(),
      village: formData.village.trim(),
      street: formData.street.trim(),
      city: formData.city.trim(),
    };
    onSave(payload);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* แบ็คดรอป: กดนอกกล่องจะปิด + ปิดคีย์บอร์ด */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <View style={styles.overlay}>
          {/* กันไม่ให้กดภายในกล่องแล้วไปโดน onClose ของ overlay */}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.keyboardAvoiding}
            >
              <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                  <View style={{ gap: hp(1.5) }}>
                    <RNText size={FontSize.font18} family={FontFamily.Black}>
                      {isEditing ? 'Edit Address' : 'Save this Address as'}
                    </RNText>

                    <View style={styles.addressType}>
                      {addressOptions.map(option => (
                        <TouchableOpacity
                          key={option}
                          onPress={() => setAddressType(option)}
                          style={[
                            styles.typeButton,
                            { backgroundColor: addressType === option ? Colors.DarkBrown : Colors.Beige },
                          ]}
                        >
                          <RNText
                            color={addressType === option ? Colors.White : Colors.DarkBrown}
                            family={FontFamily.SemiBold}
                          >
                            {option}
                          </RNText>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <RNText size={FontSize.font18} family={FontFamily.Black}>
                      {isEditing ? 'Update Address Details' : 'Add Address'}
                    </RNText>

                    <RNInput
                      placeholder="Name"
                      style={{ fontSize: FontSize.font16 }}
                      value={formData.name}
                      onChangeText={(t:any) => handleChange('name', t)}
                    />

                    <View style={{ flexDirection: 'row', gap: wp(2) }}>
                      <RNInput
                        placeholder="House No."
                        inputStyle={{ flex: 1 }}
                        style={{ fontSize: FontSize.font16 }}
                        value={formData.house_no}
                        onChangeText={(t:any) => handleChange('house_no', t)}
                      />
                      <RNInput
                        placeholder="Village Name"
                        inputStyle={{ flex: 1 }}
                        style={{ fontSize: FontSize.font16 }}
                        value={formData.village}
                        onChangeText={(t:any) => handleChange('village', t)}
                      />
                    </View>

                    <RNInput
                      placeholder="Street Name/Area"
                      style={{ fontSize: FontSize.font16 }}
                      value={formData.street}
                      onChangeText={(t:any) => handleChange('street', t)}
                    />
                    <RNInput
                      placeholder="City"
                      style={{ fontSize: FontSize.font16 }}
                      value={formData.city}
                      onChangeText={(t:any) => handleChange('city', t)}
                    />

                    <RNButton
                      title={isEditing ? 'Update Address' : 'Save Address'}
                      style={{ marginTop: hp(2) }}
                      onPress={handleSave}
                    />
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddAddressModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'flex-end',
  },
  keyboardAvoiding: {
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: normalize(40),
    borderTopRightRadius: normalize(40),
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
  },
  sectionTitle: {
    fontSize: FontSize.font18,
    fontFamily: FontFamily.Bold,
    paddingBottom: hp(0.5),
  },
  addressType: {
    ...RNStyles.flexRowCenter,
    gap: wp(3),
  },
  typeButton: {
    flex: 1,
    borderRadius: normalize(50),
    paddingVertical: hp(2),
    paddingHorizontal: wp(7),
    alignItems: 'center',
  },
});
