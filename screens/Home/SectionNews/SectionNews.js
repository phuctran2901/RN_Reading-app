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
import SkeletonContent from "react-native-skeleton-content";
import { layoutConfig } from "../LayoutSkeleton";
import CardHorizontal from "../../../components/CardHorizontal/CardHorizontal";
export default function SectionNews({
    label,
    data,
    more,
    navigation,
    isLoading,
}) {
    return (
        <SkeletonContent
            containerStyle={styles.sectionWrapper}
            isLoading={isLoading}
            layout={layoutConfig}
        >
            <View style={styles.labelWrapper}>
                <Text style={styles.labelSection}>{label}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ListStory", more)}
                >
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
                                return (
                                    <CardHorizontal
                                        navigation={navigation}
                                        item={item}
                                    />
                                );
                            }}
                        />
                    )}
                </ScrollView>
            </View>
        </SkeletonContent>
    );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    sectionWrapper: {
        padding: 10,
        backgroundColor: "#F6F6F6",
        height: 300,
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
        width: width,
    },
});
