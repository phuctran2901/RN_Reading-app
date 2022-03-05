import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";

export default function CardVertical({ item, height, navigation }) {
    return (
        <TouchableOpacity
            style={styles.wrapperCardVertical}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate("Detail", { idStory: item.slug });
            }}
        >
            <Image
                style={{
                    width: "100%",
                    height: height ? height : 150,
                    borderRadius: 10,
                }}
                source={{
                    uri: item?.sourceImage,
                }}
                resizeMode="cover"
            />
            <Text numberOfLines={1} style={styles.textCardVertical}>
                {item?.title}
            </Text>
            <Text style={styles.textGenresCardVertical} numberOfLines={1}>
                {item?.author?.type || item?.author}
            </Text>
        </TouchableOpacity>
    );
}

const widthWindow = Dimensions.get("window").width;

const styles = StyleSheet.create({
    wrapperCardVertical: {
        alignSelf: "stretch",
        marginVertical: 5,
        flexBasis: widthWindow / 3.3333,
        marginHorizontal: 4,
        width: widthWindow / 3.333333,
    },
    textCardVertical: {
        fontSize: 15,
        marginTop: 10,
    },
    textGenresCardVertical: {
        marginTop: 10,
        color: "#a6a6a6",
    },
});
