import axios from "axios";

const client = axios.create({
    baseURL: "https://api-readingapp.herokuapp.com/api",
    // baseURL: "http://192.168.56.1:3000/api",
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

export const getSlide = () => {
    return client.get("/getSlide").then((res) => res.data);
};

export const fetchListFavorite = () => {
    return client
        .get("/getDetailListGenres?rank=yt&time=m")
        .then((res) => res.data);
};

export const fetchListFilter = () => {
    return client.get("/getListFilter").then((res) => res.data);
};

export const fetchListStory = ({ queryKey, pageParam = 1 }) => {
    const params = { ...queryKey[1], page: pageParam };
    return client
        .get(`/getDetailListGenres?${serialize(params)}`)
        .then((res) => res.data.listData);
};

export const fetchInfo = ({ queryKey }) => {
    if (queryKey[1]) {
        return client.get(`/getInfo/${queryKey[1]}`).then((res) => res.data);
    }
    return [];
};

export const fetchChapter = ({ queryKey }) => {
    const { idStory, chapter, slug } = queryKey[1];
    if (idStory && chapter && slug) {
        return client
            .get(`/getDetailStory/${slug}/${chapter}?idStory=${idStory}`)
            .then((res) => res.data);
    }
    return [];
};

export const fetchListChap = ({ queryKey }) => {
    const idStory = queryKey[1];
    if (idStory) {
        return client.get(`/getListChapter/${idStory}`).then((res) => res.data);
    }
    return [];
};

export const searchStory = ({ queryKey }) => {
    const term = queryKey[1];
    if (term) {
        return client.post(`/search`, { term }).then((res) => res.data);
    }
    return [];
};

export const fetchAudio = ({ queryKey }) => {
    const data = queryKey[1];
    // console.log(data);
    if (data?.idStory && data?.chapter && data?.text) {
        return client
            .post(`/getAudioChapter`, { ...data })
            .then((res) => res.data);
    }
    return [];
};

function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
