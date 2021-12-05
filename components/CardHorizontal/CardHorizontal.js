import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
export default function CardHorizontal({ item }) {
    return (
        <TouchableHighlight
            underlayColor="#f0f0f0"
            onPress={() => alert(item.slug)}
        >
            <View style={styles.wrapperCardHorizontal}>
                <View style={styles.wrapperImage}>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                        }}
                        source={{
                            uri: item.sourceImage,
                        }}
                        resizeMode="cover"
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "space-between",
                    }}
                >
                    <View styles={styles.wrapperText}>
                        <Text style={styles.titleText} numberOfLines={1}>
                            {item.title}
                        </Text>
                        <Text style={styles.typeText}>{item.genres.title}</Text>
                    </View>

                    <Text style={styles.authorText} numberOfLines={1}>
                        <Entypo name="pencil" size={24} color="black" />
                        {item.author.name}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}
const widthWindow = Dimensions.get("window").width;

const styles = StyleSheet.create({
    wrapperCardHorizontal: {
        flexDirection: "row",
        width: widthWindow * 0.8,
        marginVertical: 10,
    },
    wrapperImage: {
        width: widthWindow / 5,
        marginRight: 10,
        height: 100,
    },
    wrapperText: {
        alignItems: "flex-start",
    },
    authorText: {
        alignItems: "flex-end",
        padding: 2,
        color: "green",
        fontWeight: "bold",
        borderRadius: 10,
    },
    typeText: {
        marginTop: 5,
        color: "#a6a6a6",
    },
    titleText: {
        fontSize: 18,
        paddingRight: 15,
    },
});
