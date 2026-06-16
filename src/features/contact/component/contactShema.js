// src/schemas/contactSchema.js
import { z } from "zod";
import i18next from "i18next";

export const contactSchema = z.object({
    firstName: z.string()
        .nonempty(i18next.t("validation.first_name_required")),

    surname: z.string()
        .nonempty(i18next.t("validation.surname_required")),

    email: z.string()
        .nonempty(i18next.t("validation.email_required"))
        .email(i18next.t('validation.invalid_email')),

    subject: z.string()
        .nonempty(i18next.t("validation.subject_required")),

    message: z.string()
        .nonempty(i18next.t("validation.message_required")),
});

export const defaultValues = {
    firstName: "",
    surname: "",
    email: "",
    subject: "",
    message: "",
};