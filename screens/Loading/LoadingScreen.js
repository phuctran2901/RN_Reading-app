import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import LoadingDots from "react-native-loading-dots";
import { AntDesign } from "@expo/vector-icons";

export default function LoadingScreen() {
    return (
        <View style={styles.loadingScreen}>
            <View style={styles.dotsWrapper}>
                <LoadingDots size={20} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
});
