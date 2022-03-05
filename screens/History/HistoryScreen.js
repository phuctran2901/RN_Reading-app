import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabView } from "react-native-tab-view";
import TabHistory from "./TabHistory";
import TabBookmark from "./TabBookmark ";
import { useIsFocused } from "@react-navigation/native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import LoadingScreen from "../Loading/LoadingScreen";
const { width, height } = Dimensions.get("window");

export default function HistoryScreen({ navigation }) {
    const isFocused = useIsFocused();
    const [isVisible, setIsVisible] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const [info, setInfo] = React.useState({});
    const [listHistory, setListHistory] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [routes] = React.useState([
        {
            key: "History",
            title: "Lịch sử",
        },
        {
            key: "Tick",
            title: "Đánh dấu",
        },
    ]);
    React.useEffect(() => {
        if (isFocused) {
            getListHistory();
        }
    }, [isFocused]);
    const getListHistory = async () => {
        setIsLoading(true);
        const listHistory = await AsyncStorage.getItem("listHistory");
        if (listHistory) {
            setListHistory(JSON.parse(listHistory));
        }
        setIsLoading(false);
    };
    const handleSetInfo = (info) => {
        setIsVisible(true);
        setInfo(info);
    };
    const renderScene = (props) => {
        switch (props.route.key) {
            case "History":
                return (
                    <TabHistory
                        handleSetInfo={handleSetInfo}
                        listHistory={listHistory}
                        navigation={navigation}
                    />
                );
            case "Tick":
                return <TabBookmark />;
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
                                    fontSize: 18,
                                    color: "#333",
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
    const handleDeteleItemInListHistory = async (idStory) => {
        const newListHistory = listHistory.filter(
            (item) => item?.idStory !== idStory
        );
        await AsyncStorage.setItem(
            "listHistory",
            JSON.stringify(newListHistory)
        );
        getListHistory();
        setIsVisible(false);
    };
    if (isLoading) return <LoadingScreen />;
    return (
        <View style={styles.wrapper}>
            <Modal
                deviceHeight={height}
                isVisible={isVisible}
                style={styles.wrapperModal}
                onBackdropPress={() => setIsVisible(false)}
            >
                <View style={styles.wrapperContentModal}>
                    <View style={styles.wrapperInfo}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{
                                uri: info?.sourceImage,
                            }}
                        />
                        <Text
                            style={{ ...styles.textInfo, width: width * 0.7 }}
                            numberOfLines={2}
                        >
                            {info?.name}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.select}
                        onPress={() =>
                            Alert.alert(
                                "Chức năng này đang lỗi vui lòng thử lại sau!"
                            )
                        }
                    >
                        <AntDesign
                            name="clouddownloado"
                            size={24}
                            color="#AAAAAA"
                        />
                        <Text
                            style={{
                                ...styles.textInfo,
                                marginTop: 0,
                                marginLeft: 5,
                            }}
                        >
                            Tải truyện
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            handleDeteleItemInListHistory(info?.idStory)
                        }
                        style={styles.select}
                    >
                        <AntDesign name="delete" size={24} color="#AAAAAA" />
                        <Text
                            style={{
                                ...styles.textInfo,
                                marginTop: 0,
                                marginLeft: 5,
                            }}
                        >
                            Xóa khỏi tủ truyện
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TabView
                style={styles.wrapperContent}
                navigationState={{ index: index, routes: routes }}
                renderScene={renderScene}
                onIndexChange={(index) => setIndex(index)}
                renderTabBar={renderTabBar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    wrapperContent: {
        width: width,
    },
    tabBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
    },
    image: {
        width: 50,
        height: 70,
        borderRadius: 10,
        marginRight: 10,
    },
    tabItem: {
        paddingVertical: 4,
        marginLeft: 20,
        marginVertical: 10,
    },
    wrapperModal: {
        margin: 0,
        justifyContent: "flex-end",
    },
    wrapperContentModal: {
        backgroundColor: "white",
        flex: 1,
        width,
        height: height * 0.3,
        maxHeight: height * 0.3,
        paddingTop: 30,
    },
    wrapperInfo: {
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomColor: "#AAAAAA",
        borderBottomWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 10,
    },
    textInfo: {
        marginTop: 10,
        fontSize: 16,
        color: "#AAAAAA",
    },
    select: {
        borderBottomColor: "#AAAAAA",
        borderBottomWidth: 1,
        paddingLeft: 20,
        paddingVertical: 10,
        flexDirection: "row",
    },
});
