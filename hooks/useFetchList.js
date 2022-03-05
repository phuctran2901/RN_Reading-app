import { useQuery } from "react-query";
import { fetchListStory } from "../api";

export default function useFetchList(params) {
    return useQuery(["listStory", params], fetchListStory);
}
