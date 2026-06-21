// api/fetchHomePage.js
import client from "../../../../api/client";

export const fetchHomePage = async(sectionId = null, page = 1, categoryId = null) => {
    let url = "/home-page";
    const params = new URLSearchParams();

    if (sectionId) {
        // Always add section parameter
        params.append(`section_${sectionId}`, page);

        // Add category parameter if provided
        if (categoryId) {
            params.append(`category_${categoryId}`, page);
        }

        const queryString = params.toString();
        if (queryString) {
            url = `/home-page?${queryString}`;
        }
    }

    const response = await client.get(url);
    return response.data || [];
};