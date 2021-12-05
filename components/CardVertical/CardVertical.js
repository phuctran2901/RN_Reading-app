import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";

export default function CardVertical({ item }) {
    return (
        <TouchableOpacity
            style={styles.wrapperCardVertical}
            activeOpacity={0.8}
        >
            <Image
                style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 10,
                }}
                source={{
                    uri: item.sourceImage,
                }}
                resizeMode="cover"
            />
            <Text numberOfLines={1} style={styles.textCardVertical}>
                {item.title}
            </Text>
            <Text style={styles.textGenresCardVertical}>
                {item.author.type}
            </Text>
        </TouchableOpacity>
    );
}

const widthWindow = Dimensions.get("window").width;

const styles = StyleSheet.create({
    wrapperCardVertical: {
        alignSelf: "stretch",
        marginVertical: 5,
        flexBasis: widthWindow / 3.1,
        marginHorizontal: 4,
    },
    textCardVertical: {
        fontSize: 15,
        marginTop: 5,
    },
    textGenresCardVertical: {
        marginTop: 10,
        color: "#a6a6a6",
    },
});
