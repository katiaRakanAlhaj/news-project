import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "../locale/en.json";
import arJSON from "../locale/ar.json";

const resources = {
    en: { translation: enJSON },
    ar: { translation: arJSON }
};

// Get language from URL first, then localStorage
const getInitialLanguage = () => {
  // Try to get from URL
  const path = window.location.pathname;
  const langMatch = path.match(/^\/(en|ar)(\/|$)/);
  if (langMatch) return langMatch[1];
  
  // Fallback to localStorage
  return localStorage.getItem("language") || "ar"; // Arabic is default
};

const language = getInitialLanguage();

// Set RTL/LTR direction IMMEDIATELY before i18n initializes
const isArabic = language === "ar";
document.documentElement.dir = isArabic ? "rtl" : "ltr";
document.documentElement.lang = language;
document.documentElement.style.fontFamily = "ShamelSansOne, sans-serif";

i18n
  .use(initReactI18next)
  .init({
      fallbackLng: "ar", // Fallback to Arabic if translation missing
      debug: true,
      resources: { ...resources },
      interpolation: {
          escapeValue: false,
      },
      lng: language,
  }, (err) => {
      if (err) return console.log('i18next init error:', err);
      i18n.changeLanguage(language);
  });

export default i18n;