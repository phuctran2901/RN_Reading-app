import React from "react";
import { Text, View, Pressable, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";

import Input from "./Input";
export default function Signup({ styles, onSubmitRegister, setActiveForm }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    return (
        <View style={styles.boxAuth}>
            <Text style={styles.title}>Đăng ký</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
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
                    minLength: {
                        value: 6,
                        message: "Mật khẩu có ít nhất 6 kí tự",
                    },
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
                            isPassword={true}
                        />
                    );
                }}
                name="password"
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                    message: "Trường này là bắt buộc",
                }}
                render={({ field: { onChange, onBlur, value } }) => {
                    return (
                        <Input
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            icon={"lock"}
                            errorText={errors?.password?.message}
                            placeholder={"Nhập lại mật khẩu"}
                            isPassword={true}
                        />
                    );
                }}
                name="confirmPassword"
            />
            <Pressable
                style={styles.buttonSubmit}
                onPress={handleSubmit(onSubmitRegister)}
            >
                <Text style={styles.buttonSubmitText}>Gửi</Text>
            </Pressable>
            <TouchableOpacity onPress={() => setActiveForm(true)}>
                <Text style={styles.registerRedirect}>
                    Bạn đã có tài khoản?
                </Text>
            </TouchableOpacity>
        </View>
    );
}
