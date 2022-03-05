import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
export default function Input({
    errorText,
    onChange,
    onBlur,
    value,
    icon,
    placeholder,
    isPassword,
}) {
    const [color, setColor] = React.useState("black");
    const checkText = () => {
        if (errorText?.length !== 0 && errorText !== undefined) {
            return true;
        } else {
            return false;
        }
    };
    return (
        <View>
            <View style={styles.wrapperIcon}>
                <MaterialIcons name={icon} size={30} color={color} />
            </View>
            <TextInput
                style={styles.input}
                onBlur={(e) => {
                    setColor("black");
                    onBlur(e);
                }}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                onFocus={() => setColor("blue")}
                placeholder={placeholder}
                secureTextEntry={isPassword}
            />
            {checkText() && <Text style={styles.errorInput}>{errorText}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1,
        height: 60,
        marginTop: 20,
        color: "#B3C0C9",
        paddingLeft: 50,
    },
    errorInput: {
        color: "red",
        marginLeft: 10,
        marginTop: 5,
    },
    wrapperIcon: {
        position: "absolute",
        top: 35,
        left: 15,
    },
});
