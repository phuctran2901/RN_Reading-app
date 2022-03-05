import { Text, View, TouchableOpacity } from "react-native";
import React from "react";

const ItemChapter = ({
    item,
    styles,
    slug,
    idStory,
    lastChap,
    index,
    navigation,
}) => {
    if (item?.nameChap && item?.slugChap)
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("ReadChap", {
                        slug,
                        idStory,
                        chapter: item.slugChap,
                        lastChapter: lastChap,
                        index,
                    })
                }
            >
                <View style={styles.wrapperText}>
                    <Text
                        style={{
                            ...styles.indexChap,
                            color: "#868686",
                            fontWeight: "normal",
                        }}
                    >
                        {index + 1}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...styles.textChap,
                            color: "#868686",
                            fontWeight: "normal",
                        }}
                    >
                        {item?.nameChap}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    else {
        if (item?.nameChap.indexOf("current") < 0) {
            return (
                <Text numberOfLines={1} style={styles.textChap}>
                    {item?.nameChap}
                </Text>
            );
        }
    }
    return null;
};

export default React.memo(ItemChapter);
