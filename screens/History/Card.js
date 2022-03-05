import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
export default function Card({ handleSetInfo, item, navigation }) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                navigation.navigate("Detail", { idStory: item?.slug })
            }
            style={styles.wrapper}
        >
            <View style={styles.wrapperInfo}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{
                        uri: item?.sourceImage,
                    }}
                />
                <View style={{ width: width * 0.5 }}>
                    <Text style={styles.title} numberOfLines={2}>
                        {item?.name || "Đang cập nhật"}
                    </Text>
                    <Text style={styles.chapter}>
                        Đã đọc {item?.chapter || "0"}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => handleSetInfo(item)}>
                <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    image: {
        width: 80,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    wrapperInfo: {
        flexDirection: "row",
    },
    title: {
        fontWeight: "300",
        fontSize: 16,
    },
    chapter: {
        marginTop: 5,
        color: "#AAAAAA",
    },
});
