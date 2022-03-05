import { ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import Card from "./Card";

export default function TabHistory({ handleSetInfo, listHistory, navigation }) {
    return (
        <ScrollView>
            {listHistory &&
                listHistory.map((item) => (
                    <Card
                        key={item?.slug}
                        item={item}
                        handleSetInfo={handleSetInfo}
                        navigation={navigation}
                    />
                ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
