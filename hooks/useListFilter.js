import { useQuery } from "react-query";
import { fetchListFilter } from "../api";
export default function useListFilter() {
    return useQuery("listFilter", fetchListFilter);
}
