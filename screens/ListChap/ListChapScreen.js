import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Box from "./Box";
import useListChapter from "../../hooks/useListChapter";
import LoadingScreen from "../Loading/LoadingScreen";
import ItemChapter from "./ItemChapter";
export default function ListChapScreen({ navigation, route }) {
    const [idStory, setIdStory] = React.useState();
    const [slug, setSlug] = React.useState();
    const [lastChap, setLastChap] = React.useState();
    const [listChap, setListChap] = React.useState([]);
    const [currentChaper, setCurrentChaper] = React.useState();
    const [nameStory, setNameStory] = React.useState();
    const flatListRef = React.useRef();
    const [indexCurrentChap, setIndexCurrentChap] = React.useState(0);
    const { data, isLoading, isFetching, status } = useListChapter(idStory);
    React.useEffect(() => {
        const { idStory, slug, lastChapter, currentChap, name, index } =
            route.params;
        setSlug(slug);
        setIdStory(idStory);
        setNameStory(name);
        setLastChap(lastChapter);
        setCurrentChaper(currentChap);
        setIndexCurrentChap(index || 0);
    }, [route]);
    React.useEffect(() => {
        if (status === "success") {
            // setListChap(data?.listChapter?.slice(0, 100));
            setListChap(data?.listChapter);
        }
    }, [status, isFetching]);
    React.useEffect(() => {
        if (nameStory) {
            flatListRef?.current?.scrollToIndex({
                index: indexCurrentChap,
                animated: true,
            });
        }
    }, [nameStory]);
    const handleAddChapter = (event) => {
        const { nativeEvent } = event;
        if (isScrollBottom(nativeEvent)) {
            if (data?.listChapter.length > listChap.length) {
                setListChap((prevState) => {
                    return prevState.concat(
                        data?.listChapter.slice(
                            prevState.length,
                            prevState.length + 100
                        )
                    );
                });
            }
        }
    };
    const isScrollBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }) => {
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 20000
        );
    };
    const renderItem = ({ item, index }) => (
        <ItemChapter
            styles={styles}
            index={index}
            slug={slug}
            lastChap={lastChap}
            currentChaper={currentChaper}
            idStory={idStory}
            item={item}
            navigation={navigation}
        />
    );

    const memoizedValue = React.useMemo(() => renderItem, [listChap]);
    const getItemLayout = (_, index) => ({
        length: 30,
        offset: 30 * index,
        index,
    });
    if (isLoading || isFetching) return <LoadingScreen />;
    return (
        <View style={styles.wrapper}>
            <FlatList
                ref={flatListRef}
                data={listChap}
                renderItem={memoizedValue}
                getItemLayout={getItemLayout}
                initialNumToRender={100}
                maxToRenderPerBatch={100}
                windowSize={10}
                keyExtractor={(item, index) => "" + item?.slug + index}
            />
            {nameStory && (
                <Box name={nameStory} currentChaper={currentChaper} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#fff",
        flex: 1,
        paddingLeft: 20,
    },
    textChap: {
        fontSize: 16,
        paddingRight: 40,
    },
    wrapperText: {
        flexDirection: "row",
        marginVertical: 3,
    },
    indexChap: {
        fontSize: 18,
        marginRight: 10,
    },
});
