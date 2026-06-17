import client from "../../../../api/client";

export const VotePoll = async({ pollId, pollOptionId }) => {
    const response = await client.post(`/polls/${pollId}/vote`, {
        poll_option_id: pollOptionId
    });
    return response.data;
};