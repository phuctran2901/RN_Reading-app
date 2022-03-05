import React from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Animated,
} from "react-native";
import Modal from "react-native-modal";
import { TabView } from "react-native-tab-view";
import Info from "./Info";
import Settings from "./Settings";
import { AntDesign } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ModalSettings({
    isVisible,
    setIsVisible,
    theme,
    fontFamily,
    setTheme,
    setFontFamily,
    themeIndex,
    fontFamilyIndex,
    fontSize,
    setFontSize,
    idStory,
    navigation,
    slug,
    lastChapter,
    currentChap,
    title,
    data,
}) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "Info", title: "Thông tin" },
        { key: "Settings", title: "Cài đặt" },
    ]);
    const renderScene = (props) => {
        switch (props.route.key) {
            case "Info":
                return (
                    <Info
                        slug={slug}
                        idStory={idStory}
                        navigation={navigation}
                        lastChap={lastChapter}
                        title={title}
                        currentChap={currentChap}
                        navigation={navigation}
                        data={data}
                    />
                );
            case "Settings":
                return (
                    <Settings
                        setTheme={setTheme}
                        fontFamilyIndex={fontFamilyIndex}
                        themeIndex={themeIndex}
                        theme={theme}
                        fontFamily={fontFamily}
                        setFontFamily={setFontFamily}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                    />
                );
            default:
                return;
        }
    };
    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });

                    return (
                        <TouchableOpacity
                            key={route.key}
                            style={styles.tabItem}
                            onPress={() => setIndex(i)}
                        >
                            <Animated.Text
                                style={{
                                    opacity,
                                    fontSize: 20,
                                }}
                            >
                                {route.title}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };
    return (
        <Modal
            deviceHeight={height}
            isVisible={isVisible}
            style={styles.wrapperModal}
            onBackdropPress={() => setIsVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setIsVisible(false)}
            >
                <AntDesign name="down" size={30} color="black" />
            </TouchableOpacity>
            <TabView
                style={styles.wrapperContent}
                navigationState={{ index: index, routes: routes }}
                renderScene={renderScene}
                onIndexChange={(index) => setIndex(index)}
                renderTabBar={renderTabBar}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    wrapperModal: {
        justifyContent: "flex-end",
        alignItems: "center",
        margin: 0,
    },
    wrapperContent: {
        width: width,
        height: height * 0.7,
        maxHeight: height * 0.7,
        backgroundColor: "white",
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    tabBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    tabItem: {
        paddingVertical: 4,
        paddingBottom: 30,
        marginLeft: 20,
    },
    modalClose: {
        position: "absolute",
        top: 215,
        right: 20,
        zIndex: 999,
    },
});
