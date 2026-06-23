import singleNewsBanner from "../../../assets/images/singleNewsbanner.png";
import twitter from "../../../assets/images/twitter.svg";
import instgramColor from "../../../assets/images/instgramColor.svg";
import facebookBanner from "../../../assets/images/facebookBanner.svg";
import linkedInColor from "../../../assets/images/linkedInColor.svg";
import { useTheme } from "../../../context/ThemeContext";
import { formatDate } from "../../../utils/dateUtils";
const SinlgeNewsBanner = ({ singleNewsData, contactData ,currentLang}) => {
  const { isDarkMode } = useTheme();
  const iconWhiteFilter =
    "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)";
  const socialIcon = [
    { icon: twitter, width: "2rem", url: contactData?.data?.x },
    { icon: instgramColor, width: "1.5rem", url: contactData?.data?.instagram },
    { icon: facebookBanner, width: "1.5rem", url: contactData?.data?.facebook },
    { icon: linkedInColor, width: "1.5rem", url: contactData?.data?.linkedin },
  ];

  return (
    <div className="mt-[1rem]">
      <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
        <p className="text-white font-[700] text-md mt-1">
          {singleNewsData?.category}
        </p>
      </div>
      <h1 className="text-[#373737] lg:text-3xl text-lg font-bold mt-4">
        {singleNewsData?.news_title}
      </h1>
      <p className="text-[#282828] text-md mt-3">
        {formatDate(singleNewsData?.date , currentLang)}
      </p>
      <div className="relative mt-3">
        <img
          style={{ boxShadow: "0px 20px 25px -5px #0000001A" }}
          src={singleNewsData?.news_image}
          className="w-full lg:h-[26rem] h-[20rem] object-cover rounded-xl"
          alt="news banner"
        />
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
        <div className="absolute left-0 bottom-0">
          <div className="w-[14rem] h-[2.5rem] rounded-tr-xl bg-white flex justify-center items-center gap-x-[2rem]">
            {socialIcon?.map((socialIcon, index) => {
              return (
                <a
                  key={index}
                  href={socialIcon?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    style={{
                      width: socialIcon?.width,
                      filter: isDarkMode ? iconWhiteFilter : "none",
                      transition: "filter 0.3s ease",
                    }}
                    src={socialIcon?.icon}
                    alt={`social icon ${index + 1}`}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinlgeNewsBanner;
