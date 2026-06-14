import { useQuery } from "@tanstack/react-query"
import { fetchCategories, fetchCategoryById, fetchLatestNews, fetchNewsById } from "../api/fetchNews";
export const useFetchCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,

    });
}
export const useFetchCategoryById = (id) => {
    return useQuery({
        queryKey: ["categories", id],
        queryFn: () => fetchCategoryById(id),
        enabled: !!id, // Only run the query if we have an ID
    });
};
export const useFetchNewsById = (id) => {
    return useQuery({
        queryKey: ["news", id],
        queryFn: () => fetchNewsById(id),
        enabled: !!id, // Only run the query if we have an ID
    });
};
export const useFetchLatestNews = () => {
    return useQuery({
        queryKey: ["latest-news"],
        queryFn: fetchLatestNews,

    });
}