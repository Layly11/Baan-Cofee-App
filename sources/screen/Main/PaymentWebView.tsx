import { NavRoutes } from "@/sources/navigation";
import { PayForQRRequester } from "@/sources/utils/requestUtils";

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function PaymentWebView({ navigation, route }: any) {
    const { url, method, bill_reference_1, amount } = route.params
    const [isPaying, setIsPaying] = useState(false);
    const handleClickToPay = async() => {

       if (isPaying) {
        Alert.alert("Already Paying", "You have already clicked to pay.");
        return; 
    }
    setIsPaying(true);
        try {
           await PayForQRRequester({bill_reference_1, amount})
           Alert.alert("You have Pay", "Pay Successful")

           navigation.navigate(NavRoutes.PAYMENT_RESULT, {result: true, amount})
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    if(isPaying){
                        navigation.navigate(NavRoutes.PAYMENT_RESULT, {result: true, amount})
                    }else {
                         navigation.goBack()
                    }

                }}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>

                {method === 'qr' && (
                    <TouchableOpacity onPress={handleClickToPay} style={styles.rightButton}>
                        <Text style={styles.payText}>Click to Pay</Text>
                    </TouchableOpacity>
                )}
            </View>

            <WebView
                source={{ uri: url }}
                style={{ flex: 1 }}
                onMessage={async (event) => {
                    const data = JSON.parse(event.nativeEvent.data);
                    console.log("Status: ", data)
                    if (data.message === 'true') {
                        navigation.replace(NavRoutes.PAYMENT_RESULT, { result: true, reference: data.reference });

                    } else {
                        navigation.replace(NavRoutes.PAYMENT_RESULT, { result: false });
                    }
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    leftButton: {
        padding: 5,
    },
    rightButton: {
        padding: 5,
    },
    closeText: {
        fontSize: 16,
        color: "blue",
    },
    payText: {
        fontSize: 16,
        color: "green",
        fontWeight: "bold",
    },
});