import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";
import Loader from "../../Skeleton/Loader";

export default function SectionRank({ listRankStory }) {
    return (
        <View style={styles.wrapperSectionRank}>
            <Text style={styles.textTitleSection}>Bảng xếp hạng</Text>
            <PagerView
                initialPage={0}
                style={{ flex: 1, height: 300, marginTop: 10 }}
            >
                {listRankStory?.length !== 0 ? (
                    listRankStory?.map((listRank) => {
                        return (
                            <View
                                style={styles.wrapperItemRank}
                                key={listRank.titleRank.slug}
                            >
                                <Text style={styles.textItemRank}>
                                    {listRank.titleRank.name}
                                </Text>
                                <View style={styles.list}>
                                    {listRank.listDataRank.map(
                                        (item, index) => {
                                            if (index >= 10) return;
                                            if (index === 0)
                                                return (
                                                    <TouchableOpacity
                                                        style={styles.item}
                                                        key={item.title.name}
                                                        onPress={() =>
                                                            alert(
                                                                item.title.slug
                                                            )
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.itemInfo
                                                            }
                                                        >
                                                            <Text
                                                                style={
                                                                    styles.itemNumberRankNo1
                                                                }
                                                            >
                                                                No.1
                                                            </Text>
                                                            <Text
                                                                style={
                                                                    styles.itemTitle
                                                                }
                                                                numberOfLines={
                                                                    1
                                                                }
                                                            >
                                                                {
                                                                    item.title
                                                                        .name
                                                                }
                                                            </Text>
                                                            <View
                                                                style={
                                                                    styles.textDigital
                                                                }
                                                            >
                                                                <Text
                                                                    style={{
                                                                        color: "red",
                                                                        fontSize: 20,
                                                                        fontWeight:
                                                                            "bold",
                                                                        fontStyle:
                                                                            "italic",
                                                                    }}
                                                                >
                                                                    {
                                                                        item
                                                                            .digital
                                                                            .amount
                                                                    }
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        color: "red",
                                                                        marginTop: 5,
                                                                        fontStyle:
                                                                            "italic",
                                                                        marginLeft: 5,
                                                                    }}
                                                                >
                                                                    {
                                                                        item
                                                                            .digital
                                                                            .title
                                                                    }
                                                                </Text>
                                                            </View>
                                                            <View
                                                                style={
                                                                    styles.wrapperAuthor
                                                                }
                                                            >
                                                                <Text
                                                                    style={
                                                                        styles.textAuthor
                                                                    }
                                                                >
                                                                    {
                                                                        item
                                                                            .author
                                                                            .genres
                                                                            .name
                                                                    }
                                                                </Text>
                                                                <Text
                                                                    style={
                                                                        styles.textAuthor
                                                                    }
                                                                >
                                                                    {
                                                                        item
                                                                            .author
                                                                            .name
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View
                                                            style={
                                                                styles.wrapperImage
                                                            }
                                                        >
                                                            <Image
                                                                style={
                                                                    styles.itemImage
                                                                }
                                                                source={{
                                                                    uri: item.sourceImage,
                                                                }}
                                                            />
                                                            <View
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    top: -2,
                                                                    right: 0,
                                                                    height: 134,
                                                                    width: 20,
                                                                    backgroundColor:
                                                                        "#FFCCE5", //"#efefef
                                                                    shadowColor:
                                                                        "#000",
                                                                    shadowOffset:
                                                                        {
                                                                            width: 100,
                                                                            height: 2,
                                                                        },
                                                                    shadowOpacity: 0.25,
                                                                    shadowRadius: 6,
                                                                    transform: [
                                                                        {
                                                                            rotateY:
                                                                                "50deg",
                                                                        },
                                                                    ],
                                                                    elevation: 15,
                                                                }}
                                                            ></View>
                                                        </View>
                                                    </TouchableOpacity>
                                                );
                                            return (
                                                <TouchableOpacity
                                                    key={item.title.slug}
                                                    onPress={() =>
                                                        alert(item.title.slug)
                                                    }
                                                    style={styles.itemNormal}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                            alignItems:
                                                                "flex-end",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                ...styles.textNormalRank,
                                                                backgroundColor: `${
                                                                    Number(
                                                                        item.numbox
                                                                    ) === 2
                                                                        ? "#E6BF25"
                                                                        : Number(
                                                                              item.numbox
                                                                          ) ===
                                                                          3
                                                                        ? "#E67225"
                                                                        : "#EDEDED"
                                                                }`,
                                                                color: `${
                                                                    Number(
                                                                        item.numbox
                                                                    ) > 3
                                                                        ? "#666"
                                                                        : "white"
                                                                }`,
                                                                width: 40,
                                                            }}
                                                        >
                                                            {item.numbox}
                                                        </Text>
                                                        <Text
                                                            numberOfLines={1}
                                                            style={
                                                                styles.textNormalRankTitle
                                                            }
                                                        >
                                                            {item.title.name}
                                                        </Text>
                                                    </View>
                                                    <Text
                                                        style={{
                                                            ...styles.textNormalRankTitle,
                                                            marginRight: 10,
                                                            fontSize: 16,
                                                        }}
                                                    >
                                                        {item.total}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        }
                                    )}
                                </View>
                            </View>
                        );
                    })
                ) : (
                    <Loader />
                )}
            </PagerView>
        </View>
    );
}
const widthWindow = Dimensions.get("window").width;
const styles = StyleSheet.create({
    wrapperSectionRank: {
        padding: 10,
        height: 650,
    },
    textTitleSection: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Roboto",
        color: "#333333",
    },
    textItemRank: {
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: "Roboto",
        color: "#1a1a1a",
    },
    wrapperItemRank: {
        width: widthWindow,
    },
    textNormalRank: {
        fontSize: 18,
        padding: 5,
        // backgroundColor: "#E67225",
        // E6BF25 : 2
        // E67225 : 3
        // EDEDED : < 3 , color : #666
        width: 28,
        height: 30,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    list: {
        borderTopColor: "black",
        borderTopWidth: 1,
        paddingTop: 10,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemInfo: {
        flexBasis: "50%",
    },
    itemNumberRankN1o1: {
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        width: 50,
        textAlign: "center",
        padding: 2,
    },
    textDigital: {
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
    },
    itemTitle: {
        fontSize: 20,
        marginTop: 5,
        paddingRight: 10,
    },
    wrapperAuthor: {
        flexDirection: "row",
    },
    textAuthor: {
        fontSize: 14,
        color: "#a6a6a6",
        marginHorizontal: 4,
    },
    itemImage: {
        width: 100,
        height: 130,
        transform: [{ rotateY: "-40deg" }],
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
    },
    itemNormal: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginTop: 10,
        paddingTop: 5,
        borderTopColor: "#E6E6E6",
        borderTopWidth: 1,
    },
    wrapperImage: {
        marginRight: 20,
    },
    textNormalRankTitle: {
        color: "#1a1a1a",
        marginLeft: 10,
        width: "65%",
    },
});
