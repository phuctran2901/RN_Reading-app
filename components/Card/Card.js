import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function Card({ item, navigation }) {
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("Detail", { idStory: item.slug })
            }
            style={styles.wrapper}
        >
            <View style={styles.wrapperImage}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{
                        uri: item.sourceImage,
                    }}
                />
            </View>
            <View style={styles.wrapperInfo}>
                <View style={styles.wrapperInfoTag}>
                    <Text style={styles.textInfoTag}>#{item.author.type}</Text>
                    <Text style={styles.textInfoTag}>
                        #{item.author.status}
                    </Text>
                </View>
                <Text style={styles.textTitle} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.textAuthor}>{item.author.name}</Text>
                <Text style={styles.textChapter}>
                    <MaterialIcons
                        name="smartphone"
                        size={16}
                        color="#C48189"
                    />
                    {item.author.chapter} chương
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        marginVertical: 5,
    },
    wrapperImage: {
        flex: 1,
        height: 100,
        marginRight: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    wrapperInfo: {
        flex: 4,
    },
    wrapperInfoTag: {
        flexDirection: "row",
    },
    textInfoTag: {
        marginHorizontal: 2,
        color: "#B0C4DE",
        textTransform: "uppercase",
        fontSize: 12,
        marginBottom: 10,
    },
    textTitle: {
        fontSize: 16,
    },
    textAuthor: {
        fontSize: 13,
        marginTop: 2,
        color: "#8FBDBD",
    },
    textChapter: {
        marginTop: 10,
        color: "#C48189",
    },
});
