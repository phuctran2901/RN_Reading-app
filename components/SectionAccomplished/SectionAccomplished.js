import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useListFavorite from "../../hooks/useListFavorite";
import Loader from "../../Skeleton/Loader";
export default function SectionAccomplished({ label, navigation }) {
    const { data } = useListFavorite();
    return (
        <View style={styles.wrapper}>
            <View style={styles.labelWrapper}>
                <Text style={styles.labelSection}>{label}</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ListStory", {
                            rank: "yt",
                        })
                    }
                >
                    <AntDesign name="right" size={20} color="white" />
                </TouchableOpacity>
            </View>
            {data && (
                <FlatList
                    data={data?.listData}
                    horizontal
                    keyExtractor={(item) => item.slug}
                    renderItem={(data) => <Card item={data.item} />}
                />
            )}
            {!data && <Loader />}
        </View>
    );
}

const Card = ({ item }) => {
    return (
        <TouchableOpacity style={styles.cardWrapper}>
            <Image
                style={styles.cardImage}
                source={{
                    uri: item.sourceImage,
                }}
            />
            <Text numberOfLines={2} style={styles.cardText}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );
};
const widthWindow = Dimensions.get("window").width;
const styles = StyleSheet.create({
    labelWrapper: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 4,
        paddingLeft: 5,
        marginVertical: 10,
    },
    labelSection: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Roboto",
        color: "white",
    },
    wrapper: {
        backgroundColor: "black",
        height: 280,
        padding: 10,
    },
    cardWrapper: {
        width: widthWindow / 3.6,
        flexBasis: "50%",
        marginHorizontal: 10,
    },
    cardImage: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    cardText: {
        color: "white",
        fontSize: 16,
        marginTop: 10,
    },
});
