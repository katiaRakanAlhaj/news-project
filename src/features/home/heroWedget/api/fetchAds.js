import client from "../../../../api/client";

export const fetchAds = async() => {
    const response = await client.get(`/ads`);
    return response.data || null; // Return null if no data
};