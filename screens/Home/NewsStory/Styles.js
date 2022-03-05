import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
export const Styles = StyleSheet.create({
    wrapper_title: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 5,
        marginBottom: 4,
    },
    textInfoType: {
        color: "#3333",
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Roboto",
        color: "#333333",
    },
    cardImage: {
        width: 50,
        height: 60,
        marginHorizontal: 2,
        borderRadius: 5,
    },
    active: {
        borderColor: "black",
        borderWidth: 2,
    },
    infoWrapper: {
        flexDirection: "row",
        marginTop: 10,
    },
    textInfoTitle: {
        fontSize: 18,
        color: "#333",
    },
    textInfoDes: {
        fontSize: 14,
        color: "#637387",
        marginTop: 20,
    },
    genresInfo: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
    },
    genresText: {
        padding: 5,
        marginRight: 2,
        fontSize: 12,
        backgroundColor: "#EFFD5F",
        borderRadius: 4,
        color: "#343d46",
        marginTop: 10,
    },
    authorNameInfo: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    buttonCustom: {
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "black",
        width: 120,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    buttonCustomText: {
        color: "white",
        fontWeight: "bold",
    },
    infoImage: {
        width: width / 2,
        height: 100,
    },
});
