import { useQuery } from "react-query";
import { fetchChapter } from "../api";
export default function useFetchChapter({ slug, chapter, idStory }) {
    return useQuery(["chapter", { slug, chapter, idStory }], fetchChapter);
}
