import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";
import SkeletonContent from "react-native-skeleton-content";
import { layoutConfig } from "../Home/LayoutSkeleton";
const { width } = Dimensions.get("window");
export default function TabBookmark() {
    return (
        <SkeletonContent
            containerStyle={styles.container}
            layout={[...new Array(5)].map((_) => {
                return {
                    width: width * 0.8,
                    height: 100,
                    flexDirection: "row",
                    marginTop: 5,
                    children: [
                        {
                            width: width / 5,
                            height: 100,
                            borderRadius: 10,
                            marginRight: 10,
                        },
                        {
                            width: "100%",
                            children: [
                                {
                                    width: "60%",
                                    height: 10,
                                    marginTop: 5,
                                },
                                {
                                    width: "80%",
                                    height: 10,
                                    marginTop: 5,
                                },
                            ],
                        },
                    ],
                };
            })}
            isLoading={true}
        ></SkeletonContent>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
});
