import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
} from "react-native";
import React from "react";
const { width } = Dimensions.get("window");
export default function Box({ name, currentChaper }) {
    return (
        <View style={styles.box}>
            <View style={styles.boxLeft}>
                <Text style={styles.boxLeftTitle} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles.boxLeftType}>
                    Đang đọc tới chương{" "}
                    {currentChaper?.split("-")[1] || currentChaper}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        position: "absolute",
        bottom: 50,
        left: (width - width * 0.9) / 2,
        backgroundColor: "white",
        borderRadius: 20,
        width: width * 0.9,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "space-between",
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0.5,
        elevation: 2,
        shadowColor: "#111",
    },
    boxLeft: {
        flexBasis: "60%",
    },
    boxLeftTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111",
    },
    boxLeftType: {
        color: "#AEAEAE",
        marginTop: 10,
    },
    boxRight: {
        flexBasis: "30%",
    },
    boxButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: "#111",
        borderRadius: 20,
    },
    boxButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
});
