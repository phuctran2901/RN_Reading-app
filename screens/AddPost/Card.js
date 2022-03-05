import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Card = ({ item, handleSetSelectStory }) => {
    return (
        <TouchableOpacity
            style={styles.wrapper}
            onPress={() => handleSetSelectStory(item)}
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
