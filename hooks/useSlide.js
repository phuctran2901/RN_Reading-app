import { getSlide } from "../api/index";
import { useQuery } from "react-query";

export default function useSlide() {
    return useQuery("slide", getSlide);
}
