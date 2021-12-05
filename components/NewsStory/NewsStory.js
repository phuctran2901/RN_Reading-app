import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import CardImage from "./CardImage";
import InfoCard from "./InfoCard";
import useListUpdated from "../../hooks/useListUpdated";
export default function NewsStory() {
    const [activeCardImage, setActiveCardImage] = useState(0);
    const { data } = useListUpdated();
    const [fontsLoaded] = useFonts({
        Roboto: require("../../assets/fonts/Roboto-Bold.ttf"),
    });
    return (
        <View style={{ padding: 10 }}>
            <View style={Styles.wrapper_title}>
                <Text style={Styles.textTitle}>Mới nhất</Text>
                <TouchableOpacity>
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
            <InfoCard info={data?.listData[activeCardImage]} />
        </View>
    );
}
