import React, { useEffect } from "react";
import { Text, ScrollView, View, Dimensions } from "react-native";
import SectionRank from "./SectionRank/SectionRank";
import NewsStory from "./NewsStory/NewsStory";
import SectionNominations from "./SectionNominations/SectionNominations";
import SectionNews from "./SectionNews/SectionNews";
import SectionAccomplished from "./SectionAccomplished/SectionAccomplished";
import useHome from "../../hooks/useHome";
import { useIsFocused } from "@react-navigation/native";
import CarouselHome from "./CarouselHome/CarouselHome";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
    const isFocused = useIsFocused();
    const { data, refetch, isLoading, status } = useHome();
    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [isFocused, status]);
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CarouselHome navigation={navigation} />
                <NewsStory navigation={navigation} />
                <SectionNominations navigation={navigation} label="Đề cử" />
                <SectionNews
                    label="Mới đăng"
                    data={data?.listNews}
                    more={{ ord: "new" }}
                    navigation={navigation}
                    isLoading={false}
                />
                <SectionRank
                    listRankStory={data?.listRankStory}
                    navigation={navigation}
                    isLoading={false}
                />
                <SectionAccomplished
                    label="Thịnh hành"
                    navigation={navigation}
                    isLoading={false}
                />
                <SectionNews
                    label="Hoàn thành"
                    data={data?.listFinish}
                    more={{ fns: "ht" }}
                    navigation={navigation}
                    isLoading={isLoading}
                />
            </ScrollView>
        </View>
    );
}
