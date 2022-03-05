import { useQuery } from "react-query";
import { fetchListChap } from "../api";
export default function useListChapter(idStory) {
    return useQuery(["listChapter", idStory], fetchListChap);
}
