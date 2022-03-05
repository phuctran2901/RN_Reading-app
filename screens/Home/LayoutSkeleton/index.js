import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const layoutNewstory = [
    {
        width,
        height: "100%",
        marginTop: 5,
        children: [
            {
                width,
                height: 50,
                flexDirection: "row",
                children: [...new Array(7)].map((_) => {
                    return {
                        width: 50,
                        height: 50,
                        borderRadius: 5,
                        marginRight: 4,
                    };
                }),
            },
            {
                width,
                height: "100%",
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
                children: [
                    {
                        width: "40%",
                        height: "100%",
                        marginRight: 10,
                        children: [
                            {
                                width: "30%",
                                height: 10,
                            },
                            {
                                width: "100%",
                                height: 10,
                                marginTop: 10,
                            },
                            {
                                width: "100%",
                                height: 20,
                                marginTop: 10,
                            },
                            {
                                width: "100%",
                                height: 50,
                                marginTop: 10,
                            },
                            {
                                width: "60%",
                                height: 20,
                                borderRadius: 20,
                                marginTop: 50,
                            },
                        ],
                    },
                    {
                        width: "50%",
                        height: "100%",
                        marginRight: 20,
                    },
                ],
            },
        ],
    },
];

export const layoutCarousel = [
    {
        width: "100%",
        height: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        children: [
            {
                width: "15%",
                height: "100%",
                marginRight: 10,
            },
            {
                width: "70%",
                height: "100%",
            },
            {
                width: "15%",
                height: "100%",
                marginLeft: 10,
            },
        ],
    },
    {
        height: "20%",
        width,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        children: [
            {
                width: 10,
                height: 10,
                borderRadius: 10,
                marginHorizontal: 2,
            },
            {
                width: 10,
                height: 10,
                borderRadius: 10,
                marginHorizontal: 2,
            },
            {
                width: 10,
                height: 10,
                borderRadius: 10,
                marginHorizontal: 2,
            },
            {
                width: 10,
                height: 10,
                borderRadius: 10,
                marginHorizontal: 2,
            },
            {
                width: 10,
                height: 10,
                borderRadius: 10,
                marginHorizontal: 2,
            },
            {
                width: 10,
                height: 10,
                borderRadius: 10,
                marginHorizontal: 2,
            },
        ],
    },
];
export const layoutAccomplished = [
    {
        width,
        flexDirection: "row",
        children: [...new Array(3)].map((_) => {
            return {
                width: width / 3.6,
                height: "100%",
                marginTop: 20,
                marginHorizontal: 6,
                children: [
                    {
                        width: "100%",
                        height: "70%",
                        borderRadius: 10,
                    },
                    {
                        width: "40%",
                        height: 10,
                        marginTop: 10,
                    },
                    {
                        width: "90%",
                        height: 10,
                        marginTop: 10,
                    },
                ],
            };
        }),
    },
];

export const layoutNominations = [
    {
        width,
        height: "100%",
        children: [
            {
                width,
                height: "50%",
                flexDirection: "row",
                marginTop: 15,
                children: [...new Array(3)].map((_) => {
                    return {
                        width: width / 3.333333333333,
                        height: "100%",
                        marginHorizontal: 2,
                        children: [
                            {
                                width: "100%",
                                height: "70%",
                                borderRadius: 10,
                            },
                            {
                                width: "100%",
                                height: "30%",
                                marginTop: 10,
                                children: [
                                    {
                                        width: "60%",
                                        height: "15%",
                                    },
                                    {
                                        width: "100%",
                                        height: "15%",
                                        marginTop: 2,
                                    },
                                ],
                            },
                        ],
                    };
                }),
            },
            {
                width,
                height: "50%",
                flexDirection: "row",
                children: [...new Array(3)].map((_) => {
                    return {
                        width: width / 3.33333,
                        height: "100%",
                        marginHorizontal: 2,
                        children: [
                            {
                                width: "100%",
                                height: "70%",
                                borderRadius: 10,
                            },
                            {
                                width: "100%",
                                height: "30%",
                                marginTop: 10,
                                children: [
                                    {
                                        width: "60%",
                                        height: "15%",
                                    },
                                    {
                                        width: "100%",
                                        height: "15%",
                                        marginTop: 2,
                                    },
                                ],
                            },
                        ],
                    };
                }),
            },
        ],
    },
];

export const layoutConfig = [
    {
        width: width * 0.8,
        height: "50%",
        flexDirection: "row",
        children: [
            {
                width: width / 5,
                height: 100,
                borderRadius: 10,
                marginRight: 10,
            },
            {
                width: "100%",
                children: [
                    {
                        width: "60%",
                        height: 10,
                        marginTop: 5,
                    },
                    {
                        width: "80%",
                        height: 10,
                        marginTop: 5,
                    },
                ],
            },
        ],
    },
    {
        width: width * 0.8,
        height: "50%",
        flexDirection: "row",
        children: [
            {
                width: width / 5,
                height: 100,
                borderRadius: 10,
                marginRight: 10,
            },
            {
                width: "100%",
                children: [
                    {
                        width: "60%",
                        height: 10,
                        marginTop: 5,
                    },
                    {
                        width: "80%",
                        height: 10,
                        marginTop: 5,
                    },
                ],
            },
        ],
    },
];

export const layoutRank = [
    {
        width,
        height: 150,
        flexDirection: "row",
        children: [
            {
                width: "60%",
                height: "100%",
                children: [
                    {
                        width: "20%",
                        height: 10,
                    },
                    {
                        width: "90%",
                        height: 10,
                        marginTop: 5,
                    },
                    {
                        width: "60%",
                        height: 10,
                        marginTop: 5,
                    },
                    {
                        width: "40%",
                        height: 10,
                        marginTop: 5,
                    },
                ],
            },
            {
                width: "30%",
                height: "100%",
                borderRadius: 10,
            },
        ],
    },
    {
        width,
        marginTop: 5,
        height: 45,
    },
    {
        width,
        marginTop: 5,
        height: 45,
    },
    {
        width,
        marginTop: 5,
        height: 45,
    },
    {
        width,
        marginTop: 5,
        height: 45,
    },
    {
        width,
        marginTop: 5,
        height: 45,
    },
    {
        width,
        marginTop: 5,
        height: 45,
    },
    {
        width,
        marginTop: 5,
        height: 45,
    },
    {
        width,
        marginTop: 5,
        height: 45,
    },
    {
        width,
        marginTop: 5,
        height: 45,
    },
];
