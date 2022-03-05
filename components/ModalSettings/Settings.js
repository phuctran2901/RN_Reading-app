import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
export default function Settings({
    theme,
    fontFamily,
    setTheme,
    setFontFamily,
    themeIndex,
    fontFamilyIndex,
    fontSize,
    setFontSize,
}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
            <View style={styles.mode}>
                <Text style={styles.textPrimary}>Chế độ đọc</Text>
                <View style={styles.modeOption}>
                    <Text style={styles.modeOptionTextActive}>
                        <Ionicons
                            name="reader-outline"
                            size={24}
                            color="#9E9E9E"
                        />
                        Cuộn dọc
                    </Text>
                    <Text style={styles.modeOptionText}>
                        <Ionicons
                            name="reader-outline"
                            size={24}
                            color="white"
                        />
                        Lật trang
                    </Text>
                </View>
            </View>
            <View style={styles.boxSize}>
                <Text style={styles.textPrimary}>Cỡ chữ</Text>
                <View style={styles.sizeText}>
                    <Text style={styles.sizeTextSmall}>A</Text>
                    <Slider
                        style={{ width: "80%", height: 40 }}
                        minimumValue={14}
                        maximumValue={30}
                        value={fontSize}
                        onValueChange={(value) => setFontSize(value)}
                        onSlidingComplete={(value) =>
                            AsyncStorage.setItem("size", String(value))
                        }
                        minimumTrackTintColor="black"
                        maximumTrackTintColor="#000000"
                    />
                    <Text style={styles.sizeTextLarge}>A</Text>
                </View>
            </View>
            <View style={styles.boxColor}>
                <Text style={styles.textPrimary}>Màu</Text>
                <View style={styles.listColor}>
                    {theme &&
                        theme?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setTheme(index);
                                        AsyncStorage.setItem(
                                            "theme",
                                            String(index)
                                        );
                                    }}
                                    activeOpacity={0.9}
                                    key={"_" + item}
                                    style={{
                                        ...styles.itemColor,
                                        backgroundColor: item,
                                        borderColor:
                                            index === themeIndex
                                                ? "blue"
                                                : "#BEBEBE",
                                        borderWidth: 2,
                                    }}
                                >
                                    {themeIndex === index ? (
                                        <Text>
                                            <AntDesign
                                                name="check"
                                                size={20}
                                                color={
                                                    index <= 2
                                                        ? "black"
                                                        : "white"
                                                }
                                            />
                                        </Text>
                                    ) : (
                                        <Text></Text>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                </View>
            </View>
            <View style={styles.boxFont}>
                <Text style={styles.textPrimary}>Font chữ</Text>
                {fontFamily &&
                    fontFamily?.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                setFontFamily(index);
                                AsyncStorage.setItem(
                                    "fontFamily",
                                    String(index)
                                );
                            }}
                            activeOpacity={0.9}
                            key={item + "_"}
                            style={{
                                ...styles.itemFont,
                                backgroundColor:
                                    index === fontFamilyIndex
                                        ? "#F5F5F5"
                                        : "white",
                            }}
                        >
                            <Text style={styles.itemFontText}>{item}</Text>
                            {fontFamilyIndex === index ? (
                                <Text>
                                    <AntDesign
                                        name="check"
                                        size={20}
                                        color={index <= 2 ? "black" : "white"}
                                    />
                                </Text>
                            ) : (
                                <Text></Text>
                            )}
                        </TouchableOpacity>
                    ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mode: {
        marginBottom: 15,
    },
    modeOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 30,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#AFC7D6",
        marginTop: 10,
    },
    modeOptionText: {
        flexBasis: "50%",
        textAlign: "center",
        backgroundColor: "#9E9E9E",
        paddingVertical: 5,
        paddingHorizontal: 5,
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
    },
    modeOptionTextActive: {
        flexBasis: "50%",
        textAlign: "center",
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 5,
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center",
        color: "#9E9E9E",
        fontWeight: "bold",
    },
    boxSize: {
        marginTop: 20,
        marginBottom: 15,
    },
    textPrimary: {
        fontSize: 20,
        fontWeight: "bold",
    },
    sizeText: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 30,
        backgroundColor: "#F5F5F5",
    },
    sizeTextSmall: {
        fontSize: 14,
        fontWeight: "bold",
    },
    sizeTextLarge: {
        fontSize: 30,
        fontWeight: "bold",
    },
    boxColor: {
        marginTop: 10,
        marginBottom: 15,
    },
    listColor: {
        marginTop: 10,
        flexDirection: "row",
    },
    itemColor: {
        width: width * 0.15,
        height: width * 0.08,
        borderRadius: 20,
        marginHorizontal: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    itemFont: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    itemFontText: {
        fontSize: 18,
        color: "#333",
    },
});
