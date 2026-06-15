import i18next from "i18next";
import { Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi"; // Using Feather icons
// Or alternative imports:
// import { FaSun, FaMoon } from "react-icons/fa"; // Font Awesome style
// import { BsSun, BsMoon } from "react-icons/bs"; // Bootstrap style
// import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md"; // Material Design

import facebook from "../../../assets/images/facebook.svg";
import linkedIn from "../../../assets/images/linkedIn.svg";
import instgram from "../../../assets/images/instgram.svg";
import twitter from "../../../assets/images/twitter.svg";
import { useTheme } from "../../../context/ThemeContext";

const NavbarSection1 = ({ contactData }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  // Format today's date
  const getTodayDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return today.toLocaleDateString("ar-EG", options); // Using Arabic locale
  };
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

  return (
    <>
      <div
        className={`w-full h-[3rem] ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#C4C4C4]"}`}
      >
        <div className="container1 mx-auto h-full">
          <div className="flex justify-between items-center w-full h-full">
            <div className="flex gap-x-10 items-center">
              <Link to="/About_Us">
                <p
                  className={`${isDarkMode ? "text-white" : "text-[#222222]"} text-md`}
                >
                  {i18next.t("menu.about_us")}
                </p>
              </Link>

              <Link to="/contact">
                <p
                  className={`${isDarkMode ? "text-white" : "text-[#222222]"} text-md`}
                >
                  {i18next.t("menu.contact_us")}
                </p>
              </Link>
            </div>
            <div className="flex items-center">
              <p
                className={`${isDarkMode ? "text-white" : "text-[#222222]"} text-md`}
              >
                {getTodayDate()}
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              {socilaIcons?.map((socialIcon, index) =>
                socialIcon.isToggle ? (
                  <button
                    key={index}
                    className="cursor-pointer hover:opacity-80 transition-opacity text-[#222222] dark:text-white"
                    onClick={socialIcon.onClick}
                    aria-label="Toggle theme"
                  >
                    <span className="text-xl">{socialIcon.icon}</span>
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
                      className="cursor-pointer"
                      src={socialIcon.icon}
                      alt="social icon"
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
      style = {{boxShadow:" 0px 4px 4px 0px #00000040"}}
        className={`fixed w-[3rem] h-[12rem] ${isDarkMode ? "bg-[#1a1a1acc]" : "bg-[#FFFFFFCC]"} right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center backdrop-blur-sm`}
      >
        <div className="flex items-center justify-center flex-col space-y-7">
          {socilaIconFixed?.map((socialIcon, index) => (
            <a
              key={index}
              href={socialIcon.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={`cursor-pointer ${index === 3 ? "w-[2rem] mr-[-0.1rem]" : "w-[1.4rem]"}`}
                style={{
                  filter: isDarkMode
                    ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
                    : "brightness(0) saturate(100%) invert(28%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(98%) contrast(92%)",
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
