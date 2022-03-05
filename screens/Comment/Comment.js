import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import CommentItem from "./CommentItem";
import Form from "./Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextAuth } from "../../Context/AuthProvider";
import { db } from "../../config/firebase";
import {
    query,
    where,
    doc,
    onSnapshot,
    getDoc,
    collection,
    addDoc,
    orderBy,
} from "firebase/firestore";
import LoadingScreen from "../Loading/LoadingScreen";
const { width } = Dimensions.get("window");
Array.prototype.forEachAsync = async function (fn) {
    for (let t of this) {
        await fn(t);
    }
};

Array.prototype.forEachAsyncParallel = async function (fn) {
    await Promise.all(this.map(fn));
};
const Comment = ({ navigation, route }) => {
    const [user, setUser] = React.useState();
    const [isAuth] = React.useContext(ContextAuth);
    const [data, setData] = React.useState(null);
    const [isReverse, setIsReverse] = React.useState(false);
    const [postId, setPostId] = React.useState(null);
    React.useEffect(() => {
        getUser();
    }, [navigation]);

    React.useEffect(() => {
        const { idPost } = route.params;
        setPostId(idPost);
        const docRef = collection(db, "comment");
        const queryPost = query(docRef, where("postId", "==", idPost));
        const unsubscribe = onSnapshot(queryPost, async (docSnap) => {
            const listComment = [];
            docSnap.forEach(async (item) => {
                listComment.push({
                    ...item.data(),
                });
            });
            const listData = [];
            for (const item of listComment) {
                const user = await getDoc(doc(db, "users", item.user));
                listData.push({
                    ...item,
                    userInfo: user.data(),
                });
            }
            setData(listData.sort((a, b) => b.createdAt - a.createdAt));
        });
        return () => unsubscribe();
    }, [isReverse]);

    const getUser = async () => {
        const userData = await AsyncStorage.getItem("user");
        if (userData) setUser(JSON.parse(userData));
    };
    const addComment = async (value) => {
        if (user || isAuth) {
            if (value !== "") {
                const postRef = collection(db, "comment");
                const id = "id" + new Date().getTime();
                let dataComment = {
                    user: user?.id,
                    content: value,
                    createdAt: Date.now(),
                    id,
                    postId,
                };
                await addDoc(postRef, {
                    ...dataComment,
                });
            }
        } else {
            Alert.alert("Vui lòng đăng nhập để bình luận");
        }
    };
    if (!data) return <LoadingScreen />;
    return (
        <View style={styles.wrapper}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.optionsBox}>
                    <TouchableOpacity
                        style={{
                            ...styles.optionsText,
                            backgroundColor: isReverse ? "#fff" : "#1C5C86",
                        }}
                        onPress={() => (isReverse ? setIsReverse(false) : null)}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: isReverse ? "black" : "white",
                            }}
                        >
                            Mới nhất
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...styles.optionsText,
                            backgroundColor: isReverse ? "#1C5C86" : "#fff",
                        }}
                        onPress={() => (isReverse ? null : setIsReverse(true))}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: isReverse ? "white" : "black",
                            }}
                        >
                            Cũ nhất
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ marginBottom: 70 }}>
                {data &&
                    !isReverse &&
                    data?.map((item) => (
                        <CommentItem comment={item} key={item?.id} />
                    ))}
                {data &&
                    isReverse &&
                    data
                        ?.reverse()
                        ?.map((item) => (
                            <CommentItem comment={item} key={item?.id} />
                        ))}
            </ScrollView>
            <Form addComment={addComment} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    optionsBox: {
        width: width * 0.7,
        justifyContent: "center",
        flexDirection: "row",
        marginVertical: 10,
        borderRadius: 20,
        borderColor: "#1C5C86",
        borderWidth: 1,
        overflow: "hidden",
    },
    optionsText: {
        flexBasis: "50%",
        textAlign: "center",
        padding: 5,
    },
});

export default Comment;
