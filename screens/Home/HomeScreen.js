import React, { useState, useEffect } from "react";
import { Text, ScrollView, TouchableHighlight, View } from "react-native";
import SectionRank from "../../components/SectionRank/SectionRank";
import NewsStory from "../../components/NewsStory/NewsStory";
import SectionNominations from "../../components/SectionNominations/SectionNominations";
import SectionNews from "../../components/SectionNews/SectionNews";
import SectionAccomplished from "../../components/SectionAccomplished/SectionAccomplished";
import useHome from "../../hooks/useHome";
export default function HomeScreen({ navigation }) {
    const { data } = useHome();
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <NewsStory />
                <SectionNominations label="Đề cử" />
                {data && <SectionNews label="Mới đăng" data={data.listNews} />}
                {data && <SectionRank listRankStory={data.listRankStory} />}
                <SectionAccomplished label="Thịnh hành" />
                {data && (
                    <SectionNews label="Hoàn thành" data={data.listFinish} />
                )}
            </ScrollView>
        </View>
    );
}
