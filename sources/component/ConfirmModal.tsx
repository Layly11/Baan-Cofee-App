import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Colors, FontFamily, FontSize, hp, wp} from '../theme';
import {RNButton, RNStyles, RNText} from '../common';

interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  subTitle?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
  title = 'Log out',
  subTitle = 'Are you sure you want to log out?',
  confirmText = 'Log out',
  cancelText = 'Cancel',
}: ConfirmModalProps) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalBox}>
              <View style={{gap: hp(1)}}>
                <RNText
                  size={FontSize.font22}
                  family={FontFamily.SemiBold}
                  align={'center'}
                >{title}</RNText>
                {subTitle && (
                  <RNText
                    size={FontSize.font16}
                    family={FontFamily.Medium}
                    color={Colors.Brown}
                    align={'center'}
                  >{subTitle}</RNText>
                )}
              </View>

              <View style={{...RNStyles.flexRowBetween, gap: wp(5)}}>
                <RNButton
                  title={cancelText}
                  onPress={onCancel}
                  style={{
                    width: wp(40),
                    backgroundColor: Colors.Transparent,
                    borderWidth: 1,
                    borderColor: Colors.DarkBrown,
                  }}
                  textStyle={{color: Colors.DarkBrown}}
                />
                <RNButton
                  title={confirmText}
                  onPress={onConfirm}
                  style={{width: wp(40)}}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(4),
    width: wp(100),
    alignItems: 'center',
    gap: hp(2),
  },
  // button: {
  //   width: wp(45),
  //   marginHorizontal: wp(1),
  //   paddingVertical: hp(2),
  // },
});
