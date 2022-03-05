import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import HomeTab from "./HomeTab";
import DetailScreen from "../screens/Detail/DetailScreen";
import ListStoryScreen from "../screens/ListStory/ListStoryScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { ContextModal } from "../Context/ModalProvider";
import ReadChapScreen from "../screens/ReadChap/ReadChapScreen";
import ListChapScreen from "../screens/ListChap/ListChapScreen";
import Auth from "../screens/Auth/Auth";
import AudioScreen from "../screens/AudioScreen/AudioScreen";
import EditUser from "../screens/EditUser/EditUser";
import Level from "../screens/Level/Level";
import Search from "../screens/Search/Search";
import { AddPost } from "../screens/AddPost/AddPost";
import Comment from "../screens/Comment/Comment";
const Stack = createNativeStackNavigator();
export default function AppNavigation() {
    const [, setIsVisible] = React.useContext(ContextModal);
    return (
        <Stack.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeTab" component={HomeTab} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => setIsVisible(true)}>
                            <MaterialIcons
                                name="filter-list"
                                size={28}
                                color="black"
                            />
                        </TouchableOpacity>
                    ),
                    headerTitle: () => (
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            Danh sách truyện
                        </Text>
                    ),
                }}
                name="ListStory"
                component={ListStoryScreen}
            />
            <Stack.Screen name="ReadChap" component={ReadChapScreen} />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: "Danh sách chương",
                }}
                name="ListChap"
                component={ListChapScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="AudioScreen"
                component={AudioScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Auth"
                component={Auth}
            />
            <Stack.Screen
                options={{ headerShown: true, headerTitle: "Sửa hồ sơ" }}
                name="EditUser"
                component={EditUser}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: "Cảnh giới",
                }}
                name="Level"
                component={Level}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Search"
                component={Search}
            />
            <Stack.Screen
                name="AddPost"
                component={AddPost}
                options={{
                    headerShown: true,
                    headerTitle: "Thêm review",
                }}
            />
            <Stack.Screen
                name="Comment"
                component={Comment}
                options={{
                    headerShown: true,
                    title: "Bình luận",
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    );
}
