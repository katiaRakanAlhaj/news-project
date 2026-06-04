import { useQuery } from "@tanstack/react-query"
import { fetchHomePage } from "../api/fetchHomePage";
export const useFetchHomePage = () => {
    return useQuery({
        queryKey: ["home-page"],
        queryFn: fetchHomePage,

    });
}