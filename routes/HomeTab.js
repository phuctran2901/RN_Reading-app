import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoryScreen from "../screens/History/HistoryScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import NofiticationScreen from "../screens/Nofitication/NotificationScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const BottomTab = createBottomTabNavigator();

export default function HomeTab({ navigation }) {
    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "#707070",
            }}
            initialRouteName={"Home"}
        >
            <BottomTab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    headerStyle: {
                        shadowColor: "black",
                        shadowOffset: 2,
                    },
                    tabBarLabel: "Tủ sách",
                    tabBarIcon: ({ focused, color, size }) => {
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
                    tabBarIcon: ({ focused, color, size }) => {
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
                        <TouchableOpacity
                            underlayColor="white"
                            onPress={() => alert("Hello")}
                        >
                            <AntDesign name="search1" size={20} />
                        </TouchableOpacity>
                    ),
                    headerRightContainerStyle: {
                        paddingRight: 20,
                    },
                }}
            />
            <BottomTab.Screen
                name="Nofitication"
                component={NofiticationScreen}
                options={{
                    headerStyle: {
                        shadowColor: "black",
                        shadowOffset: 2,
                    },
                    tabBarLabel: "Thông báo",
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons
                                name="notifications"
                                size={20}
                                color={color}
                            />
                        );
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600",
                    },
                    headerTitle: "Thông báo",
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
