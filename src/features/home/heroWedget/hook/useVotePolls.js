import { useMutation } from "@tanstack/react-query";
import { VotePoll } from "../api/votePolls";

export const useVotePoll = () => {
    return useMutation({
        mutationFn: VotePoll,
    });
};