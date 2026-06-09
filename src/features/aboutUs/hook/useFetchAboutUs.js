import { useQuery } from "@tanstack/react-query"
import { fetchAboutUsPage } from "../api/fetchAboutUs";
export const useFetchAboutUsPage = () => {
    return useQuery({
        queryKey: ["about-us-page"],
        queryFn: fetchAboutUsPage,

    });
}