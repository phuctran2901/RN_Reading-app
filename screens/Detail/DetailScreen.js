import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";
import CardVertical from "../../components/CardVertical/CardVertical";
import useInfo from "../../hooks/useInfo";
import LoadingScreen from "../../screens/Loading/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
const width = Dimensions.get("window").width;
export default function DetailScreen({ navigation, route }) {
    const isFocused = useIsFocused();
    const [id, setId] = React.useState(null);
    const { data, isLoading, isFetching, status } = useInfo(id);
    const [chapter, setChapter] = React.useState();
    const [currentValueScroll, setCurrentValueScroll] = React.useState(0);
    React.useEffect(() => {
        setId(route.params.idStory);
    }, [route.params]);
    React.useEffect(() => {
        handleSetDefaultCurrentChapter();
    }, [isFocused]);
    React.useEffect(() => {
        if (status === "success" && !isLoading && !isFetching) {
            handleSetHistoryStory();
        }
    }, [status]);
    const handleSetDefaultCurrentChapter = async () => {
        const story = await AsyncStorage.getItem(data?.idStory || "");
        if (story) {
            setChapter(JSON.parse(story)?.chapter);
            setCurrentValueScroll(JSON.parse(story).currentScroll || 0);
        }
    };
    const handleSetHistoryStory = async () => {
        const listHistory = await AsyncStorage.getItem("listHistory");
        const parseListHistory = listHistory
            ? Array.from(JSON.parse(listHistory))
            : [];
        const isExists = parseListHistory.filter(
            (item) => item?.idStory === data?.idStory
        );

        if (isExists.length <= 0) {
            parseListHistory.unshift({
                idStory: data?.idStory,
                name: data?.info?.name,
                sourceImage: data?.sourceImage,
                slug: route.params.idStory,
            });
            if (parseListHistory.length >= 20) {
                parseListHistory.pop();
            }
            await AsyncStorage.setItem(
                "listHistory",
                JSON.stringify(parseListHistory)
            );
        }
    };

    if (isLoading || isFetching) {
        return <LoadingScreen />;
    }
    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.info}>
                <ImageBackground
                    style={styles.backgroundImage}
                    source={{
                        uri: data?.sourceImage,
                    }}
                    resizeMode="cover"
                    blurRadius={5}
                >
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="arrowleft" size={28} color="white" />
                    </TouchableOpacity>
                    <View style={styles.infoMain}>
                        <Image
                            style={styles.infoImage}
                            source={{
                                uri: data?.sourceImage,
                            }}
                            resizeMode="cover"
                        />
                        <View style={styles.infoContent}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.infoType}>
                                    {data?.info?.tag[2]}
                                </Text>
                                <Text
                                    style={{
                                        ...styles.infoType,
                                        backgroundColor: "green",
                                        marginLeft: 5,
                                    }}
                                >
                                    {data?.info?.tag[1] === "Đã hoàn thành"
                                        ? "Hoàn thành"
                                        : data?.info?.tag[1]}
                                </Text>
                            </View>
                            <Text style={styles.infoTitle} numberOfLines={2}>
                                {data?.info?.name}
                            </Text>
                            <Text style={styles.infoAuthor} numberOfLines={1}>
                                bởi {data?.info?.tag[0]}
                            </Text>
                            <View style={styles.infoRating}>
                                <Text style={styles.infoStars}>
                                    {[
                                        ...new Array(
                                            Math.floor(data?.rating) || 0
                                        ),
                                    ].map((v, i) => (
                                        <AntDesign
                                            key={"_" + i}
                                            name="star"
                                            size={18}
                                            color="yellow"
                                        />
                                    ))}
                                </Text>
                                <Text style={styles.infoAmountUser}>
                                    {data?.rating} ({data?.amountRating} đánh
                                    giá)
                                </Text>
                            </View>
                            <TouchableHighlight
                                underlayColor={"#000"}
                                style={styles.infoButton}
                                onPress={() =>
                                    navigation.navigate("ReadChap", {
                                        idStory: data?.idStory,
                                        chapter:
                                            chapter ||
                                            data?.readNow.split("/")[5].trim(),
                                        slug: id,
                                        lastChapter: Number(
                                            data?.lastestChapter?.name?.split(
                                                " "
                                            )[1]
                                        ),
                                        currentValueScroll,
                                    })
                                }
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Đọc truyện
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.infoBar}>
                    <View style={styles.infoText}>
                        <Text
                            style={{
                                ...styles.infoTextBar,
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            {data?.rank?.favorite}
                        </Text>
                        <Text style={styles.infoTextBar}>Yêu thích</Text>
                    </View>
                    <View style={styles.infoText}>
                        <Text
                            style={{
                                ...styles.infoTextBar,
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            {data?.rank?.nominations}
                        </Text>
                        <Text style={styles.infoTextBar}>Đề cử</Text>
                    </View>
                    <View style={styles.infoText}>
                        <Text
                            style={{
                                ...styles.infoTextBar,
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            {data?.rank?.follow}
                        </Text>
                        <Text style={styles.infoTextBar}>Theo dõi</Text>
                    </View>
                    <View style={styles.infoText}>
                        <Text
                            style={{
                                ...styles.infoTextBar,
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            {data?.rank?.views}
                        </Text>
                        <Text style={styles.infoTextBar}>Lượt xem</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.lastChapter}
                    onPress={() =>
                        navigation.navigate("ListChap", {
                            idStory: data?.idStory,
                            slug: id,
                            lastChapter: Number(
                                data?.lastestChapter?.name?.split(" ")[1]
                            ),
                        })
                    }
                >
                    <Text style={styles.lastChapterTitle}>DS Chương</Text>
                    <Text style={styles.lastChapterName} numberOfLines={1}>
                        {data?.lastestChapter?.name}
                    </Text>
                    <AntDesign
                        style={styles.lastChapterIcon}
                        name="right"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
                <View style={styles.infoDescription}>
                    <Text style={styles.infoDescriptionTitle}>Giới thiệu</Text>
                    <RenderHtml
                        contentWidth={width}
                        tagsStyles={tagsStyles}
                        source={{
                            html: data?.intro || "<p>Loading</p>",
                        }}
                    />
                </View>
                <View style={styles.infoWillLike}>
                    <Text style={styles.infoWillLikeText}>
                        Có thể bạn sẽ thích
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {data &&
                            data?.listWillLike?.map((item) => {
                                return (
                                    <CardVertical
                                        navigation={navigation}
                                        item={item}
                                        key={"_" + item?.slug}
                                        height={160}
                                    />
                                );
                            })}
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={styles.box}>
                <View style={styles.boxLeft}>
                    <Text style={styles.boxLeftTitle} numberOfLines={1}>
                        {data?.info?.name}
                    </Text>
                    <Text style={styles.boxLeftType}>{data?.info?.tag[2]}</Text>
                </View>
                <View style={styles.boxRight}>
                    <TouchableHighlight
                        style={styles.boxButton}
                        onPress={() =>
                            navigation.navigate("ReadChap", {
                                idStory: data?.idStory,
                                chapter: chapter || data?.readNow.split("/")[5],
                                slug: id,
                                lastChapter: Number(
                                    data?.lastestChapter?.name?.split(" ")[1]
                                ),
                                currentValueScroll,
                            })
                        }
                    >
                        <Text style={styles.boxButtonText}>Đọc</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}

const tagsStyles = {
    p: {
        color: "#333",
        fontSize: 16,
    },
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 20,
        marginBottom: 0,
        backgroundColor: "#EFEFEF",
        // backgroundColor: "black",
        paddingBottom: 0,
    },
    backgroundImage: {
        width: width,
    },
    infoMain: {
        flexDirection: "row",
        width: width,
        paddingHorizontal: 30,
        paddingTop: 65,
        paddingBottom: 20,
        backgroundColor: "rgba(0,0,0, 0.60)",
    },
    info: {
        // marginTop: 50,
    },
    infoImage: {
        width: width / 3.3,
        height: 170,
        borderRadius: 15,
    },
    infoContent: {
        marginLeft: 10,
        paddingRight: 25,
    },
    infoType: {
        color: "white",
        paddingHorizontal: 2,
        paddingVertical: 5,
        backgroundColor: "purple",
        width: width / 4,
        textAlign: "center",
        borderRadius: 10,
    },
    infoTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        paddingRight: 55,
    },
    infoAuthor: {
        color: "white",
    },
    infoButton: {
        marginTop: 30,
        padding: 5,
        backgroundColor: "purple",
        width: width / 4,
        borderRadius: 10,
    },
    infoRating: {
        flexDirection: "row",
        paddingRight: 25,
    },
    infoAmountUser: {
        color: "white",
        marginLeft: 5,
    },
    backButton: {
        position: "absolute",
        zIndex: 1,
        left: 30,
        top: 30,
    },
    infoBar: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    infoText: {
        alignItems: "center",
    },
    infoTextBar: {
        fontSize: 16,
    },
    lastChapter: {
        marginTop: 15,
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    lastChapterTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "green",
    },
    lastChapterName: {
        color: "#a6a6a6",
        fontSize: 16,
        width: width / 1.7,
        marginLeft: 10,
    },
    lastChapterIcon: {
        position: "absolute",
        right: 10,
    },
    infoDescription: {
        backgroundColor: "white",
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    infoDescriptionContent: {
        color: "#666666",
        fontSize: 16,
    },
    infoDescriptionTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    infoWillLike: {
        paddingVertical: 25,
        marginTop: 20,
        backgroundColor: "white",
        paddingLeft: 2,
    },
    infoWillLikeText: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        marginLeft: 5,
    },
    box: {
        position: "absolute",
        bottom: 50,
        left: (width - width * 0.9) / 2,
        backgroundColor: "white",
        borderRadius: 20,
        width: width * 0.9,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "space-between",
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0.5,
        elevation: 2,
        shadowColor: "#111",
    },
    boxLeft: {
        flexBasis: "60%",
    },
    boxLeftTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111",
    },
    boxLeftType: {
        color: "#AEAEAE",
    },
    boxRight: {
        flexBasis: "30%",
    },
    boxButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: "#111",
        borderRadius: 20,
    },
    boxButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
});
