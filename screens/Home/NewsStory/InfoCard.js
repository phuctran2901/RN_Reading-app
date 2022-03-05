import React, { useState } from "react";
import {
    Button,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Styles } from "./Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
export default function InfoCard({ info, navigation }) {
    const [heightImage, setHeightImage] = useState();
    return (
        <View style={Styles.infoWrapper}>
            <View
                style={{ flex: 1 }}
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setHeightImage(height);
                }}
            >
                <Text style={Styles.textInfoType}>{info?.author?.type}</Text>
                <Text style={Styles.textInfoTitle} numberOfLines={2}>
                    {info?.title}
                </Text>
                <Text numberOfLines={2} style={Styles.textInfoDes}>
                    {info?.author?.intro?.trim()}
                </Text>
                <View style={Styles.genresInfo}>
                    <Text style={Styles.genresText}>
                        {info?.author?.status}
                    </Text>
                </View>
                <Text
                    style={{ ...Styles.authorNameInfo, color: "#AAAA" }}
                    numberOfLines={1}
                >
                    <MaterialIcons name="smartphone" size={16} color="#AAAA" />
                    <Text>{info?.author?.chapter} chương</Text>
                </Text>
                <Text style={Styles.authorNameInfo} numberOfLines={1}>
                    <Foundation name="pencil" size={16} color="black" />
                    {info?.author?.name}
                </Text>
            </View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                    navigation.navigate("Detail", { idStory: info?.slug })
                }
                style={{ flex: 1, marginRight: 10 }}
            >
                <Image
                    style={{
                        width: "100%",
                        height: heightImage,
                        borderRadius: 10,
                        marginLeft: 10,
                    }}
                    source={{
                        uri: info?.sourceImage,
                    }}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    );
}
