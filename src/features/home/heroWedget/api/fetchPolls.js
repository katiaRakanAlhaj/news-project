import client from "../../../../api/client";
export const fetchPolls = async(homePageId) => {
    // If homePageId is provided, filter polls by home_page_id
    const url = homePageId ? `/polls?home_page_id=${homePageId}` : '/polls';
    const response = await client.get(url);
    return response.data;
};
export const fetchPollsById = async(id) => {
    const response = await client.get(`/polls/${id}`);
    return response.data || null; // Return null if no data
};