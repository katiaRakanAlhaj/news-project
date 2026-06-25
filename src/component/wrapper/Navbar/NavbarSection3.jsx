import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import i18n from "../../i18n";
import i18next from "i18next";

const NavbarSection3 = ({ categoryData }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Tracks the current active path
  const { lang } = useParams();

  // Helper function to get current language from URL
  const getCurrentLang = () => {
    return lang || "ar";
  };

  // Update language based on URL
  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }
  }, [lang]);

  const handleLanguageChange = (newLang) => {
    const currentPath = window.location.pathname;

    // Extract everything after the language prefix
    const match = currentPath.match(/^\/(en|ar)(\/.*)?$/);

    if (match) {
      const restOfPath = match[2] || "";
      const newPath = `/${newLang}${restOfPath}`;

      i18n.changeLanguage(newLang);
      localStorage.setItem("language", newLang);

      window.location.href = newPath;
    } else {
      const newPath = `/${newLang}`;

      i18n.changeLanguage(newLang);
      localStorage.setItem("language", newLang);

      window.location.href = newPath;
    }
  };

  const handleCategoryClick = (categoryId) => {
    const currentLang = getCurrentLang();
    navigate(`/${currentLang}/category/${categoryId}`);
  };

  const currentLang = getCurrentLang();

  // Helper check to determine if home is active
  const isHomeActive = 
    location.pathname === `/${currentLang}` || 
    location.pathname === `/${currentLang}/`;

  return (
    <div className="w-full h-[5.5rem] bg-primary relative">
      <div className="container1 mx-auto h-full">
        <div className="flex w-full gap-x-[2rem] h-full items-center justify-between">
          <div className="flex gap-x-[2rem] items-center">
            
            {/* Home Link with Active Condition */}
            <Link to={`/${currentLang}`}>
              <p
                className={`text-md transition-colors duration-200 pb-1 ${
                  isHomeActive
                    ? "text-[#3B82F6] font-bold border-b-2 border-[#3B82F6]"
                    : "text-white hover:text-secondary"
                }`}
              >
                {i18next.t("menu.home")}
              </p>
            </Link>

            {/* Dynamic Categories Link Matrix */}
            <div className="flex gap-x-[2rem]">
              {categoryData?.data?.map((category) => {
                const isCategoryActive = location.pathname === `/${currentLang}/category/${category.id}`;

                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`text-md transition-colors duration-200 cursor-pointer bg-transparent border-none pb-1 ${
                      isCategoryActive
                        ? "text-[#3B82F6] font-bold border-b-2 border-[#3B82F6]"
                        : "text-white hover:text-secondary"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex gap-x-2 text-white text-[0.9rem] cursor-pointer">
            <span
              className={`${currentLang === "en" ? "font-bold text-secondary" : ""} hover:text-secondary transition-colors duration-200`}
              onClick={() => handleLanguageChange("en")}
            >
              EN
            </span>
            <span>|</span>
            <span
              className={`${currentLang === "ar" ? "font-bold text-secondary" : ""} hover:text-secondary transition-colors duration-200`}
              onClick={() => handleLanguageChange("ar")}
            >
              AR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection3;