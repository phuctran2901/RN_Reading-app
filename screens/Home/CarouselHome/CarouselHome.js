import React from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import useSlide from "../../../hooks/useSlide";
import SkeletonContent from "react-native-skeleton-content";
import { layoutCarousel } from "../LayoutSkeleton/index";
const { width } = Dimensions.get("window");

const CarouselHome = ({ navigation }) => {
    const { data, isLoading } = useSlide();
    const carouselRef = React.useRef();
    const [indexActive, setIndexActive] = React.useState(0);
    const renderItemSlide = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                    navigation.navigate("Detail", { idStory: item?.slug })
                }
                style={styles.wrapperItem}
            >
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{
                        uri: item?.sourceImage,
                    }}
                />
                <Text style={styles.infoStory} numberOfLines={1}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <SkeletonContent
            containerStyle={styles.container}
            isLoading={isLoading}
            layout={layoutCarousel}
        >
            <Carousel
                loop={true}
                ref={carouselRef}
                activeAnimationType="decay"
                activeSlideAlignment="center"
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={0.9}
                layout={"default"}
                data={data?.listSlide || []}
                renderItem={renderItemSlide}
                sliderWidth={width}
                itemWidth={width * 0.6}
                autoplay={true}
                autoplayDelay={3000}
                lockScrollWhileSnapping={true}
                currentIndex={data?.listSlide?.length / 2 || 0}
                onBeforeSnapToItem={(index) => setIndexActive(index)}
            />
            <Pagination
                dotsLength={data?.listSlide?.length || 0}
                activeDotIndex={indexActive}
                containerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 5,
                    padding: 0,
                    margin: 0,
                }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 4,
                    backgroundColor: "black",
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </SkeletonContent>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        marginTop: 20,
        height: 200,
    },
    wrapperItem: {
        height: 200,
    },
    image: {
        width: "100%",
        height: "70%",
        borderRadius: 10,
    },
    infoStory: {
        height: "20%",
        width: "100%",
        marginTop: 10,
        textAlign: "center",
        fontFamily: "Boogaloo_400Regular",
        fontSize: 18,
    },
});

export default CarouselHome;
