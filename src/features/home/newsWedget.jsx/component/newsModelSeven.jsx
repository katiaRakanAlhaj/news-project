import LinkedInColor from "../../../../assets/images/linkedInColor.svg";
import instgramColor from "../../../../assets/images/instgramColor.svg";
import facebookColor from "../../../../assets/images/facebookColor.svg";
import twitterColor from "../../../../assets/images/twitterColor.svg";
import youtubeColor from "../../../../assets/images/youtubeColor.svg";
import tiktok from "../../../../assets/images/tiktok.svg";
import TitleSection from "../../../../ui/titleSection";
import NewsMetaInfo from "../../../../ui/dateAndViewsSection";

const NewsModelSeven = ({ data }) => {
  // Social media icons (static - these are UI elements, not content data)
  const social = [
    { image: LinkedInColor, name: "Linkedin", width: "2rem" },
    { image: instgramColor, name: "Instagram", width: "2rem" },
    { image: facebookColor, name: "Facebook", width: "2rem" },
    { image: tiktok, name: "Tik Tok", width: "2.5rem" },
    { image: twitterColor, name: "Twitter", width: "1.7rem" },
    { image: youtubeColor, name: "Youtube", width: "2rem" },
  ];

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };


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
    date: formatDate(item.date),
    views: '1.2K',
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
          <TitleSection title={data.title || "منوعات وثقافة"} showArrows={false} />

          <div className="grid md:grid-cols-12 gap-[1rem] mt-[1rem]">
            {/* Main featured news */}
           <div className = "col-span-7">
             <div className="flex flex-col">
              <img
                src={mainNews.image}
                className="w-full h-[15rem] object-cover"
                alt={mainNews.title}
              />
              <h1 className="font-bold text-xl text-[#333333] mt-4">
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
           </div>

            {/* List of other news items */}
            <div className = "col-span-5">
              <div className="flex flex-col space-y-[1rem]">
              {sideNews.map((item) => (
                <div key={item.id} className="md:flex gap-x-[1rem]">
                  <img
                    className="md:w-[11rem] w-full h-[9rem] object-cover"
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
              ))}
            </div>
            </div>
          </div>
        </div>

        {/* second column - Social Media Section */}
        <div className="lg:col-span-4 col-span-1 mr-[3rem]">
          <TitleSection title={"سوشال ميديا"} showArrows={false} />
          <div
            style={{ boxShadow: "0px 1px 2px 0px #0000000D" }}
            className="w-full h-[17rem] bg-[#F6F6F6] flex justify-center items-center mt-[1rem]"
          >
            <div>
              <div className="grid grid-cols-3 gap-x-[3rem] gap-y-[2rem]">
                {social.map((socialItem, index) => (
                  <div key={index} className="flex flex-col space-y-2 justify-center items-center cursor-pointer hover:opacity-80 transition">
                    <img
                      src={socialItem.image}
                      style={{
                        width: socialItem.width,
                        marginTop: socialItem.name === "Tik Tok" ? "-0.7rem" : "0",
                      }}
                      alt={socialItem.name}
                    />
                    <p className="text-[#000000] text-lg">{socialItem.name}</p>
                  </div>
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