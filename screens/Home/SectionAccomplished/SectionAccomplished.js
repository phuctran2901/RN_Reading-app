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
import SkeletonContent from "react-native-skeleton-content";
import useListFavorite from "../../../hooks/useListFavorite";
import { layoutAccomplished } from "../LayoutSkeleton";
import Loader from "../../../Skeleton/Loader";

const { width } = Dimensions.get("window");
export default function SectionAccomplished({ label, navigation }) {
    const { data, isLoading } = useListFavorite();
    return (
        <SkeletonContent
            containerStyle={styles.wrapper}
            isLoading={isLoading}
            layout={layoutAccomplished}
        >
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
                    renderItem={(data) => (
                        <Card navigation={navigation} item={data.item} />
                    )}
                />
            )}
            {!data && <Loader />}
        </SkeletonContent>
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
        width: width / 3.6,
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
