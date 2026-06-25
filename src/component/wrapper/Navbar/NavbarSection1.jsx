import i18next from "i18next";
import { Link, useParams, useLocation } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import facebook from "../../../assets/images/facebook.svg";
import linkedIn from "../../../assets/images/linkedIn.svg";
import instgram from "../../../assets/images/instgram.svg";
import twitter from "../../../assets/images/twitter.svg";
import { useTheme } from "../../../context/ThemeContext";
import { getTodayDate } from "../../../utils/dateUtils";

const NavbarSection1 = ({ contactData }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { lang } = useParams();
  const location = useLocation(); // Add this to track current path
  
  const getCurrentLang = () => {
    return lang || "ar";
  };
  const currentLang = getCurrentLang();
  
  const iconWhiteFilter =
    "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)";
  const iconDarkFilter =
    "brightness(0) saturate(100%) invert(28%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(98%) contrast(92%)";
  
  const socilaIcons = [
    { icon: twitter, url: contactData?.data?.x, type: "image" },
    { icon: linkedIn, url: contactData?.data?.linkedin, type: "image" },
    { icon: instgram, url: contactData?.data?.instagram, type: "image" },
    { icon: facebook, url: contactData?.data?.facebook, type: "image" },
    {
      icon: isDarkMode ? <FiMoon /> : <FiSun />,
      onClick: toggleDarkMode,
      isToggle: true,
      type: "icon",
    },
  ];

  const socilaIconFixed = [
    { icon: facebook, url: contactData?.data?.facebook, type: "image" },
    { icon: instgram, url: contactData?.data?.instagram, type: "image" },
    { icon: linkedIn, url: contactData?.data?.linkedin, type: "image" },
    { icon: twitter, url: contactData?.data?.x, type: "image" },
  ];

  // Helper function to check if a link is active
  const isActiveLink = (path) => {
    return location.pathname === `/${currentLang}${path}`;
  };

  return (
    <>
      <div
        className={`w-full h-[3rem] transition-colors duration-300 ${
          isDarkMode ? "bg-[#1a1a1a]" : "bg-[#C4C4C4]"
        }`}
      >
        <div className="container1 mx-auto h-full">
          <div className="flex justify-between items-center w-full h-full">
            <div className="flex gap-x-10 items-center">
              <Link to={`/${currentLang}/About_Us`}>
                <p
                  className={`text-md ${
                    isActiveLink("/About_Us")
                      ? "text-secondary font-bold"
                      : isDarkMode 
                        ? "text-white" 
                        : "text-[#222222]"
                  }`}
                >
                  {i18next.t("menu.about_us")}
                </p>
              </Link>

              <Link to={`/${currentLang}/contact`}>
                <p
                  className={`transition-colors duration-300 text-md ${
                    isActiveLink("/contact")
                      ? "text-[#3B82F6] font-bold"
                      : isDarkMode 
                        ? "text-white" 
                        : "text-[#222222]"
                  }`}
                >
                  {i18next.t("menu.contact_us")}
                </p>
              </Link>
            </div>
            <div className="flex items-center">
              <p
                className={`transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-[#222222]"
                } text-md`}
              >
                {getTodayDate(currentLang)}
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              {socilaIcons?.map((socialIcon, index) =>
                socialIcon.isToggle ? (
                  <button
                    key={index}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={socialIcon.onClick}
                    aria-label="Toggle theme"
                  >
                    <span
                      className={`text-xl transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-[#222222]"
                      }`}
                    >
                      {socialIcon.icon}
                    </span>
                  </button>
                ) : (
                  <a
                    key={index}
                    href={socialIcon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      className="cursor-pointer transition-all duration-300"
                      src={socialIcon.icon}
                      alt="social icon"
                      style={{
                        filter: isDarkMode ? iconWhiteFilter : iconDarkFilter,
                      }}
                    />
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed div on the right side */}
      <div
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        className={`fixed w-[3rem] h-[12rem] transition-colors duration-300 ${
          isDarkMode ? "bg-[#1a1a1acc]" : "bg-[#FFFFFFCC]"
        } right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center backdrop-blur-sm`}
      >
        <div className="flex items-center justify-center flex-col space-y-7">
          {socilaIconFixed?.map((socialIcon, index) => (
            <a
              key={index}
              href={socialIcon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <img
                className={`cursor-pointer transition-all duration-300 ${
                  index === 3 ? "w-[2rem] mr-[-0.1rem]" : "w-[1.4rem]"
                }`}
                style={{
                  filter: isDarkMode ? iconWhiteFilter : iconDarkFilter,
                }}
                src={socialIcon?.icon}
                alt="social icon"
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavbarSection1;