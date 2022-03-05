import React from "react";
import { StyleSheet, Text, ScrollView, Dimensions, Alert } from "react-native";
import { db } from "../../config/firebase";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    query,
    getDoc,
    orderBy,
} from "firebase/firestore";
import Post from "./Post";
import { useIsFocused } from "@react-navigation/native";

import SkeletonContent from "react-native-skeleton-content";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");

const layoutPost = {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 5,
    children: [
        {
            flexDirection: "row",
            children: [
                {
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                },
                {
                    children: [
                        {
                            width: 100,
                            height: 15,
                            marginLeft: 10,
                        },
                        {
                            width: 70,
                            height: 15,
                            marginLeft: 10,
                            marginTop: 10,
                        },
                    ],
                },
            ],
        },
        {
            width,
            height: 100,
            marginTop: 10,
        },
    ],
};

export const Review = ({ navigation }) => {
    const [posts, setPosts] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const isFocused = useIsFocused();
    const getUser = async () => {
        const data = (await AsyncStorage.getItem("user")) || null;
        if (data) {
            setUser(JSON.parse(data));
        }
    };
    const getPosts = React.useCallback(async () => {
        setIsLoading(true);
        try {
            if (isFocused) {
                const docRef = collection(db, "post");
                const queryPost = query(docRef, orderBy("createdAt", "desc"));
                const docSnap = await getDocs(queryPost);
                const listPost = [];
                docSnap.forEach((item) => {
                    listPost.push({ ...item.data(), id: item.id });
                });
                const listData = [];
                for (const item of listPost) {
                    const user = await getDoc(doc(db, "users", item.user));
                    listData.push({
                        ...item,
                        user: user.data(),
                    });
                }
                setPosts(listData);
                setIsLoading(false);
            }
        } catch (err) {
            Alert.alert(err.message);
        }
    }, [isFocused]);
    React.useEffect(() => {
        if (isFocused) {
            getPosts();
            getUser();
        }
    }, [navigation, isFocused]);
    const handleAddLikePost = async (idPost, listLike, idUser, isLike) => {
        if (user) {
            console.log(user);
            if (isLike) {
                listLike.push(idUser);
                await updateDoc(doc(db, "post", idPost), {
                    listLike: listLike,
                });
            } else {
                const index = listLike.indexOf(idUser);
                if (index > -1) listLike.splice(index, 1);
                await updateDoc(doc(db, "post", idPost), {
                    listLike: listLike,
                });
            }
        } else {
            Alert.alert("Đăng nhập để thích");
        }
    };
    return (
        <ScrollView>
            <SkeletonContent
                containerStyle={styles.wrapper}
                isLoading={isLoading}
                layout={[...new Array(5)].map((_) => layoutPost)}
            >
                {posts &&
                    Array.from(posts).map((item) => {
                        return (
                            <Post
                                post={item}
                                key={item?.createdAt}
                                navigation={navigation}
                                user={user}
                                handleAddLikePost={handleAddLikePost}
                            />
                        );
                    })}
            </SkeletonContent>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width,
    },
});

export default Review;
