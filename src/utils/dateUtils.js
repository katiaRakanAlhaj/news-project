// src/utils/dateUtils.js

/**
 * Formats a date string based on the current language.
 * @param {string} dateString 
 * @param {string} currentLang 
 */
export const formatDate = (dateString, currentLang) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const locale = currentLang === "ar" ? "ar-EG" : "en-US";

    return date.toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

/**
 * Formats a relative time difference based on the current language.
 * @param {string} dateString 
 * @param {string} currentLang 
 */
export const formatTimeAgo = (dateString, currentLang) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (currentLang === "ar") {
        if (diffInHours < 1) return "منذ أقل من ساعة";
        if (diffInHours === 1) return "منذ ساعة";
        if (diffInHours < 24) return `منذ ${diffInHours} ساعات`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return "منذ يوم";
        return `منذ ${diffInDays} أيام`;
    } else {
        // English Fallback
        if (diffInHours < 1) return "Less than an hour ago";
        if (diffInHours === 1) return "An hour ago";
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return "Yesterday";
        return `${diffInDays} days ago`;
    }
};
export const getTodayDate = (currentLang) => {
    const today = new Date();
    const locale = currentLang === "ar" ? "ar-EG" : "en-US";

    return today.toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};