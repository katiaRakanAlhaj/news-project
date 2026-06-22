// hook/useFetchHomePage.js
import { useQuery } from "@tanstack/react-query";
import { fetchHomePage } from "../api/fetchHomePage";

export const useFetchHomePage = (sectionId = null, page = 1, categoryId = null) => {
    return useQuery({
        queryKey: sectionId ?
            categoryId ? ["home-page", sectionId, page, categoryId] : ["home-page", sectionId, page] : ["home-page"],
        queryFn: () => fetchHomePage(sectionId, page, categoryId),
        placeholderData: (previousData) => previousData,
    });
};