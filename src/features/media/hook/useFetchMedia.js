import { useQuery } from "@tanstack/react-query"
import { fetchMedia } from "../api/fetchMedia";
export const useFetchMedia = (page = 1) => {
    return useQuery({
        queryKey: ["media", page],
        queryFn: () => fetchMedia(page),
        keepPreviousData: true, // Keep previous data while fetching new page
    });
};