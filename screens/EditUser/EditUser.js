import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { storage, db } from "../../config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import AwesomeAlert from "react-native-awesome-alerts";

const { width } = Dimensions.get("window");

export default function EditUser({ navigation }) {
    const [user, setUser] = React.useState();
    const [isShowModal, setIsShowModal] = React.useState(false);
    const [isShowLoading, setIsShowLoading] = React.useState(false);
    const { control, handleSubmit, formState, reset } = useForm(
        {
            defaultValues: React.useMemo(() => {
                return {
                    fullName: user?.fullName,
                    phoneNumber: user?.phoneNumber,
                    birthday: user?.birthday,
                    note: user?.note || null,
                };
            }),
        },
        [user]
    );
    const isFormEdited = formState.isDirty;
    const isFocused = useIsFocused();
    const [file, setFile] = React.useState();
    const uploadImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "image/*",
            copyToCacheDirectory: true,
        }).then((response) => {
            if (response.type == "success") {
                let { name, size, uri } = response;
                let nameParts = name.split(".");
                let fileType = nameParts[nameParts.length - 1];
                var fileToUpload = {
                    name: name,
                    size: size,
                    uri: uri,
                    type: "application/" + fileType,
                };
                setFile(fileToUpload);
            }
        });
    };
    React.useEffect(async () => {
        if (isFocused) {
            const data = (await AsyncStorage.getItem("user")) || null;
            setUser(JSON.parse(data));
            reset(JSON.parse(data));
        }
    }, [isFocused]);

    const handleOnSubmit = async (value) => {
        setIsShowLoading(true);
        if (file) {
            const response = await fetch(file.uri);
            const blob = await response.blob();
            const storageRef = ref(storage, "Image/" + file.name);
            uploadBytes(storageRef, blob).then((snapshot) => {
                getDownloadURL(storageRef).then((res) => {
                    let newUser = { ...value, avatar: res };
                    handleEditUser(newUser);
                });
            });
        } else {
            handleEditUser(value);
        }
    };
    const handleEditUser = async (newUser) => {
        await updateDoc(doc(db, "users", user.id), {
            ...newUser,
        });
        await AsyncStorage.setItem(
            "user",
            JSON.stringify({
                ...user,
                ...newUser,
            })
        );
        setUser({ ...user, ...newUser });
        setIsShowModal(true);
        setIsShowLoading(false);
    };
    const isDisableButtonSubmit = () => {
        if ((file ? true : false) || isFormEdited) {
            return false;
        }
        return true;
    };

    return (
        <ScrollView style={styles.wrapper}>
            <AwesomeAlert
                title={"Loading..."}
                show={isShowLoading}
                showProgress={true}
                progressColor="black"
                progressSize="large"
                closeOnTouchOutside={false}
            />
            <AwesomeAlert
                title={"Thông báo"}
                confirmText="OK luôn !"
                confirmButtonColor="purple"
                confirmButtonTextStyle={confirmButtonTextStyle}
                message={"Đã đổi thông tin đạo hữu thành công"}
                titleStyle={titleStyleModal}
                show={isShowModal}
                closeOnTouchOutside={false}
                showConfirmButton={true}
                onConfirmPressed={() => setIsShowModal(false)}
            />
            <View style={styles.wrapperImage}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: file?.uri || user?.avatar }}
                />
                <TouchableOpacity
                    style={styles.buttonUpload}
                    onPress={uploadImage}
                >
                    <FontAwesome name="camera-retro" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.wrapperInput}>
                <View style={styles.groupInput}>
                    <TextInput
                        value={user?.email?.toString()}
                        style={styles.input}
                        placeholder="Email..."
                        editable={false}
                        selectTextOnFocus={false}
                    />
                    <MaterialIcons
                        style={styles.icon}
                        name="email"
                        size={24}
                        color="#AAAAAA"
                    />
                </View>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <View style={styles.groupInput}>
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    style={styles.input}
                                    placeholder="Họ tên..."
                                    value={value}
                                />
                                <Feather
                                    name="users"
                                    size={24}
                                    color="#AAAAAA"
                                    style={styles.icon}
                                />
                            </View>
                        );
                    }}
                    name="fullName"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <View style={styles.groupInput}>
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    style={styles.input}
                                    placeholder="Số điện thoại..."
                                />
                                <Feather
                                    style={styles.icon}
                                    name="phone"
                                    size={24}
                                    color="#AAAAAA"
                                />
                            </View>
                        );
                    }}
                    name="phoneNumber"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <View style={styles.groupInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Năm sinh..."
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value?.toString()}
                                    keyboardType="numeric"
                                />
                                <AntDesign
                                    style={styles.icon}
                                    name="calendar"
                                    size={24}
                                    color="#AAAAAA"
                                />
                            </View>
                        );
                    }}
                    name="birthday"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <View style={styles.groupInput}>
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    style={styles.input}
                                    numberOfLines={4}
                                    multiline={true}
                                    placeholder="Giới thiệu ngắn..."
                                />
                                <MaterialCommunityIcons
                                    style={styles.icon}
                                    name="newspaper-variant"
                                    size={24}
                                    color="#AAAAAA"
                                />
                            </View>
                        );
                    }}
                    name="note"
                />
            </View>
            <View style={styles.wrapperButton}>
                <TouchableOpacity
                    disabled={isDisableButtonSubmit()}
                    onPress={handleSubmit(handleOnSubmit)}
                    style={{
                        ...styles.buttonSubmit,
                        backgroundColor:
                            isFormEdited || file ? "purple" : "#C081C0",
                    }}
                    activeOpacity={0.8}
                >
                    <Text style={styles.textButtonSubmit}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const confirmButtonTextStyle = {
    fontSize: 14,
    fontWeight: "bold",
};

const titleStyleModal = {
    color: "tomato",
    fontSize: 20,
    fontWeight: "bold",
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    wrapperImage: {
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        marginTop: 50,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 1,
    },
    buttonUpload: {
        position: "absolute",
        bottom: -30,
        right: 130,
    },
    buttonSubmitFile: {
        marginTop: 20,
        backgroundColor: "black",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    wrapperInput: {
        marginTop: 50,
        paddingHorizontal: 20,
    },
    groupInput: {
        marginVertical: 10,
    },
    input: {
        borderBottomColor: "#AAAAAA",
        borderBottomWidth: 1,
        height: 50,
        paddingHorizontal: 20,
        paddingLeft: 60,
    },
    icon: {
        position: "absolute",
        top: 10,
        left: 20,
    },
    wrapperButton: {
        paddingHorizontal: 20,
    },
    buttonSubmit: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 10,
    },
    textButtonSubmit: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
