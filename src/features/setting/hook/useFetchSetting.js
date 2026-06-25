import { useQuery } from "@tanstack/react-query"
import { fetchSetting } from "../api/fetchSetting";
export const useFetchSetting = () => {
    return useQuery({
        queryKey: ["setting"],
        queryFn: fetchSetting,

    });
}