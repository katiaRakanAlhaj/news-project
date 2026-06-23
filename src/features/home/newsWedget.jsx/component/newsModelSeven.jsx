import LinkedInColor from "../../../../assets/images/linkedInColor.svg";
import instgramColor from "../../../../assets/images/instgramColor.svg";
import facebookColor from "../../../../assets/images/facebookColor.svg";
import twitterColor from "../../../../assets/images/twitterColor.svg";
import youtubeColor from "../../../../assets/images/youtubeColor.svg";
import tiktok from "../../../../assets/images/tiktok.svg";
import TitleSection from "../../../../ui/titleSection";
import NewsMetaInfo from "../../../../ui/dateAndViewsSection";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/dateUtils";
import i18next from "i18next";

const NewsModelSeven = ({ data, contactData, currentLang }) => {
  // Social media icons (static - these are UI elements, not content data)
  const social = [
    {
      image: LinkedInColor,
      name: "Linkedin",
      width: "2rem",
      url: contactData?.data?.linkedin,
    },
    {
      image: instgramColor,
      name: "Instagram",
      width: "2rem",
      url: contactData?.data?.instagram,
    },
    {
      image: facebookColor,
      name: "Facebook",
      width: "2rem",
      url: contactData?.data?.facebook,
    },
    {
      image: tiktok,
      name: "Tik Tok",
      width: "2.5rem",
      url: contactData?.data?.tiktok,
    },
    {
      image: twitterColor,
      name: "Twitter",
      width: "1.7rem",
      url: contactData?.data?.x,
    },
    {
      image: youtubeColor,
      name: "Youtube",
      width: "2rem",
      url: contactData?.data?.youtube,
    },
  ];
  // Get items from API (handle pagination structure)
  const getItemsArray = (items) => {
    if (Array.isArray(items)) {
      return items;
    }
    if (items && items.data && Array.isArray(items.data)) {
      return items.data;
    }
    return [];
  };

  // Extract news items from API data
  const newsItems = getItemsArray(data?.items || []);

  // Map API news items to the format needed for the component
  const newsItem = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    title: item.news_title,
    description: item.news_description || "لا يوجد وصف متاح",
    date: formatDate(item.date, currentLang),
    views: item.views_count,
  }));

  // Don't render if no data
  if (!data || !newsItems.length) {
    return null;
  }

  // Get first item for the main column
  const mainNews = newsItem[0];
  // Get remaining items for the side column (from index 1 onwards)
  const sideNews = newsItem.slice(1);

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <div className="grid lg:grid-cols-12 gap-y-0 gap-y-[2rem]">
        {/* first column - News Section */}
        <div className="lg:col-span-8 col-span-1">
          <TitleSection
            title={data.title || "منوعات وثقافة"}
            showArrows={false}
          />

          <div className="grid lg:grid-cols-12 gap-[1rem] mt-[1rem]">
            {/* Main featured news */}
            <div className="lg:col-span-7 col-span-1">
              <Link to={`/${currentLang}/News/${mainNews.id}`}>
                <div className="flex flex-col">
                  <img
                    src={mainNews.image}
                    className="w-full lg:h-[15rem] h-[20rem] object-cover"
                    alt={mainNews.title}
                  />
                  <h1 className="font-bold md:text-xl text-md text-[#333333] mt-4">
                    {mainNews.title}
                  </h1>
                  <p className="text-md text-[#666666] mt-2 line-clamp-3">
                    {mainNews.description}
                  </p>
                  <NewsMetaInfo
                    dateText={mainNews.date}
                    viewsText={mainNews.views}
                    textColor="text-[#363636]"
                  />
                </div>
              </Link>
            </div>

            {/* List of other news items */}
            <div className="lg:col-span-5 col-span-1">
              <div className="flex flex-col space-y-[1rem]">
                {sideNews.map((item) => (
                  <Link to={`/${currentLang}/News/${item.id}`}>
                    <div key={item.id} className="md:flex gap-x-[1rem]">
                      <img
                        className="lg:w-[11rem] w-full lg:h-[9rem] h-[20rem] object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                      <div className="flex flex-col space-y-2 justify-center">
                        <h1 className="font-bold text-lg text-[#333333] md:mt-0 mt-[1rem] line-clamp-2">
                          {item.title}
                        </h1>
                        <NewsMetaInfo
                          dateText={item.date}
                          viewsText={item.views}
                          textColor="text-[#363636]"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* second column - Social Media Section */}
        <div className="lg:col-span-4 col-span-1 lg:mr-[3rem]">
          <TitleSection title={i18next.t("social_media")} showArrows={false} />
          <div
            style={{ boxShadow: "0px 1px 2px 0px #0000000D" }}
            className="w-full h-[17rem] bg-[#F6F6F6] flex justify-center items-center mt-[1rem]"
          >
            <div>
              <div className="grid grid-cols-3 gap-x-[3rem] gap-y-[2rem]">
                {social.map((socialItem, index) => (
                  <a
                    key={index}
                    href={socialItem.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col space-y-2 justify-center items-center cursor-pointer hover:opacity-80 transition"
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={socialItem.image}
                      style={{
                        width: socialItem.width,
                        marginTop:
                          socialItem.name === "Tik Tok" ? "-0.7rem" : "0",
                      }}
                      alt={socialItem.name}
                    />
                    <p className="text-[#000000] text-lg">{socialItem.name}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModelSeven;
