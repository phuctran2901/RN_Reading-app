import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CardHorizontal from "../CardHorizontal/CardHorizontal";
import Loader from "../../Skeleton/Loader";
export default function SectionNews({ label, data }) {
    return (
        <View style={styles.sectionWrapper}>
            <View style={styles.labelWrapper}>
                <Text style={styles.labelSection}>{label}</Text>
                <TouchableOpacity>
                    <AntDesign name="right" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.listStoryWrapper}>
                <ScrollView
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {data && (
                        <FlatList
                            data={data}
                            numColumns={4}
                            keyExtractor={(item) => item.slug}
                            renderItem={({ item, index }) => {
                                if (index > data.length - 2) return;
                                return <CardHorizontal item={item} />;
                            }}
                        />
                    )}
                    {!data && <Loader />}
                </ScrollView>
            </View>
        </View>
    );
}
const widthWindow = Dimensions.get("window").width;
const styles = StyleSheet.create({
    sectionWrapper: {
        padding: 10,
        marginTop: 20,
        backgroundColor: "#F6F6F6",
    },
    labelWrapper: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 4,
        paddingLeft: 5,
        marginBottom: 4,
    },
    labelSection: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Roboto",
        color: "#333333",
    },
    listStoryWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: widthWindow,
    },
});
