import TitleSection from "../../../../ui/titleSection";
import newsImage1 from "../../../../assets/images/newsImage1.png";
import newsImage5 from "../../../../assets/images/newsImage5.png";
import newsImage6 from "../../../../assets/images/newsImage6.png";
import newsImage7 from "../../../../assets/images/newsImage7.png";
import newsImage8 from "../../../../assets/images/newsImage8.png";
import NewsMetaInfo from "../../../../ui/dateAndViewsSection";

const NewsModelSix = () => {
  const mainNews = {
    image: newsImage1,
    title:
      "أحد شوارعها خسر 1.5 مليار دولار.. أسواق الخرطوم تستعيد نبضها التجاري",
    date: "الخميس، 18 مايو 2024",
    views: "1.2k",
  };

  const smallNews = [
    {
      image: newsImage5,
      title: "عنوان الخبر الثاني هنا يمكن أن يكون طويلاً",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage6,
      title: "عنوان الخبر الثالث هنا يمكن أن يكون طويلاً",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage7,
      title: "عنوان الخبر الرابع هنا يمكن أن يكون طويلاً",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage8,
      title: "عنوان الخبر الخامس هنا يمكن أن يكون طويلاً",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
  ];

  return (
    <div className="container1 mx-auto mt-[2rem] px-4 md:px-0">
      <TitleSection title={"منوعات"} />

      {/* first row - Main large card */}
      <div className="mt-[1rem]">
        <div className="relative w-full h-[17rem] md:h-[20rem] lg:h-[17rem] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={mainNews.image}
            alt="news"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, #000000 0%, rgba(102, 102, 102, 0) 54.46%)",
            }}
          />
          <div className="absolute right-[1rem] bottom-[1.5rem] left-[1rem] md:left-auto">
            <h1 className="text-white text-base md:text-lg lg:text-xl w-full md:w-[85%] leading-relaxed font-bold">
              {mainNews.title}
            </h1>
            <NewsMetaInfo
              dateText={mainNews.date}
              viewsText={mainNews.views}
              textColor="text-[#9CA3AF]"
            />
          </div>
        </div>
      </div>

      {/* second row - Small cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[0.5rem] gap-y-[0.5rem] mt-[0.5rem]">
        {smallNews.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[10rem] md:h-[12rem] lg:h-[10rem] overflow-hidden"
          >
            <img
              className="w-full h-full object-cover"
              src={item.image}
              alt="news"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, #000000 0%, rgba(102, 102, 102, 0) 54.46%)",
              }}
            />
            <div className="absolute right-[0.75rem] bottom-[0.5rem] left-[0.75rem]">
              <h1 className="text-white text-xs md:text-sm w-full leading-relaxed font-bold line-clamp-2">
                {item.title}
              </h1>
              <NewsMetaInfo
                dateText={item.date}
                viewsText={item.views}
                textColor="text-[#9CA3AF]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsModelSix;
