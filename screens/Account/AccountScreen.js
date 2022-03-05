import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ContextAuth } from "../../Context/AuthProvider";
import { handleStyleTextLevel } from "../../helper/LevelStyle";
import LoadingScreen from "../Loading/LoadingScreen";
import { handleRenderLevel } from "../../helper/renderLevel";
export default function AccountScreen({ navigation }) {
    const [_, setIsAuth] = React.useContext(ContextAuth);
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [stylesLevel, setStylesLevel] = React.useState({});
    const isFocused = useIsFocused();
    React.useEffect(() => {
        getUser();
    }, [navigation, isFocused]);
    const getUser = async () => {
        setIsLoading(true);
        const data = (await AsyncStorage.getItem("user")) || null;
        if (data) {
            setUser(JSON.parse(data));
            const style = handleStyleTextLevel(JSON.parse(data).level || 0);
            setStylesLevel(style);
        }
        setIsLoading(false);
    };
    const signOut = async () => {
        await AsyncStorage.removeItem("user");
        setUser(null);
        setIsAuth(false);
    };
    if (isLoading) return <LoadingScreen />;
    if (!user && !isLoading) {
        return (
            <View style={styles.wrapper}>
                <View style={styles.sectionItem}>
                    <View style={styles.sectionItemIcon}>
                        <Image
                            style={styles.sectionImage}
                            source={{
                                uri: "https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png",
                            }}
                        />
                        <View>
                            <Text
                                style={{
                                    ...styles.sectionText,
                                    fontWeight: "bold",
                                    fontSize: 20,
                                }}
                            >
                                Chưa Đăng Nhập
                            </Text>
                            <Text style={styles.sectionText}>Khách</Text>
                        </View>
                    </View>
                    <AntDesign name="right" size={20} color="#7F7F7F" />
                </View>
                <Text style={styles.text}>Tài khoản</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Auth")}
                    activeOpacity={0.7}
                    style={styles.sectionItem}
                >
                    <View style={styles.sectionItemIcon}>
                        <Entypo name="login" size={20} color="#7F7F7F" />
                        <Text style={styles.sectionText}>Đăng nhập</Text>
                    </View>
                    <AntDesign name="right" size={20} color="#7F7F7F" />
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.wrapper}>
            <View style={styles.sectionItem}>
                <View style={styles.sectionItemIcon}>
                    <Image
                        style={styles.sectionImage}
                        source={{
                            uri: user?.avatar,
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                ...styles.sectionText,
                                fontWeight: "bold",
                                fontSize: 20,
                            }}
                        >
                            {user?.fullName || user?.email}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                marginLeft: 10,
                                width: "100%",
                            }}
                        >
                            {handleRenderLevel(stylesLevel.stylesLevel)}
                        </View>
                    </View>
                </View>
                <AntDesign name="right" size={20} color="#7F7F7F" />
            </View>
            <Text style={styles.text}>Tài khoản</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("EditUser")}
                activeOpacity={0.7}
                style={styles.sectionItem}
            >
                <View style={styles.sectionItemIcon}>
                    <FontAwesome5 name="user-edit" size={20} color="#7F7F7F" />
                    <Text style={styles.sectionText}>Sửa hồ sơ</Text>
                </View>
                <AntDesign name="right" size={20} color="#7F7F7F" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.sectionItem}
                onPress={() => navigation.navigate("Level", { user })}
            >
                <View style={styles.sectionItemIcon}>
                    <MaterialCommunityIcons
                        name="meditation"
                        size={24}
                        color="#7F7F7F"
                    />
                    <Text style={styles.sectionText}>Cảnh giới</Text>
                </View>
                <AntDesign name="right" size={20} color="#7F7F7F" />
            </TouchableOpacity>
            <Text style={styles.text}>Về chúng tôi</Text>
            <TouchableOpacity
                style={styles.sectionItem}
                activeOpacity={0.9}
                onPress={() =>
                    Alert.alert("Số điện thoại liên hệ : 0896728429")
                }
            >
                <View style={styles.sectionItemIcon}>
                    <MaterialIcons
                        name="contact-phone"
                        size={20}
                        color="#7F7F7F"
                    />
                    <Text style={styles.sectionText}>Liên hệ</Text>
                </View>
                <AntDesign name="right" size={20} color="#7F7F7F" />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                    Alert.alert("Liên hệ gmail : hp.sliver123@gmail.com")
                }
                style={styles.sectionItem}
            >
                <View style={styles.sectionItemIcon}>
                    <MaterialIcons name="email" size={20} color="#7F7F7F" />
                    <Text style={styles.sectionText}>Email</Text>
                </View>
                <AntDesign name="right" size={20} color="#7F7F7F" />
            </TouchableOpacity>
            <View style={{ ...styles.sectionItem, marginTop: 20 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => signOut()}
                    style={styles.sectionItemIcon}
                >
                    <FontAwesome name="sign-out" size={20} color="#7F7F7F" />
                    <Text style={styles.sectionText}>Đăng xuất</Text>
                </TouchableOpacity>
                <AntDesign name="right" size={20} color="#7F7F7F" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    sectionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderBottomColor: "#EBEBEB",
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1C1C1C",
        marginVertical: 10,
        marginLeft: 10,
    },
    sectionItemIcon: {
        flexDirection: "row",
        alignItems: "center",
    },
    sectionText: {
        marginLeft: 10,
        fontSize: 16,
    },
    sectionImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
});
