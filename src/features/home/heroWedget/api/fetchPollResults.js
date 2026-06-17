import client from "../../../../api/client";

export const GetPollResults = async(pollId) => {
    const response = await client.get(`/polls/${pollId}/results`);
    return response.data;
};