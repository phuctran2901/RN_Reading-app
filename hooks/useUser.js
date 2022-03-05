import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function () {
    const asyncData = (await AsyncStorage.getItem("user")) || {};
    const user = JSON.parse(asyncData);

    return user;
}
