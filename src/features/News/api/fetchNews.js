import client from "../../../api/client";
export const fetchCategories = async() => {
    const response = await client.get("/categories");
    return response.data || []; // Return empty array if no data
};