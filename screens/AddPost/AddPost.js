import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Alert,
    Button,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import Card from "./Card";
import { AntDesign } from "@expo/vector-icons";
import SkeletonContent from "react-native-skeleton-content";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useDebounce from "../../hooks/useDebounce";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useQuery } from "react-query";
import { searchStory } from "../../api";
const { width, height } = Dimensions.get("window");

export const AddPost = ({ navigation }) => {
    const [keyword, setKeyword] = React.useState(undefined);
    const debounceKeyword = useDebounce(keyword, 500);
    const [contentPost, setContentPost] = React.useState(null);
    const [isSelected, setIsSelected] = React.useState(false);
    const [isShowLoading, setIsShowLoading] = React.useState(false);
    const [story, setStory] = React.useState();
    const { data, isLoading, isFetching } = useQuery(
        ["search", debounceKeyword],
        searchStory,
        { enabled: Boolean(debounceKeyword) }
    );
    React.useEffect(() => {
        setKeyword(undefined);
    }, []);
    const handleSetSelectStory = (story) => {
        setStory(story);
        setIsSelected(true);
        setKeyword(undefined);
    };
    const handleRemoveSelect = () => {
        setStory(null);
        setIsSelected(false);
    };
    const handleAddPost = async () => {
        setIsShowLoading(true);
        try {
            if (contentPost?.trim()?.length !== 0 && story) {
                const user = await AsyncStorage.getItem("user");
                let data = {
                    content: contentPost,
                    story: {
                        ...story,
                    },
                };
                await addDoc(collection(db, "post"), {
                    ...data,
                    createdAt: Date.now(),
                    user: JSON.parse(user).id,
                    listLike: [],
                });
                setIsShowLoading(false);
                navigation.goBack();
            } else {
                setIsShowLoading(false);
                Alert.alert("Vui lòng nhập đầy đủ thông tin");
            }
        } catch (err) {
            setIsShowLoading(false);
            Alert.alert(err.message);
        }
    };

    return (
        <View style={styles.wrapper}>
            <AwesomeAlert
                title={"Loading..."}
                show={isShowLoading}
                showProgress={true}
                progressColor="black"
                progressSize="large"
                closeOnTouchOutside={false}
            />
            <TextInput
                placeholder="Nhập nội dung ở đây, nghiêm cấm spam nội dung không liên quan"
                multiline={true}
                numberOfLines={10}
                style={styles.input}
                onChangeText={(text) => setContentPost(text)}
            />
            {isSelected && (
                <View style={styles.wrapperSelect}>
                    <Text style={styles.selectStory}>{story?.name}</Text>
                    <TouchableOpacity onPress={handleRemoveSelect}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )}
            {!isSelected && (
                <TextInput
                    style={{
                        ...styles.input,
                        textAlignVertical: "center",
                        padding: 10,
                    }}
                    onChangeText={(text) => setKeyword(text)}
                    placeholder="Nhập tên truyện bạn muốn review"
                />
            )}
            {!isSelected && (
                <ScrollView>
                    <SkeletonContent
                        containerStyle={{ flex: 1, width }}
                        isLoading={isLoading || isFetching}
                        layout={[...new Array(10)].map((_, i) => {
                            return {
                                key: i,
                                width: width,
                                height: 60,
                                marginVertical: 6,
                            };
                        })}
                    >
                        {data &&
                            data?.dataSearch?.map((item) => (
                                <Card
                                    handleSetSelectStory={handleSetSelectStory}
                                    item={item}
                                    key={item?.url}
                                />
                            ))}
                    </SkeletonContent>
                </ScrollView>
            )}
            {contentPost?.trim()?.length !== 0 && story && (
                <View style={styles.wrapperButton}>
                    <Button onPress={handleAddPost} title="Lưu" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        textAlignVertical: "top",
        marginTop: 10,
        padding: 10,
        fontSize: 16,
    },
    wrapperSelect: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#fff",
        marginTop: 10,
    },
    wrapperButton: {
        marginTop: 10,
    },
});

export default AddPost;
