// src/hooks/useContactUs.js
import { useMutation } from "@tanstack/react-query";
import { ContactUs } from "../api/postCantact";

export const useContactUs = () => {
    return useMutation({
        mutationFn: ContactUs,
    });
};