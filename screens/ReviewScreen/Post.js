import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { handleStyleTextLevel } from "../../helper/LevelStyle";
import timeSince from "../../helper/timeSince";
import { ContextAuth } from "../../Context/AuthProvider";
import { handleRenderLevel } from "../../helper/renderLevel";
export const Post = ({ post, navigation, user, handleAddLikePost }) => {
    const [isAuth] = React.useContext(ContextAuth);
    const [isLike, setIsLike] = React.useState(() =>
        post?.listLike?.includes(user?.id)
    );
    const { stylesLevel } = handleStyleTextLevel(
        Number(post?.user?.level) || 0
    );
    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapperUser}>
                <Image
                    style={styles.avartarUser}
                    resizeMode="cover"
                    source={{
                        uri: post?.user?.avatar,
                    }}
                />
                <View style={styles.infoUser}>
                    <Text style={styles.nameUser}>
                        {post?.user?.fullName || "Người tu tiên"}
                    </Text>
                    <View style={styles.levelUser}>
                        {handleRenderLevel(stylesLevel, 18)}
                    </View>
                </View>
            </View>
            <Text style={styles.content}>{post?.content}</Text>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                onPress={() =>
                    navigation.navigate("Detail", { idStory: post?.story?.url })
                }
            >
                <Text style={styles.nameStory}>{post?.story?.name}</Text>
                <Text style={styles.createdAt}>
                    {timeSince(post?.createdAt)}
                </Text>
            </TouchableOpacity>
            <View style={styles.wrapperSocical}>
                <TouchableOpacity
                    onPress={() => {
                        handleAddLikePost(
                            post?.id,
                            post?.listLike,
                            user?.id,
                            !isLike
                        );
                        if (isAuth || user) setIsLike(!isLike);
                    }}
                >
                    <View style={styles.wrapperBox}>
                        <Text
                            style={{
                                color: isLike ? "blue" : "black",
                                marginRight: 5,
                                fontSize: 17,
                            }}
                        >
                            {post?.listLike?.length || 0}
                        </Text>
                        <AntDesign
                            name="like1"
                            size={18}
                            color={isLike ? "blue" : "black"}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.wrapperBox}
                    onPress={() =>
                        navigation.navigate("Comment", {
                            idPost: post?.id,
                        })
                    }
                >
                    <Text style={{ marginRight: 5, fontSize: 17 }}>
                        Bình luận
                    </Text>
                    <FontAwesome name="comments-o" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        marginVertical: 5,
    },
    wrapperUser: {
        flexDirection: "row",
    },
    avartarUser: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    infoUser: {
        marginLeft: 10,
    },
    nameUser: {
        fontWeight: "bold",
        fontSize: 18,
    },
    levelUser: {
        marginTop: 5,
        flexDirection: "row",
    },
    content: {
        marginTop: 20,
        fontSize: 16,
        paddingBottom: 10,
        borderBottomColor: "#C6E2E2",
        borderBottomWidth: 1,
    },
    nameStory: {
        marginVertical: 10,
        fontSize: 17,
        color: "#8CADE2",
    },
    wrapperSocical: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 5,
        paddingBottom: 5,
    },
    wrapperBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    createdAt: {
        fontSize: 12,
        color: "#AAAAAA",
    },
});

export default React.memo(Post);
