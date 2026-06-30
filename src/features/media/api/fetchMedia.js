import client from "../../../api/client";

export const fetchMedia = async(page = 1) => {
    const response = await client.get(`/media?page=${page}`);
    return response.data || null; // Return null if no data
};