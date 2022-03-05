import React from "react";
import { View, Dimensions, Text } from "react-native";
const { width } = Dimensions.get("window");
import SkeletonContent from "react-native-skeleton-content";
import Card from "./Card";
export default function ListCard({ data, navigation, isLoading, isFetching }) {
    return (
        <SkeletonContent
            containerStyle={{ flex: 1, width }}
            isLoading={isLoading || isFetching}
            layout={[...new Array(10)].map((_, i) => {
                return {
                    key: i,
                    width: width,
                    height: 60,
                    marginVertical: 6,
                };
            })}
        >
            {data &&
                data.map((item) => (
                    <Card navigation={navigation} item={item} key={item?.url} />
                ))}
        </SkeletonContent>
    );
}
