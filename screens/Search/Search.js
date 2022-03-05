import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { searchStory } from "../../api/index";
import { useQuery } from "react-query";
import useDebounce from "../../hooks/useDebounce";
import ListCard from "./ListCard";
const { width } = Dimensions.get("window");

export default function Search({ navigation }) {
    const textRef = React.useRef();
    const [keyword, setKeyword] = React.useState(undefined);
    const debounceKeyword = useDebounce(keyword, 500);
    const { data, isLoading, isFetching } = useQuery(
        ["search", debounceKeyword],
        searchStory,
        { enabled: Boolean(debounceKeyword) }
    );
    React.useEffect(() => {
        textRef.current.focus();
    }, [navigation]);
    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={28} color="black" />
                </TouchableOpacity>
                <View style={styles.form}>
                    <Ionicons
                        style={styles.icon}
                        name="search-sharp"
                        size={20}
                        color="black"
                    />
                    <TextInput
                        ref={textRef}
                        placeholder="Nhập nội dung tìm kiếm..."
                        style={styles.input}
                        onChangeText={(text) => setKeyword(text)}
                    />
                    <TouchableOpacity style={styles.buttonSubmit}>
                        <Text style={styles.text}>Tìm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={styles.box}>
                <Text style={{ ...styles.textBox, ...styles.activeTextBox }}>
                    Tên truyện
                </Text>
                <Text style={styles.textBox}>Tác giả</Text>
            </View> */}
            <ScrollView style={styles.listCardWrapper}>
                {!isLoading && !isFetching && (
                    <ListCard
                        isLoading={isLoading}
                        isFetching={isFetching}
                        data={data?.dataSearch}
                        navigation={navigation}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        backgroundColor: "#FFF",
        flexDirection: "row",
        paddingBottom: 20,
        paddingTop: 50,
        paddingHorizontal: 30,
        justifyContent: "space-between",
        alignItems: "center",
    },
    form: {
        flexDirection: "row",
        width: "80%",
    },
    input: {
        width: "100%",
        backgroundColor: "#EAEAEA",
        borderRadius: 15,
        paddingVertical: 10,
        paddingLeft: 30,
        paddingRight: 50,
    },
    icon: {
        position: "absolute",
        left: 5,
        zIndex: 10,
        top: 13,
    },
    text: {
        fontSize: 16,
        color: "#546471",
    },
    box: {
        position: "relative",
        top: 10,
        left: (width - width * 0.7) / 2,
        backgroundColor: "white",
        borderRadius: 5,
        width: width * 0.7,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0.5,
        elevation: 2,
        overflow: "hidden",
    },
    textBox: {
        width: "50%",
        color: "black",
        textAlign: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    activeTextBox: {
        color: "white",
        backgroundColor: "#137D8F",
        fontWeight: "bold",
    },
    buttonSubmit: {
        position: "absolute",
        right: 10,
        top: 13,
        zIndex: 10,
    },
    listCardWrapper: {
        paddingTop: 10,
    },
});
