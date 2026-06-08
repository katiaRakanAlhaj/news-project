// hook/useFetchHomePage.js
import { useQuery } from "@tanstack/react-query";
import { fetchHomePage } from "../api/fetchHomePage";

export const useFetchHomePage = (sectionId = null, page = 1) => {
    return useQuery({
        queryKey: ["home-page", sectionId, page],
        queryFn: () => fetchHomePage(),
        enabled: true,
        // Keep previous data while fetching new page
        placeholderData: (previousData) => previousData,
    });
};