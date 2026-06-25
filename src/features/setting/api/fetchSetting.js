import client from "../../../api/client";
export const fetchSetting = async() => {
    const response = await client.get("/setting");
    return response.data || []; // Return empty array if no data
};