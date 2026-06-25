// NavbarMobile.jsx

import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import i18next from "i18next";
import logo from "../../../assets/images/logo.svg";
import facebook from "../../../assets/images/facebook.svg";
import linkedIn from "../../../assets/images/linkedIn.svg";
import instgram from "../../../assets/images/instgram.svg";
import twitter from "../../../assets/images/twitter.svg";
import i18n from "../../i18n";

const NavbarMobile = ({ categoryData, contactData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { lang } = useParams();
  const location = useLocation(); // Tracks the current active path
  const navigate = useNavigate();

  const socilaIconFixed = [
    { icon: facebook, link: contactData?.data?.facebook },
    { icon: linkedIn, link: contactData?.data?.linkedin },
    { icon: instgram, link: contactData?.data?.instagram },
    { icon: twitter, link: contactData?.data?.x },
  ];

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

  const currentLang = getCurrentLang();

  // Helper checks to determine if paths are active
  const isHomeActive =
    location.pathname === `/${currentLang}` ||
    location.pathname === `/${currentLang}/`;

  const isAboutActive = location.pathname === `/${currentLang}/About_Us`;
  const isContactActive = location.pathname === `/${currentLang}/contact`;

  const handleCategoryClick = (categoryId) => {
    setIsMobileMenuOpen(false);
    navigate(`/${currentLang}/category/${categoryId}`);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSocialClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      {/* Mobile Navbar Container */}
      <div className="w-full h-[4rem] bg-primary fixed top-0 z-50">
        <div className="container1 mx-auto h-full px-4">
          <div className="flex w-full h-full items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex gap-x-4 items-center">
              <button
                className="text-white focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <MdClose className="text-2xl" />
                ) : (
                  <MdMenu className="text-2xl" />
                )}
              </button>
              <Link to={`/${currentLang}`}>
                <img className="w-[7rem]" src={logo} alt="logo" />
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="flex gap-x-2 text-white text-[0.8rem] cursor-pointer">
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

      {/* Mobile Drawer Menu */}
      <div
        ref={menuRef}
        className={`fixed top-[4rem] right-0 h-full w-[80%] max-w-[320px] bg-primary z-40 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Items Container */}
          <div className="flex flex-col py-6 px-6 gap-y-4">
            {/* Home link */}
            <Link
              to={`/${currentLang}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-white/20 pb-3"
            >
              <p
                className={`text-[1.1rem] transition-colors ${isHomeActive ? "text-[#3B82F6] font-bold" : "text-white hover:text-[#E7792D]"}`}
              >
                {i18next.t("menu.home") || "الرئيسية"}
              </p>
            </Link>

            {/* Dynamic Categories Link Matrix (Replaced menuItems) */}
            {categoryData?.data?.map((category) => {
              const isCategoryActive =
                location.pathname === `/${currentLang}/category/${category.id}`;

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full text-right border-b border-white/20 pb-3 bg-transparent border-t-0 border-x-0 outline-none cursor-pointer block"
                >
                  <p
                    className={`text-[1.1rem] transition-colors ${isCategoryActive ? "text-[#3B82F6] font-bold" : "text-white hover:text-[#E7792D]"}`}
                  >
                    {category.name}
                  </p>
                </button>
              );
            })}

            {/* About Us Link */}
            <Link
              to={`/${currentLang}/About_Us`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-white/20 pb-3"
            >
              <p
                className={`text-[1.1rem] transition-colors ${isAboutActive ? "text-[#3B82F6] font-bold" : "text-white hover:text-[#E7792D]"}`}
              >
                {i18next.t("menu.about_us")}
              </p>
            </Link>

            {/* Contact Us Link */}
            <Link
              to={`/${currentLang}/contact`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-white/20 pb-3"
            >
              <p
                className={`text-[1.1rem] transition-colors ${isContactActive ? "text-[#3B82F6] font-bold" : "text-white hover:text-[#E7792D]"}`}
              >
                {i18next.t("menu.contact_us")}
              </p>
            </Link>
          </div>

          {/* Spacing at the bottom */}
          <div className="flex-grow"></div>
        </div>
      </div>

      {/* Fixed Social Icons */}
      {!isMobileMenuOpen && (
        <div className="fixed w-[2.5rem] h-[9rem] bg-[#eceaeacc] right-[1rem] top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
          <div className="flex flex-col space-y-5">
            {socilaIconFixed?.map((socialIcon, index) => (
              <img
                key={index}
                className={`cursor-pointer hover:scale-110 transition-transform ${
                  index === 3 ? "w-[1.5rem] mr-[-0.2rem]" : "w-[1rem]"
                }`}
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(28%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(98%) contrast(92%)",
                }}
                src={socialIcon?.icon}
                alt="social icon"
                onClick={() => handleSocialClick(socialIcon.link)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Overlay when menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavbarMobile;
