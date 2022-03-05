import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
export default function CardImage({
    activeImage,
    setActiveCardImage,
    item,
    index,
}) {
    const isActive = activeImage
        ? { ...Styles.active, ...Styles.cardImage }
        : Styles.cardImage;
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setActiveCardImage(index)}
        >
            <Image
                style={{ ...isActive }}
                source={{
                    uri: item.sourceImage,
                }}
            />
        </TouchableOpacity>
    );
}
