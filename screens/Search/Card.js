import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Card = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.wrapper}
            onPress={() =>
                navigation.navigate("Detail", { idStory: item?.url })
            }
        >
            <Text numberOfLines={1} style={styles.text}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 5,
        elevation: 2,
        backgroundColor: "#fff",
        padding: 20,
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
});

export default Card;
