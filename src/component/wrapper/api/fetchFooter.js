import client from "../../../api/client";
export const fetchFooter = async() => {
    const response = await client.get("/footer");
    return response.data || []; // Return empty array if no data
};