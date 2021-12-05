import React from "react";
import AppNavigation from "./routes/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "react-query";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
const queryCLient = new QueryClient();
export default function App() {
    return (
        <QueryClientProvider client={queryCLient}>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </QueryClientProvider>
    );
}
