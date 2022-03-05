import { Text } from "react-native";
import React from "react";
export const handleRenderLevel = (levelUser, fontSize = 20) => {
    if (levelUser?.children) {
        return levelUser?.children?.map((item) => (
            <Text key={item?.levelName} style={{ ...item?.styles, fontSize }}>
                {item?.levelName}
            </Text>
        ));
    }
    return <Text style={levelUser?.styles}>{levelUser.levelName}</Text>;
};
