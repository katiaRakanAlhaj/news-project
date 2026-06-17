import { useQuery } from "@tanstack/react-query";
import { GetPollResults } from "../api/fetchPollResults";

export const usePollResults = (pollId) => {
    return useQuery({
        queryKey: ["pollResults", pollId],
        queryFn: () => GetPollResults(pollId),
        enabled: !!pollId, // Only fetch if pollId exists
    });
};