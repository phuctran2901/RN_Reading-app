import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    Animated,
    StyleSheet,
} from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const xOffset = new Animated.Value(0);

const Screen = (props) => {
    return (
        <View style={styles.scrollPage}>
            <Animated.View style={styles.screen}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                    {props.text}
                </Text>
            </Animated.View>
        </View>
    );
};

export default function Test({ content }) {
    console.log(content?.split("\n\n").length);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.ScrollView
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                //     { useNativeDriver: true }
                // )}
                horizontal
                pagingEnabled
                style={styles.scrollView}
            >
                {content?.split("\n\n").map((item, index) => (
                    <Screen text={item} index={index} key={index} />
                ))}
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexDirection: "row",
    },
    scrollPage: {
        width: SCREEN_WIDTH,
    },
    screen: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        borderRadius: 25,
    },
});
