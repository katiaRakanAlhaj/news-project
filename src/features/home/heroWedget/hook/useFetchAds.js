import { useQuery } from "@tanstack/react-query";
import { fetchAds } from "../api/fetchAds";

export const usefetchAds = () => {
    return useQuery({
        queryKey: ["ads"],
        queryFn: fetchAds,

    });
}