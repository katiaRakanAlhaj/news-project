import { useQuery } from "@tanstack/react-query"
import { fetchFooter } from "../api/fetchFooter";
export const useFetchFooter = () => {
    return useQuery({
        queryKey: ["footer"],
        queryFn: fetchFooter,

    });
}