import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import Modal from "react-native-modal";
import useListFilter from "../../../hooks/useListFilter";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
function ModalFilter({
    isVisible,
    setIsVisible,
    isActive,
    setIsActive,
    setParamsStory,
}) {
    const { data, isLoading } = useListFilter();
    if (isLoading) return <View></View>;
    const handleSubmitFilter = () => {
        setParamsStory({ ...isActive });
        setIsVisible(false);
    };
    return (
        <Modal
            deviceHeight={height}
            isVisible={isVisible}
            style={styles.wrapperModal}
            onBackdropPress={() => setIsVisible(false)}
        >
            <View style={styles.wrapperContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {data &&
                        data.filterRank.map((item) => (
                            <View
                                style={{ marginVertical: 10 }}
                                key={item.titleFilter}
                            >
                                <Text style={styles.filterTitle}>
                                    {item.titleFilter}
                                </Text>
                                <View style={styles.listType}>
                                    {item.typeFilter.map((itemType) => (
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            key={itemType.title}
                                            onPress={() =>
                                                setIsActive({
                                                    ...isActive,
                                                    [itemType.dataName]:
                                                        itemType.dataValue,
                                                })
                                            }
                                        >
                                            <Text
                                                style={
                                                    isActive[
                                                        itemType.dataName
                                                    ] === itemType.dataValue
                                                        ? {
                                                              ...styles.filterType,
                                                              ...styles.active,
                                                          }
                                                        : styles.filterType
                                                }
                                            >
                                                {itemType.title}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ))}
                </ScrollView>
                <TouchableHighlight
                    onPress={handleSubmitFilter}
                    underlayColor={"#696969"}
                    style={styles.filterButton}
                >
                    <Text style={styles.textButton}>Lọc truyện</Text>
                </TouchableHighlight>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    wrapperModal: {
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 0,
        margin: 0,
    },
    wrapperContent: {
        width: width,
        height: height * 0.7,
        backgroundColor: "white",
        paddingHorizontal: 35,
        paddingTop: 20,
    },
    filterTitle: {
        fontSize: 20,
    },
    listType: {
        flexDirection: "row",
        marginTop: 5,
        flexWrap: "wrap",
    },
    filterType: {
        marginHorizontal: 10,
        fontSize: 16,
        color: "#7D7E80",
        marginVertical: 5,
    },
    active: {
        color: "darkslateblue",
        borderBottomColor: "darkslateblue",
        borderBottomWidth: 1,
    },
    filterButton: {
        position: "absolute",
        alignSelf: "center",
        bottom: 20,
        backgroundColor: "black",
        width: width / 2,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    textButton: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
});
export default ModalFilter;
