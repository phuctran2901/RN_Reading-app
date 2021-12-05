import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeTab from "./HomeTab";
import Detail from "../components/Detail/Detail";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <Stack.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeTab" component={HomeTab} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    );
}
