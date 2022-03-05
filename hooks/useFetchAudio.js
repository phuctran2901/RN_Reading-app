import { useQuery } from "react-query";
import { fetchAudio } from "../api/index";

export default function useFetchAudio(data) {
    return useQuery(["audioChap", { ...data }], fetchAudio);
}
