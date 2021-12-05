import React, { useState } from "react";
import { Button, Image, Text, TouchableHighlight, View } from "react-native";
import { Styles } from "./Styles";
import { Foundation } from "@expo/vector-icons";
export default function InfoCard({ info }) {
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
                <Text style={Styles.authorNameInfo} numberOfLines={1}>
                    <Foundation name="pencil" size={16} color="black" />
                    {info?.author?.name}
                </Text>
                <TouchableHighlight
                    onPress={() => alert(info.slug)}
                    style={Styles.buttonCustom}
                    underlayColor={"#20232A"}
                >
                    <Text style={Styles.buttonCustomText}>Đọc truyện</Text>
                </TouchableHighlight>
            </View>
            <View style={{ flex: 1 }}>
                <Image
                    style={{
                        height: heightImage,
                        borderRadius: 10,
                        marginLeft: 10,
                    }}
                    source={{
                        uri: info?.sourceImage,
                    }}
                    resizeMode="cover"
                />
            </View>
        </View>
    );
}
