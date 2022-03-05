import React, { useState } from "react";
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
} from "react-native";
import SkeletonContent from "react-native-skeleton-content";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import CardImage from "./CardImage";
import InfoCard from "./InfoCard";
import { layoutNewstory } from "../LayoutSkeleton";
import useListUpdated from "../../../hooks/useListUpdated.js";
const { width } = Dimensions.get("window");

export default function NewsStory({ navigation }) {
    const [activeCardImage, setActiveCardImage] = useState(0);
    const { data, isLoading } = useListUpdated();
    return (
        <SkeletonContent
            containerStyle={styles.container}
            isLoading={isLoading}
            layout={layoutNewstory}
        >
            <View style={Styles.wrapper_title}>
                <Text style={Styles.textTitle}>Mới nhất</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ListStory", { tp: "cv" })
                    }
                >
                    <AntDesign name="right" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={data?.listData}
                    keyExtractor={(item) => item.slug}
                    horizontal
                    renderItem={({ item, index }) => (
                        <CardImage
                            activeImage={index === activeCardImage}
                            setActiveCardImage={setActiveCardImage}
                            item={item}
                            index={index}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <InfoCard
                info={data?.listData[activeCardImage]}
                navigation={navigation}
            />
        </SkeletonContent>
    );
}
const styles = StyleSheet.create({
    container: {
        width,
        height: 300,
        paddingHorizontal: 10,
        marginBottom: 40,
    },
});
