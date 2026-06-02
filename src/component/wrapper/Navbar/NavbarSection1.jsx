import i18next from "i18next";
import facebook from "../../../assets/images/facebook.svg";
import linkedIn from "../../../assets/images/linkedIn.svg";
import instgram from "../../../assets/images/instgram.svg";
import twitter from "../../../assets/images/twitter.svg";
import sun from "../../../assets/images/sun.svg";
import { Link } from "react-router-dom";

const NavbarSection1 = () => {
  const socilaIcons = [
    { icon: twitter },
    { icon: linkedIn },
    { icon: instgram },
    { icon: facebook },
    { icon: sun },
  ];

  const socilaIconFixed = [
    { icon: facebook },
    { icon: instgram },
    { icon: linkedIn },

    { icon: twitter },
  ];

  return (
    <>
      <div className="w-full h-[2.5rem] bg-[#C4C4C4]">
        <div className="container1 mx-auto h-full">
          <div className="flex justify-between items-center w-full h-full">
            <div className="flex gap-x-6 items-center">
              <Link to="/About_Us">
                <p className="text-[#222222] text-sm">
                  {i18next.t("menu.about_us")}
                </p>
              </Link>

              <Link to="/contact">
                <p className="text-[#222222] text-sm">
                  {i18next.t("menu.contact_us")}
                </p>
              </Link>
            </div>
            <div className="flex items-center">
              <p className="text-[#222222] text-sm">الخميس، 18 مايو 2024</p>
            </div>
            <div className="flex items-center gap-x-4">
              {socilaIcons?.map((socilaIcons, index) => (
                <img
                  key={index}
                  className="cursor-pointer"
                  src={socilaIcons.icon}
                  alt="social icon"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed div on the right side */}
      <div className="fixed w-[2.5rem] h-[9rem] bg-[#eceaeacc] right-[2rem] top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center">
        <div className="flex flex-col space-y-5">
          {socilaIconFixed?.map((socilaIcons, index) => (
            <img
              key={index}
              className={`cursor-pointer ${index === 3 ? "w-[1.5rem] mr-[-0.2rem]" : "w-[1rem]"}`}
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(28%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(98%) contrast(92%)",
              }}
              src={socilaIcons?.icon}
              alt="social icon"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NavbarSection1;
