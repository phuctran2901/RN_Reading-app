import { useQuery } from "react-query";
import { fetchDataHome } from "../api";

export default function useHome() {
    return useQuery("home", fetchDataHome);
}
