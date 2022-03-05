import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CardVertical from "../../../components/CardVertical/CardVertical";
import useListNominations from "../../../hooks/useListNominations";
import { layoutNominations } from "../LayoutSkeleton";
import SkeletonContent from "react-native-skeleton-content";
import Loader from "../../../Skeleton/Loader";
export default function SectionNominations({ label, navigation }) {
    const { data, isLoading } = useListNominations();
    return (
        <SkeletonContent
            containerStyle={styles.sectionWrapper}
            layout={layoutNominations}
            isLoading={isLoading}
        >
            <View style={styles.labelWrapper}>
                <Text style={styles.labelSection}>{label}</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ListStory", {
                            rank: "nm",
                            time: "m",
                        })
                    }
                >
                    <AntDesign name="right" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.listStoryWrapper}>
                {data?.listData &&
                    data?.listData?.map((item, index) => {
                        if (index < 6)
                            return (
                                <CardVertical
                                    navigation={navigation}
                                    key={item.slug}
                                    item={item}
                                />
                            );
                    })}
                {!data && <Loader />}
            </View>
        </SkeletonContent>
    );
}

const styles = StyleSheet.create({
    sectionWrapper: {
        padding: 5,
        marginTop: 20,
        height: 500,
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
        justifyContent: "center",
    },
});
