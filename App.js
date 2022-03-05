import React from "react";
import AppNavigation from "./routes/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "react-query";
import { LogBox, AppState } from "react-native";
import { ModalProvider } from "./Context/ModalProvider";
import { useFonts } from "@expo-google-fonts/inter";
import { Tinos_400Regular } from "@expo-google-fonts/tinos";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { OpenSans_400Regular } from "@expo-google-fonts/open-sans";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { Boogaloo_400Regular } from "@expo-google-fonts/boogaloo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./screens/Loading/LoadingScreen";
import { db } from "./config/firebase";
import { updateDoc, doc } from "firebase/firestore";

import { AuthProvider } from "./Context/AuthProvider";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const queryCLient = new QueryClient();
export default function App() {
    const [appState, setAppState] = React.useState(AppState.currentState);
    const timeStart = React.useRef(null);
    const [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        Montserrat_400Regular,
        Tinos_400Regular,
        Roboto_400Regular,
        Boogaloo_400Regular,
    });
    React.useEffect(() => {
        const subcription = AppState.addEventListener(
            "change",
            async (state) => {
                const user = (await AsyncStorage.getItem("user")) || null;
                if (state === "active" && appState === "active" && user) {
                    timeStart.current = new Date();
                }
                if (state !== "active" && user) {
                    if (timeStart.current && user) {
                        const parseUser = JSON.parse(user);
                        const timeOnline =
                            (new Date() - timeStart.current) / 1000;
                        const userRef = doc(db, "users", parseUser.id);
                        await updateDoc(userRef, {
                            level: Number(parseUser.level) + timeOnline,
                        });
                        await AsyncStorage.setItem(
                            "user",
                            JSON.stringify({
                                ...parseUser,
                                level: Number(parseUser.level) + timeOnline,
                            })
                        );
                    }
                }

                if (!user) timeStart.current = null;
                setAppState(state);
            }
        );
        return () => {
            subcription?.remove();
        };
    }, []);

    if (!fontsLoaded) return <LoadingScreen />;
    return (
        <QueryClientProvider client={queryCLient}>
            <AuthProvider>
                <ModalProvider>
                    <NavigationContainer>
                        <AppNavigation />
                    </NavigationContainer>
                </ModalProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}
