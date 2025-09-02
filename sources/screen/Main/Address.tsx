import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Colors,
  FontFamily,
  FontSize,
  hp,
  isIOS,
  normalize,
  wp,
} from "../../theme";
import SVG from "../../constants/Svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RNButton, RNHeader, RNStyles, RNText } from "@/sources/common";
import AddAddressModal from "@/sources/component/AddressModal";
import { createAddressRequester, deleteAddressRequester, fetchAddressRequester, updateAddressRequester } from "@/sources/utils/requestUtils";
import ConfirmModal from "@/sources/component/ConfirmModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Address.tsx
const Address = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingData, setEditingData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // เก็บรายการที่แก้ไขได้จริง (แทนที่ const addressList เดิม)
  const [addresses, setAddresses] = useState([]) as any;
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const fetchAddress = async () => {
    try {
      const res = await fetchAddressRequester()
      setAddresses(res.data.address)
      console.log(res.data.address)

      const storeId = await AsyncStorage.getItem('selectedAddressId')
      if(storeId) setSelectedAddressId(Number(storeId))
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => { 
    fetchAddress()
  }, [])

  const openAdd = () => {
    setEditMode(false);
    setEditingData(null);
    setModalVisible(true);
  };

  const openEdit = (item: any) => {
    setEditMode(true);
    setEditingData(item);
    setModalVisible(true);
  };

  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setModalDeleteVisible(true);
  };
  const onDelete = async (id: number) => {
    try {
      const res = await deleteAddressRequester(id)
      console.log("Res: ", res)
      if (res.res_code === '1111') {
        setAddresses((prev: any) => prev.filter((a: any) => a.id !== id));

        if (selectedAddressId === id) {
        setSelectedAddressId(null);
        await AsyncStorage.removeItem('selectedAddressId');
      }

        setSelectedId(null);
      } else {
        Alert.alert("Delete failed", "Something went wrong")
      }
      // setAddresses((prev: any) => prev.filter((a: any) => a.id !== id));
    } catch (err) {
      console.log("Delete error: ", err);
    }
  };

  const handleSaveModal = async (data: any) => {
    console.log("Data: ", data)
    try {
      if (editMode && editingData?.id) {
        const res = await updateAddressRequester(editingData.id, data);
        setAddresses((prev: any) =>
          prev.map((a: any) =>
            a.id === editingData.id ? res.data.address : a
          )
        );
      } else {
        const res = await createAddressRequester(data)
        setAddresses((prev: any) => [...prev, res.data.address]);
      }
      setModalVisible(false);
      setEditMode(false);
      setEditingData(null);
    } catch (err) {
      console.log(err)
    }
  };

   const selectAddress = async (id: number) => {
    setSelectedAddressId(id);
    await AsyncStorage.setItem('selectedAddressId', id.toString());
  };

  return (
    <View style={{ flex: 1 }}>
      <RNHeader
        containerStyle={styles.header}
        LeftSvg={SVG.BACK}
        onLeftPress={() => {
          if (route?.params?.fromDrawer) navigation.openDrawer();
          else navigation.goBack();
        }}
        title={"My Addresses"}
      />
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {addresses.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.addressCard,
              selectedAddressId === item.id && { borderColor: Colors.DarkBrown, borderWidth: 2 },
            ]}
            onPress={() => selectAddress(item.id)}
          >
            <View style={RNStyles.flexRowBetween}>
              <RNText size={FontSize.font18} family={FontFamily.Bold}>
                {item.name || item.type}
              </RNText>
              <View style={RNStyles.flexRow}>
                <TouchableOpacity onPress={() => openEdit(item)} style={{ marginRight: wp(2) }}>
                  <SVG.EDIT />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <SVG.CLOSE />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[RNStyles.flexRow, { gap: wp(2) }]}>
              <SVG.LOCATION />
              <RNText color={Colors.Brown} size={FontSize.font15} style={{ width: wp(80) }}>
                {`${item.house_no ? item.house_no + ', ' : ''}${item.village ? item.village + ', ' : ''}${item.street}${item.city ? ', ' + item.city : ''}`}
              </RNText>
            </View>
          </TouchableOpacity>
        ))}

       
            <View style={styles.deleteButton}>
              <RNButton title={"Add New Address"} onPress={openAdd} />
            </View>



        <AddAddressModal
          visible={isModalVisible}
          onClose={() => {
            setModalVisible(false);
            setEditMode(false);
            setEditingData(null);
          }}
          onSave={handleSaveModal}
          defaultValues={editingData}
          isEditing={editMode}
        />
        <ConfirmModal
          visible={modalDeleteVisible}
          title={"Delete Address"}
          subTitle={"Are you sure you want to Delete your Address?"}
          cancelText={"Cancel"}
          confirmText={"Delete"}
          onConfirm={() => {
            if (selectedId !== null) onDelete(selectedId);
            setModalDeleteVisible(false);
          }}
          onCancel={() => setModalDeleteVisible(false)}
        />
      </View>
    </View>
  );
};


export default Address;

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
    padding: wp(5),
    gap: hp(1.5),
    backgroundColor: Colors.White,
  },
  addressCard: {
    backgroundColor: Colors.White,
    borderRadius: normalize(20),
    padding: wp(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    gap: hp(1),
  },
  deleteButton: {
    flex: 1,
    justifyContent: "flex-end",
    bottom: isIOS ? hp(0) : hp(1),
  },
});
