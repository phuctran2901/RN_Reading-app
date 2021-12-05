import { useQuery } from "react-query";
import { fetchListNominations } from "../api";
export default function useListNominations() {
    return useQuery("listNominations", fetchListNominations);
}
