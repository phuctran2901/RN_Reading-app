import React from "react";
import { Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useForm, Controller } from "react-hook-form";

import Input from "./Input";

export default function Signin({
    styles,
    signInWithGoogle,
    logInFacebook,
    loginWithEmailAndPassword,
    setActiveForm,
}) {
    const [showPassword, setShowPassword] = React.useState(true);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    return (
        <View style={styles.boxAuth}>
            <Text style={styles.title}>Đăng nhập</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                    message: "Vui lòng nhập email",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Trường này phải là email",
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => {
                    return (
                        <Input
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            errorText={errors?.email?.message}
                            defaultName="email"
                            icon={"email"}
                            placeholder={"Email..."}
                        />
                    );
                }}
                name="email"
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                    message: "Vui lòng nhập mật khẩu",
                }}
                render={({ field: { onChange, onBlur, value } }) => {
                    return (
                        <Input
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            errorText={errors?.password?.message}
                            defaultName="password"
                            icon={"lock"}
                            placeholder={"Mật khẩu..."}
                            isPassword={showPassword}
                        />
                    );
                }}
                name="password"
            />
            <View style={styles.boxRemember}>
                <BouncyCheckbox
                    onPress={(isChecked) => setShowPassword(!isChecked)}
                    size={20}
                    fillColor={"#524ADD"}
                />
                <Text style={styles.boxRememberTitle}>Hiện mật khẩu</Text>
            </View>
            {/* <View style={styles.boxSocicalLogin}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.buttonLoginSocical}
                    onPress={() => signInWithGoogle()}
                >
                    <Image
                        style={{ width: 30, height: 30, marginTop: 5 }}
                        source={require("../../assets/img/google.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.buttonLoginSocical}
                    onPress={() => logInFacebook()}
                >
                    <Image
                        style={{ width: 30, height: 30, marginTop: 5 }}
                        source={require("../../assets/img/facebook.png")}
                    />
                </TouchableOpacity>
            </View> */}
            <Pressable
                style={styles.buttonSubmit}
                onPress={handleSubmit(loginWithEmailAndPassword)}
            >
                <Text style={styles.buttonSubmitText}>Gửi</Text>
            </Pressable>
            <TouchableOpacity onPress={() => setActiveForm(false)}>
                <Text style={styles.registerRedirect}>
                    Bạn chưa có tài khoản?
                </Text>
            </TouchableOpacity>
        </View>
    );
}
