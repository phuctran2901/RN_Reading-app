import { useQuery } from "react-query";
import { fetchListUpdated } from "../api";

export default function useListUpdated() {
    return useQuery("listUpdated", fetchListUpdated);
}
