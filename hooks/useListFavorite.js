import { useQuery } from "react-query";
import { fetchListFavorite } from "../api";
export default function useListFavorite() {
    return useQuery("listFavorite", fetchListFavorite);
}
