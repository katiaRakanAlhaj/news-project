import client from "../../../../api/client";
export const fetchHomePage = async() => {
    const response = await client.get("/home-page");
    return response.data || []; // Return empty array if no data
};