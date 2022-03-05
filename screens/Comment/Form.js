import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const Form = ({ addComment }) => {
    const [valueComment, setValueComment] = React.useState("");
    React.useEffect(() => {
        return () => setValueComment(null);
    }, []);
    return (
        <View style={styles.formComment}>
            <MaterialIcons
                style={{ ...styles.icon, left: 10 }}
                name="insert-comment"
                size={24}
                color="#AAAA"
            />
            <TextInput
                onChangeText={(text) => setValueComment(text)}
                style={styles.input}
                placeholder="Thêm bình luận"
                value={valueComment}
            />
            <TouchableOpacity
                style={{
                    ...styles.icon,
                    right: 10,
                    height: "100%",
                }}
                onPress={() => {
                    addComment(valueComment);
                    setValueComment("");
                }}
            >
                <Ionicons name="send" size={24} color="#AAAA" />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    formComment: {
        position: "absolute",
        width: width,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "#C3C3C3",
        borderWidth: 1,
        backgroundColor: "#fff",
    },
    input: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        fontSize: 18,
        color: "#AAAA",
    },
    icon: {
        position: "absolute",
        top: 20,
        zIndex: 100,
    },
});
export default Form;
