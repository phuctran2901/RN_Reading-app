import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from "react-native";
import Card from "../../components/Card/Card";
import LoadingScreen from "../Loading/LoadingScreen";
import { fetchListStory } from "../../api";
import { useInfiniteQuery } from "react-query";
import { ContextModal } from "../../Context/ModalProvider";
import ModalFilter from "./ModalFilter/ModalFilter";
export default function ListStoryScreen({ route, navigation }) {
    const [paramsStory, setParamsStory] = React.useState({});
    const [isActive, setIsActive] = React.useState({});
    const [page, setPage] = React.useState(2);
    const [isVisible, setIsVisible] = React.useContext(ContextModal);
    const { data, fetchNextPage, isLoading, isFetching, isFetchingNextPage } =
        useInfiniteQuery(["listStory", { ...paramsStory }], fetchListStory, {
            getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        });
    React.useEffect(() => {
        if (navigation.isFocused()) {
            const params = route.params;
            setParamsStory({ ...params });
        }
    }, [navigation]);
    const handleFetchStory = () => {
        fetchNextPage({ pageParam: page });
        setPage(page + 1);
    };
    if ((isLoading || isFetching) && !isFetchingNextPage)
        return <LoadingScreen />;
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.wrapper}>
                <FlatList
                    data={data.pages.flat()}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item.slug + index}
                    renderItem={(data) => (
                        <Card item={data.item} navigation={navigation} />
                    )}
                    onEndReached={handleFetchStory}
                    onEndReachedThreshold={0}
                    ListFooterComponent={
                        <View style={styles.wrapperSpinner}>
                            <ActivityIndicator size="large" color="black" />
                        </View>
                    }
                />
            </View>
            <ModalFilter
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                isActive={isActive}
                setIsActive={setIsActive}
                setParamsStory={setParamsStory}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
    },
    wrapperSpinner: {
        justifyContent: "center",
    },
});
