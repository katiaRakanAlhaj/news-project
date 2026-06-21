import client from "../../../api/client";
export const fetchCategories = async() => {
    const response = await client.get("/categories");
    return response.data || []; // Return empty array if no data
};
export const fetchCategoryById = async(id, page = 1) => {
    const response = await client.get(`/categories/${id}?page=${page}`);
    return response.data || null; // Return null if no data
};
export const fetchNewsById = async(id) => {
    const response = await client.get(`/news/${id}`);
    return response.data || null; // Return null if no data
};
export const fetchLatestNews = async() => {
    const response = await client.get("/latest-news");
    return response.data || []; // Return empty array if no data
};
export const fetchDifferentNews = async() => {
    const response = await client.get("/different-news");
    return response.data || []; // Return empty array if no data
};
export const fetchMostViewedNews = async() => {
    const response = await client.get("/most-viewed-news");
    return response.data || []; // Return empty array if no data
};