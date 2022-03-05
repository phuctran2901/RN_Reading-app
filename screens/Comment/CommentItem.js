import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import timeSince from "../../helper/timeSince";
import { EvilIcons } from "@expo/vector-icons";
import { handleStyleTextLevel } from "../../helper/LevelStyle";
import { handleRenderLevel } from "../../helper/renderLevel";

const { width } = Dimensions.get("window");

const CommentItem = ({ comment }) => {
    const { stylesLevel } = handleStyleTextLevel(
        Number(comment?.userInfo?.level) || 0
    );
    return (
        <View style={styles.wrapper}>
            <Image
                style={styles.avatar}
                resizeMode="cover"
                source={{
                    uri: comment?.userInfo?.avatar,
                }}
            />
            <View style={styles.wrapperInfo}>
                <View style={styles.wrapperBox}>
                    <Text style={styles.name} numberOfLines={1}>
                        {comment?.userInfo?.fullName || "Người tu tiên"}
                    </Text>
                    <Entypo name="dot-single" size={24} color="black" />
                    <View style={styles.level}>
                        {handleRenderLevel(stylesLevel)}
                    </View>
                </View>
                <Text style={styles.content}>{comment?.content}</Text>
                <View
                    style={{
                        ...styles.wrapperBox,
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.date}>
                        {timeSince(comment?.createdAt)}
                    </Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        width,
        marginVertical: 5,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 50,
        flexBasis: "15%",
    },
    wrapperInfo: {
        flexBasis: "85%",
    },
    wrapperBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontWeight: "bold",
        fontSize: 18,
    },
    content: {
        marginTop: 10,
        marginBottom: 5,
        paddingRight: 80,
        fontSize: 15,
        letterSpacing: 0.5,
    },
    date: {
        fontSize: 13,
        color: "#AAAAAA",
    },
    like: {
        marginRight: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    level: {
        flexDirection: "row",
    },
});
export default CommentItem;
