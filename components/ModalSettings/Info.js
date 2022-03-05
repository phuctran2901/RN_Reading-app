import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import * as Progress from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
export default function Info({
    lastChap,
    navigation,
    idStory,
    slug,
    title,
    currentChap,
    data,
}) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.box}>
                <Text style={styles.boxTitle} numberOfLines={1}>
                    {Math.floor((currentChap * 100) / lastChap)}%, {title}
                </Text>
                <Progress.Bar
                    color="#282A36"
                    progress={
                        Math.floor((currentChap * 100) / lastChap) / 100 || 0
                    }
                    animationType={"timing"}
                    width={width * 0.7}
                    height={10}
                />
            </View>
            <View style={styles.iconItem}>
                <MaterialCommunityIcons
                    name="theme-light-dark"
                    size={40}
                    color="black"
                />
                <Text style={styles.iconItemText}>Tối/Sáng</Text>
            </View>
            <TouchableOpacity
                style={styles.iconItem}
                onPress={() =>
                    navigation.navigate("ListChap", {
                        idStory,
                        slug,
                        lastChapter: lastChap,
                        name: data?.titleStory,
                        currentChap: data?.titleStorycurrentChap,
                        index: data?.index,
                    })
                }
            >
                <MaterialIcons name="playlist-play" size={40} color="black" />
                <Text style={styles.iconItemText}>Danh sách chương</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.iconItem}
                onPress={() =>
                    navigation.navigate("AudioScreen", {
                        ...data,
                    })
                }
            >
                <Feather name="headphones" size={40} color="black" />
                <Text style={styles.iconItemText}>Nghe</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconItem}
                onPress={() => navigation.navigate("Detail", { idStory: slug })}
            >
                <SimpleLineIcons
                    name="screen-smartphone"
                    size={40}
                    color="black"
                />
                <Text style={styles.iconItemText}>Thông tin truyện</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#F5F5F5",
        padding: 25,
        borderRadius: 20,
    },
    boxTitle: {
        marginBottom: 10,
    },
    iconItem: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    iconItemText: {
        fontSize: 16,
        marginLeft: 10,
    },
});
