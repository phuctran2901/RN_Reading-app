import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoryScreen from "../screens/History/HistoryScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import Review from "../screens/ReviewScreen/Review";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextAuth } from "../Context/AuthProvider";
import { AntDesign } from "@expo/vector-icons";
const BottomTab = createBottomTabNavigator();

export default function HomeTab({ navigation }) {
    const [isAuth] = React.useContext(ContextAuth);
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        getUser();
        console.log("heelo");
    }, [isAuth]);

    const getUser = async () => {
        const data = await AsyncStorage.getItem("user");
        if (data) {
            setUser(JSON.parse(data));
        } else {
            setUser(null);
        }
    };
    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "#707070",
            }}
            initialRouteName={"Home"}
        >
            <BottomTab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    tabBarLabel: "Tủ sách",
                    tabBarIcon: ({ color }) => {
                        return (
                            <Ionicons name="library" size={20} color={color} />
                        );
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600",
                    },
                    headerTitle: "Tủ sách",
                }}
            />
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitleAlign: "center",
                    headerStyle: {
                        shadowColor: "black",
                        shadowOffset: 2,
                    },
                    tabBarLabel: "Thư viện",
                    tabBarIcon: ({ color }) => {
                        return (
                            <AntDesign name="book" size={25} color={color} />
                        );
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600",
                    },
                    headerTitle: "Thư viện",
                    headerRight: () => (
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                underlayColor="white"
                                onPress={() => navigation.navigate("Search")}
                            >
                                <AntDesign name="search1" size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                underlayColor="white"
                                style={{ marginLeft: 20 }}
                                onPress={() =>
                                    navigation.navigate("ListStory", {
                                        tp: "cv",
                                    })
                                }
                            >
                                <AntDesign
                                    name="barschart"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerRightContainerStyle: {
                        paddingRight: 20,
                    },
                }}
            />
            <BottomTab.Screen
                name="Review"
                component={Review}
                options={{
                    headerStyle: {
                        shadowColor: "black",
                        shadowOffset: 2,
                    },
                    tabBarLabel: "Tường",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <FontAwesome
                                name="newspaper-o"
                                size={20}
                                color={color}
                            />
                        );
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                if (isAuth || user) {
                                    navigation.navigate("AddPost");
                                } else {
                                    navigation.navigate("Auth");
                                }
                            }}
                        >
                            <AntDesign
                                name="addfolder"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    ),
                    headerRightContainerStyle: {
                        paddingRight: 20,
                        marginTop: 5,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600",
                    },
                    headerTitle: "Tường",
                }}
            />
            <BottomTab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    headerStyle: {
                        shadowColor: "black",
                        shadowOffset: 2,
                    },
                    tabBarLabel: "Tài khoản",
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <MaterialIcons
                                name="switch-account"
                                size={20}
                                color={color}
                            />
                        );
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600",
                    },
                    headerTitle: "Tài khoản",
                }}
            />
        </BottomTab.Navigator>
    );
}
