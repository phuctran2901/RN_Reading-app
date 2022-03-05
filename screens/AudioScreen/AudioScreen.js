import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";
// import Slider from "@react-native-community/slider";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import useFetchAudio from "../../hooks/useFetchAudio";
import { fetchChapter } from "../../api/index";
import { useQueryClient } from "react-query";
import { Audio } from "expo-av";
const width = Dimensions.get("window").width;
export default function AudioScreen({ navigation, route }) {
    const queryClient = useQueryClient();
    const [dataChapter, setDataChapter] = React.useState();
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [positionMillis, setPositionMillis] = React.useState(0);
    const [duration, setDuration] = React.useState(100);
    const [keyAudio, setKeyAudio] = React.useState();
    const { data, isLoading, status, isFetching } = useFetchAudio(keyAudio);
    const [playObj] = React.useState(new Audio.Sound());
    React.useEffect(async () => {
        const dataParams = route.params;
        const { idStory, chapter, content, slug } = dataParams;
        setDataChapter(dataParams);
        setKeyAudio({ idStory, chapter, text: content, slug });
    }, [navigation, route]);
    React.useEffect(async () => {
        if (status === "success" && !isFetching) {
            setPositionMillis(0);
            setDuration(100);
            await playObj.loadAsync({ uri: data?.audio });
            await playObj.playAsync();
            setIsPlaying(true);
            playObj.setOnPlaybackStatusUpdate(handleChangeAudio);
        }
        return () => {
            queryClient.cancelQueries("chapter");
        };
    }, [status, isFetching]);
    React.useEffect(() => {
        return playObj
            ? async () => {
                  setKeyAudio({});
                  setPositionMillis(0);
                  setDuration(100);
                  setIsPlaying(false);
                  setDataChapter({});
                  await playObj.stopAsync();
                  await playObj.unloadAsync();
              }
            : undefined;
    }, [playObj]);
    const handleChangeAudio = async (plj) => {
        setDuration(plj?.durationMillis);
        setPositionMillis(plj?.positionMillis);
        if (plj.didJustFinish) {
            let queryKey = {
                slug: keyAudio?.slug,
                chapter: dataChapter?.nextChapter,
                idStory: keyAudio?.idStory,
            };
            const data = await fetchChapter({
                queryKey: ["chapter", { ...queryKey }],
            });
            setDataChapter(data);
            setKeyAudio({
                ...keyAudio,
                chapter: data?.currentChap,
                text: data?.content,
            });
            setIsPlaying(false);
            setPositionMillis(0);
            setDuration(100);
            await playObj.stopAsync();
            await playObj.unloadAsync();
        }
    };

    const handlePlayAndPauseAudio = async () => {
        if (!isPlaying) {
            await playObj.playAsync();
            await playObj.setRateAsync(1.25);
            setIsPlaying(true);
        }

        if (isPlaying) {
            await playObj.pauseAsync();
            setIsPlaying(false);
        }
    };
    React.useEffect(async () => {
        const AUDIO_CONFIG = {
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: true,
            interruptionModeAndroid:
                Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
        };

        await Audio.setAudioModeAsync(AUDIO_CONFIG);
    }, []);
    const onChangePositionMills = async (value) => {
        await playObj.setPositionAsync(value[0]);
        setPositionMillis(value[0]);
        if (!isPlaying) {
            await playObj.playAsync();
            await playObj.setRateAsync(1.25);
        }
        setIsPlaying(true);
    };
    const handleNextAndPreviosChapter = async (type) => {
        let queryKey = {};
        switch (type) {
            case "next":
                queryKey = {
                    slug: keyAudio?.slug,
                    chapter: dataChapter?.nextChapter,
                    idStory: keyAudio?.idStory,
                };
                const dataNext = await fetchChapter({
                    queryKey: ["chapter", { ...queryKey }],
                });
                setDataChapter(dataNext);
                setKeyAudio({
                    ...keyAudio,
                    chapter: dataNext?.currentChap,
                    text: dataNext?.content,
                });
                setIsPlaying(false);
                setPositionMillis(0);
                setDuration(100);
                await playObj.stopAsync();
                await playObj.unloadAsync();
                break;
            case "prev":
                queryKey = {
                    slug: keyAudio?.slug,
                    chapter: dataChapter?.prevChapter,
                    idStory: keyAudio?.idStory,
                };
                const dataPrev = await fetchChapter({
                    queryKey: ["chapter", { ...queryKey }],
                });

                setDataChapter(dataPrev);
                setKeyAudio({
                    ...keyAudio,
                    chapter: dataPrev?.currentChap,
                    text: dataPrev?.content,
                });
                setIsPlaying(false);
                setPositionMillis(0);
                setDuration(100);
                await playObj.stopAsync();
                await playObj.unloadAsync();
                break;
            default:
                return;
        }
    };
    return (
        <View style={styles.wrapperAudio}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Text
                style={{
                    ...styles.audioTitle,
                    marginTop: 100,
                }}
                numberOfLines={2}
            >
                {dataChapter?.titleStory}
            </Text>
            <Text style={styles.audioTitle} numberOfLines={2}>
                {dataChapter?.titleChapter}
            </Text>
            <View style={styles.audioThumbnail}>
                <Feather name="headphones" size={100} color="white" />
            </View>
            <View style={styles.wrapperControl}>
                <View style={styles.wrapperSlider}>
                    <MultiSlider
                        values={[positionMillis]}
                        min={0}
                        max={duration}
                        step={50000}
                        onValuesChangeFinish={onChangePositionMills}
                        touchDimensions={{
                            height: 50,
                            width: 50,
                            borderRadius: 15,
                            slipDisplacement: 200,
                        }}
                    />
                </View>
                <View style={styles.controlButton}>
                    <TouchableOpacity
                        style={styles.buttonAudio}
                        onPress={() => handleNextAndPreviosChapter("prev")}
                    >
                        <MaterialCommunityIcons
                            name="skip-previous-circle"
                            size={60}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonAudio}
                        onPress={handlePlayAndPauseAudio}
                    >
                        {isPlaying ? (
                            <FontAwesome
                                name="pause-circle"
                                size={60}
                                color="black"
                            />
                        ) : (
                            <FontAwesome
                                name="play-circle"
                                size={60}
                                color="black"
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleNextAndPreviosChapter("next")}
                        style={styles.buttonAudio}
                    >
                        <MaterialCommunityIcons
                            name="skip-next-circle"
                            size={60}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapperAudio: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 30,
        backgroundColor: "white",
        alignItems: "center",
    },
    audioTitle: {
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    audioThumbnail: {
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "purple",
    },
    wrapperControl: {
        marginTop: 40,
    },
    wrapperSlider: {
        width: width * 0.8,
        justifyContent: "center",
        alignItems: "center",
    },
    controlButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    buttonAudio: {
        marginHorizontal: 10,
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 30,
    },
});
