// api/fetchHomePage.js
import client from "../../../../api/client";

export const fetchHomePage = async(sectionId = null, page = 1) => {
    let url = "/home-page";
    if (sectionId) {
        url = `/home-page?section_${sectionId}=${page}`;
    }
    const response = await client.get(url);
    return response.data || [];
};