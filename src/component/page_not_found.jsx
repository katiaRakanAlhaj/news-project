import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Set RTL/LTR direction based on current language
    const isArabic = i18n.language === 'ar';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 number */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold text-primary tracking-wider animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg className="w-64 h-64 md:w-96 md:h-96" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-8 mb-4">
          {t("404.title")}
        </h2>
        
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          {t("404.message")}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t("404.goBack")}
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t("404.goHome")}
          </button>
        </div>

        {/* Decorative elements */}
        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            {t("404.help")}{" "}
            <a href="/contact" className="text-indigo-600 hover:text-indigo-700 underline">
              {t("404.contact")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;