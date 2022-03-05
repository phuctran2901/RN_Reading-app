import { fetchInfo } from "../api/index";
import { useQuery } from "react-query";
export default function useInfo(idStory) {
    return useQuery(["info", idStory], fetchInfo);
}
