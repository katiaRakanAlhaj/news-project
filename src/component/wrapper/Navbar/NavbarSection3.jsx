import { Link } from "react-router-dom";
import { useEffect } from "react";
import i18n from "../../i18n";
import { useParams, useNavigate } from "react-router-dom";
import i18next from "i18next";

const NavbarSection3 = () => {
  const menuItems = ["سياسية", "رياضة", "اقتصادية"];
  const navigate = useNavigate();
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
      // We have a language in the URL
      const restOfPath = match[2] || "";

      // Build new path with new language
      const newPath = `/${newLang}${restOfPath}`;

      // Update language
      i18n.changeLanguage(newLang);
      localStorage.setItem("language", newLang);

      // Navigate to new URL
      window.location.href = newPath;
    } else {
      // No language in URL (shouldn't happen, but handle it)
      const newPath = `/${newLang}`;

      // Update language
      i18n.changeLanguage(newLang);
      localStorage.setItem("language", newLang);

      // Navigate to new URL
      window.location.href = newPath;
    }
  };

  const currentLang = getCurrentLang();

  return (
    <div className="w-full h-[4rem] bg-[#121C2A] relative">
      <div className="container1 mx-auto h-full">
        <div className="flex w-full gap-x-[2rem] h-full items-center justify-between">
          <div className="flex gap-x-[2rem] items-center">
            <Link to="/">
              <p className="text-white text-[0.9rem]">{i18next.t("menu.home")}</p>
            </Link>
            <div className="flex gap-x-[2rem]">
              {menuItems?.map((menuItem, index) => (
                <Link to="/News" key={index}>
                  <p className="text-white text-[0.9rem]">{menuItem}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex gap-x-2 text-white text-[0.9rem] cursor-pointer">
            <span
              className={`${currentLang === "en" ? "font-bold text-[#0058C5]" : ""} hover:text-[#0058C5] transition-colors duration-200`}
              onClick={() => handleLanguageChange("en")}
            >
              EN
            </span>
            <span>|</span>
            <span
              className={`${currentLang === "ar" ? "font-bold text-[#0058C5]" : ""} hover:text-[#0058C5] transition-colors duration-200`}
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
