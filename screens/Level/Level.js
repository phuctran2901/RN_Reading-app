import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    Alert,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { stylesArr, handleStyleTextLevel } from "../../helper/LevelStyle";
import { EvilIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
export default function Level({ navigation, route }) {
    const [isVisible, setIsVisible] = React.useState(false);
    const [descriptionLevel, setDescriptionLevel] = React.useState("");
    const [user, setUser] = React.useState({});
    const [exp, setExp] = React.useState(0);
    const [stylesLevel, setStylesLevel] = React.useState({});
    React.useEffect(() => {
        const { user } = route.params;
        const { exp, stylesLevel } = handleStyleTextLevel(
            Number(user?.level) || 0
        );
        setExp(exp);
        setStylesLevel(stylesLevel);
        setUser(user);
    }, [navigation]);
    const handleOpenDescriptionLevel = (des) => {
        setDescriptionLevel(des);
        setIsVisible(true);
    };
    return (
        <View style={styles.wrapper}>
            <Modal
                transparent={true}
                onRequestClose={() => {
                    setIsVisible(!isVisible);
                }}
                animationType="fade"
                visible={isVisible}
            >
                <View style={styles.backgroundModal}>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.textModal}>{descriptionLevel}</Text>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => setIsVisible(false)}
                        >
                            <EvilIcons name="close-o" size={40} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.wrapperLevel}>
                <Image
                    style={styles.image}
                    source={{
                        uri: "https://gamek.mediacdn.vn/133514250583805952/2020/6/30/photo-1-15935006303501558549714-1593500662710349227570.jpg",
                    }}
                />
                <View style={styles.infoLevel}>
                    <Text style={styles.textLevel}>
                        Đạo hiệu : {user?.fullName || "Người tu tiên"}
                    </Text>
                    <Text style={styles.textLevel}>
                        Cảnh giới :{" "}
                        {stylesLevel?.children
                            ? "Tiên"
                            : stylesLevel?.levelName || "Dân thường"}
                    </Text>
                    <View style={styles.expLevelWrapper}>
                        <View
                            style={{ ...styles.expLevelUser, width: exp + "%" }}
                        ></View>
                        <Text style={styles.labelLevelUser}>{exp}%</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                {stylesArr.map((item, index) => {
                    if (item?.children?.length) {
                        return (
                            <TouchableOpacity
                                key={index + ""}
                                style={styles.box}
                                onPress={() =>
                                    handleOpenDescriptionLevel(
                                        item?.description
                                    )
                                }
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                >
                                    {item?.children?.map((itemChildren, i) => (
                                        <Text
                                            key={itemChildren?.levelName}
                                            style={{
                                                ...itemChildren.styles,
                                                marginHorizontal:
                                                    i > 0 &&
                                                    i < item?.children?.length
                                                        ? 1
                                                        : 0,
                                            }}
                                        >
                                            {itemChildren?.levelName}
                                        </Text>
                                    ))}
                                </View>
                                <AntDesign
                                    name="right"
                                    size={20}
                                    color="#AAAAAA"
                                />
                            </TouchableOpacity>
                        );
                    } else {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    handleOpenDescriptionLevel(
                                        item?.description
                                    )
                                }
                                style={styles.box}
                                key={item?.levelName}
                            >
                                <Text style={{ ...item?.styles }}>
                                    {item?.levelName}
                                </Text>
                                <AntDesign
                                    name="right"
                                    size={20}
                                    color="#AAAAAA"
                                />
                            </TouchableOpacity>
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    wrapperLevel: {
        width,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: "row",
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: "cover",
        borderRadius: 50,
    },
    infoLevel: {
        marginLeft: 10,
    },
    textLevel: {
        fontFamily: "Boogaloo_400Regular",
        fontSize: 18,
    },
    slider: {
        marginTop: 10,
        width,
        padding: 10,
    },
    expLevelWrapper: {
        width: width / 2,
        height: 15,
        backgroundColor: "#AAAA",
        marginTop: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    expLevelUser: {
        width: "33%",
        height: "100%",
        position: "absolute",
        backgroundColor: "orange",
    },
    labelLevelUser: {
        width: "100%",
        height: "100%",
        fontSize: 12,
        textAlign: "center",
    },
    box: {
        backgroundColor: "#fff",
        marginVertical: 5,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    wrapperModal: {
        position: "absolute",
        top: height / 3.5,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        position: "absolute",
        top: 10,
        right: 20,
    },
    backgroundModal: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    textModal: {
        fontSize: 16,
        lineHeight: 22,
        marginTop: 15,
    },
});
