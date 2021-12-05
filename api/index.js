import axios from "axios";

const client = axios.create({
    baseURL: "http://10.0.2.2:5000/api",
    // baseURL: "http://192.168.1.245:5000/api",
});

export const fetchDataHome = () => {
    return client.get("/getHome").then((res) => res.data);
};

export const fetchListUpdated = () => {
    return client.get("/getDetailListGenres?tp=cv").then((res) => res.data);
};

export const fetchListNominations = () => {
    return client
        .get("/getDetailListGenres?rank=nm&time=m")
        .then((res) => res.data);
};

export const fetchListFavorite = () => {
    return client
        .get("/getDetailListGenres?rank=yt&time=m")
        .then((res) => res.data);
};
