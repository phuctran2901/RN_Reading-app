import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert,
} from "react-native";
import { useQueryClient } from "react-query";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import useFetchChapter from "../../hooks/useFetchChapter";
import { MaterialIcons } from "@expo/vector-icons";
import LoadingScreen from "../Loading/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingDots from "react-native-loading-dots";
import ModalSettings from "../../components/ModalSettings/ModalSettings";
const width = Dimensions.get("window").width;

const fontFamilyArr = ["Roboto", "Tinos", "OpenSans", "Montserrat"];
const fontFamilyArrValue = [
    "Roboto_400Regular",
    "Tinos_400Regular",
    "OpenSans_400Regular",
    "Montserrat_400Regular",
];
const themeArr = ["#FFFFFF", "#EEF4EA", "#BCABA4", "#272729", "#000000"];

export default function ReadChapScreen({ navigation, route }) {
    const [key, setKey] = React.useState({});
    const { data, isLoading, status, refetch } = useFetchChapter({ ...key });
    const [isVisible, setIsVisible] = React.useState(false);
    const [fontFamily, setFontFamily] = React.useState(0);
    const [theme, setTheme] = React.useState(0);
    const [fontSize, setFontSize] = React.useState(22);
    const [lastChapter, setLastChapter] = React.useState(0);
    const [chapter, setChapter] = React.useState({});
    const [isNextChap, setIsNextChap] = React.useState(true);
    const [isControl, setIsControl] = React.useState(false);
    const [isFetchChap, setIsFetchChap] = React.useState(true);
    const queryClient = useQueryClient();
    const scrollViewRef = React.useRef();
    React.useEffect(() => {
        const { chapter, idStory, slug, lastChapter, index } = route.params;
        setKey({ slug, chapter, idStory, index });
        setIsVisible(false);
        setLastChapter(lastChapter);
    }, [navigation, route.params]);
    React.useEffect(() => {
        handleSetings();
        handleSetCurrentPositionScrollView();
    }, []);

    React.useEffect(() => {
        if (status === "success") {
            setChapter(data);
            scrollViewRef?.current?.scrollTo({
                animated: false,
                x: 0,
                y: 0,
            });
            handleSetHistoryChapter();
        }
        if (status === "idle") {
            refetch();
        }
    }, [status, key?.chapter]);
    const handleSetings = async () => {
        const fontFamilyStorage =
            (await AsyncStorage.getItem("fontFamily")) || 0;
        const themeStorage = (await AsyncStorage.getItem("theme")) || 0;
        const fontSizeStorage = (await AsyncStorage.getItem("size")) || 22;
        setTheme(Number(themeStorage));
        setFontFamily(Number(fontFamilyStorage));
        setFontSize(Number(fontSizeStorage));
    };
    const handleSetHistoryChapter = async () => {
        const listHistory =
            Array.from(JSON.parse(await AsyncStorage.getItem("listHistory"))) ||
            [];
        const indexStory = listHistory.findIndex(
            (item) => item?.idStory === key?.idStory
        );
        if (indexStory !== -1) {
            const story = listHistory[indexStory];
            story.chapter = data?.currentChap.split("-")[1].trim();
            listHistory.splice(indexStory, 1);
            listHistory.unshift(story);
            await AsyncStorage.setItem(
                "listHistory",
                JSON.stringify(listHistory)
            );
        }
    };
    const handleScroll = (event) => {
        AsyncStorage.setItem(
            key.idStory,
            JSON.stringify({
                ...key,
                currentScroll: event.nativeEvent.contentOffset.y,
            })
        );
        const { nativeEvent } = event;
        if (nativeEvent.contentOffset.y === 0) {
            setIsNextChap(true);
        }
        if (isScrollBottom(nativeEvent) && isNextChap) {
            if (data?.nextChapter) {
                setKey({ ...key, chapter: chapter?.nextChapter });
                setIsNextChap(false);
                setIsFetchChap(false);
            } else {
                Alert.alert("Đạo hữu đã đọc đến chương mới nhất!");
            }
        } else {
            queryClient.cancelQueries("chapter");
        }
    };
    const isScrollBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }) => {
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 50
        );
    };
    const handleSetCurrentPositionScrollView = async () => {
        const { chapter, idStory, slug } = route.params;
        const storyRemember = await AsyncStorage.getItem(idStory);
        if (
            chapter === JSON.parse(storyRemember)?.chapter &&
            slug === JSON.parse(storyRemember)?.slug
        ) {
            scrollViewRef?.current?.scrollTo({
                animated: false,
                x: 0,
                y: JSON.parse(storyRemember)?.currentScroll || 0,
            });
        }
    };
    const handleChapter = (value) => {
        setIsFetchChap(false);
        switch (value) {
            case "next":
                if (chapter?.nextChapter) {
                    setKey({ ...key, chapter: chapter?.nextChapter });
                } else {
                    Alert.alert("Đây là chương mới nhất đạo hữu à!");
                }
                break;
            case "prev":
                if (chapter?.prevChapter) {
                    setKey({ ...key, chapter: chapter?.prevChapter });
                } else {
                    Alert.alert("Đây là chương đầu đạo hữu ^^!");
                }
                break;
            default:
                return;
        }
    };
    if (isLoading && isFetchChap) return <LoadingScreen />;
    return (
        <View style={{ ...styles.wrapper, backgroundColor: themeArr[theme] }}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            name="left"
                            size={20}
                            color={theme > 2 ? "white" : "#111"}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            ...styles.chapterTitle,
                            color: theme > 2 ? "white" : "#111",
                        }}
                        numberOfLines={1}
                    >
                        {chapter?.titleChapter || " "}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Ionicons
                        name="settings"
                        size={20}
                        color={theme > 2 ? "white" : "#111"}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                scrollEventThrottle={500}
                ref={scrollViewRef}
                style={styles.contentChap}
                onScroll={handleScroll}
            >
                <Text
                    style={{
                        marginBottom: 50,
                        fontSize: fontSize,
                        color: theme > 2 ? "white" : "#111",
                    }}
                >
                    {chapter?.titleChapter || " "}
                </Text>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setIsControl(!isControl)}
                >
                    {chapter?.content && (
                        <Text
                            style={{
                                fontSize: fontSize,
                                fontFamily: fontFamilyArrValue[fontFamily],
                                paddingBottom: 100,
                                lineHeight: fontSize + 8,
                                color: theme > 2 ? "white" : "#111",
                            }}
                        >
                            {`${chapter?.content}` || " "}
                        </Text>
                    )}
                </TouchableOpacity>
                <Text
                    style={{
                        ...styles.authorChapter,
                        fontFamily: "OpenSans_400Regular",
                        textAlign: "center",
                        color: theme > 2 ? "white" : "#111",
                    }}
                >
                    {chapter?.poster ? `Người đăng: ${chapter?.poster}` : " "}
                </Text>
                <View style={styles.footer}>
                    {!isFetchChap && isLoading && (
                        <LoadingDots
                            dots={3}
                            colors={["black", "black", "black"]}
                            backgroundColor={"transparent"}
                            size={10}
                        />
                    )}
                </View>
            </ScrollView>
            {isControl && (
                <View style={styles.wrapperButton}>
                    <TouchableOpacity
                        style={styles.buttonNextAndPrev}
                        onPress={() => handleChapter("prev")}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
                        <Text>Chương sau</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ListChap", {
                                idStory: key?.idStory,
                                slug: key?.slug,
                                lastChapter,
                                currentChap: chapter?.currentChap,
                                name: data?.titleStory,
                                index: key?.index,
                            })
                        }
                    >
                        <MaterialIcons
                            name="smartphone"
                            size={40}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonNextAndPrev}
                        onPress={() => handleChapter("next")}
                    >
                        <AntDesign name="arrowright" size={24} color="black" />
                        <Text>Chương tiếp</Text>
                    </TouchableOpacity>
                </View>
            )}
            <ModalSettings
                theme={themeArr}
                fontFamily={fontFamilyArr}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                setTheme={setTheme}
                fontFamilyIndex={fontFamily}
                themeIndex={theme}
                setFontFamily={setFontFamily}
                setFontSize={setFontSize}
                fontSize={fontSize}
                idStory={key?.idStory}
                navigation={navigation}
                slug={key?.slug}
                lastChapter={lastChapter}
                currentChap={Number(key?.chapter?.split("-")[1])}
                title={chapter?.titleChapter}
                data={{ ...data, ...key }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerLeft: {
        flexDirection: "row",
        flexBasis: "70%",
    },
    chapterTitle: {
        marginLeft: 10,
    },
    contentChap: {
        padding: 10,
    },
    authorChapter: {
        fontSize: 18,
        marginBottom: 20,
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: 400,
    },
    wrapperButton: {
        position: "relative",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10,
    },
    buttonNextAndPrev: {
        justifyContent: "center",
        alignItems: "center",
    },
});
