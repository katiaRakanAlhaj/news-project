import { useQuery } from "@tanstack/react-query";
import { fetchPolls, fetchPollsById } from "../api/fetchPolls";

export const useFetchPolls = (homePageId) => {
    return useQuery({
        queryKey: ["polls", homePageId],
        queryFn: () => fetchPolls(homePageId),
        enabled: true, // Always fetch, but filter on the backend
    });
};
export const useFetchPollsById = (id) => {
    return useQuery({
        queryKey: ["polls", id],
        queryFn: () => fetchPollsById(id),
        enabled: !!id, // Only run the query if we have an ID
    });
};