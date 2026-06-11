import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "../api/fetchNews";
export const useFetchCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,

    });
}