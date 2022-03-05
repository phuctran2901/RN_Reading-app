import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import { db, auth } from "../../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import * as Facebook from "expo-facebook";
import AwesomeAlert from "react-native-awesome-alerts";
import Signup from "./Signup";
import { ContextAuth } from "../../Context/AuthProvider";
import Signin from "./Signin";
const width = Dimensions.get("window").width;

export default function Auth({ navigation }) {
    const [activeForm, setActiveForm] = React.useState(true);
    const [isShowModal, setIsShowModal] = React.useState(false);
    const [_, setIsAuth] = React.useContext(ContextAuth);
    const checkExists = (arr, user) => {
        let isExists = false;
        let result = {};
        arr.forEach((doc) => {
            if (
                (doc.data().idSocical || doc.data().uid) ===
                (user.id || user.uid)
            ) {
                isExists = true;
                result = {
                    ...doc.data(),
                    id: doc.id,
                };
            }
        });
        return { isExists, result };
    };
    const addUser = async (user) => {
        try {
            const usersCollection = collection(db, "users");
            const data = await getDocs(usersCollection);
            const { isExists, result } = checkExists(data, user);
            if (!isExists) {
                await addDoc(collection(db, "users"), {
                    idSocical: user.id || null,
                    fullName:
                        user.name || user.displayName || user.fullName || null,
                    avatar:
                        user.photoUrl ||
                        "https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png",
                    email: user.email,
                    uid: user.uid || null,
                    birthday: user?.birthday || null,
                    phoneNumber: user?.phoneNumber || null,
                    level: 0,
                }).then(async (res) => {
                    await AsyncStorage.setItem(
                        "user",
                        JSON.stringify({
                            id: res.id,
                            idSocical: user?.id || null,
                            fullName:
                                user.name ||
                                user.displayName ||
                                user.fullName ||
                                null,
                            avatar:
                                user.photoUrl ||
                                "https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png",
                            email: user.email,
                            note: user?.note || null,
                            birthday: user?.birthday || null,
                            phoneNumber: user?.phoneNumber || null,
                            uid: user?.stsTokenManager?.uid || null,
                            level: 0,
                        })
                    );

                    setIsAuth(true);
                    setIsShowModal(false);
                    navigation.goBack(null);
                });
            } else {
                await AsyncStorage.setItem("user", JSON.stringify(result));
                setIsAuth(true);
                setIsShowModal(false);
                navigation.goBack(null);
            }
        } catch (err) {
            Alert.alert("Đăng nhập thất bại!");
            setIsShowModal(false);
        }
        setIsShowModal(false);
    };
    const signInWithGoogle = async () => {
        try {
            // setIsShowModal(true);
            const result = await Google.logInAsync({
                clientId:
                    "582161840179-m7snrfrrsha18r3du6j7rporri7s1gve.apps.googleusercontent.com",
                androidStandaloneAppClientId:
                    "582161840179-m7snrfrrsha18r3du6j7rporri7s1gve.apps.googleusercontent.com",
                scopes: ["profile", "email"],
            });
            if (result.type === "success") {
                const { user } = result;
                addUser(user);
            }
        } catch (err) {}
    };

    const logInFacebook = async () => {
        try {
            setIsShowModal(true);
            await Facebook.initializeAsync({
                appId: "960093671290591",
            });
            const { type, token } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ["public_profile", "email"],
                });
            if (type === "success") {
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.type(large)`
                );
                const data = await response.json();
                const { name, email, id, picture } = data;
                const photoUrl = picture.data.url;
                const user = {
                    name,
                    email,
                    id,
                    photoUrl,
                };
                addUser(user);
            } else {
                Alert.alert("Đăng nhập thất bại");
                setIsShowModal(false);
            }
        } catch ({ message }) {
            setIsShowModal(false);
            Alert.alert(`Facebook Login Error: ${message}`);
        }
    };
    const onSubmitRegister = (value) => {
        setIsShowModal(true);
        if (value.password === value.confirmPassword) {
            createUserWithEmailAndPassword(auth, value.email, value.password)
                .then(() => {
                    setActiveForm(true);
                    setIsShowModal(false);
                    Alert.alert("Đăng ký thành công");
                })
                .catch((err) => {
                    setIsShowModal(false);
                    const { message } = err;
                    if (message.includes("Error (auth/email-already-in-use)")) {
                        Alert.alert("Email đã tồn tại");
                    }
                });
        } else {
            Alert.alert("Mật khẩu nhập lại không trùng khớp");
            setIsShowModal(false);
        }
    };
    const loginWithEmailAndPassword = (value) => {
        setIsShowModal(true);
        signInWithEmailAndPassword(auth, value.email, value.password)
            .then(async (res) => {
                const { user } = res;
                addUser(user);
            })
            .catch((err) => {
                setIsShowModal(false);
                Alert.alert("Sai tài khoản hoặc mật khẩu");
            });
    };
    return (
        <View style={styles.wrapper}>
            <AwesomeAlert
                title={"Loading..."}
                show={isShowModal}
                showProgress={true}
                progressColor="black"
                progressSize="large"
                closeOnTouchOutside={false}
            />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            {activeForm ? (
                <Signin
                    onSubmitRegister={onSubmitRegister}
                    styles={styles}
                    setActiveForm={setActiveForm}
                    logInFacebook={logInFacebook}
                    signInWithGoogle={signInWithGoogle}
                    loginWithEmailAndPassword={loginWithEmailAndPassword}
                />
            ) : (
                <Signup
                    onSubmitRegister={onSubmitRegister}
                    styles={styles}
                    setActiveForm={setActiveForm}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center",
    },
    boxAuth: {
        justifyContent: "space-between",
        width: width * 0.8,
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#524ADD",
        textAlign: "center",
        marginBottom: 50,
    },
    boxRemember: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 20,
    },
    boxRememberTitle: {
        color: "#B3C0C9",
        fontWeight: "bold",
        fontSize: 15,
    },
    boxSocicalLogin: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
    },
    buttonLoginSocical: {
        width: width * 0.8,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "black",
        marginHorizontal: 2,
    },
    buttonSubmit: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#524ADD",
        marginTop: 40,
    },
    buttonSubmitText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    registerRedirect: {
        textAlign: "center",
        color: "blue",
        marginTop: 40,
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 30,
    },
});
