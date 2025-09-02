import { NavRoutes } from "@/sources/navigation";
import { createOrderRequester } from "@/sources/utils/requestUtils";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function PaymentWebView({ navigation, route }: any) {
    const { url } = route.params
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>

            <WebView
                source={{ uri: url }}
                style={{ flex: 1 }}
                onMessage={async (event) => {
                    const data = JSON.parse(event.nativeEvent.data);
                    console.log("Payment result:", data);


                    navigation.replace(NavRoutes.PAYMENT_SUCCESS);

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
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    closeButton: {
        // ปุ่มอยู่ชิดซ้าย
    },
    closeText: {
        fontSize: 16,
        color: "blue",
    },
});