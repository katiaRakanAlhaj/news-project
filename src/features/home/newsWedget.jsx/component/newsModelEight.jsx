import { useState } from "react";
import newsImage5 from "../../../../assets/images/newsImage5.png";
import newsImage6 from "../../../../assets/images/newsImage6.png";
import newsImage7 from "../../../../assets/images/newsImage7.png";
import newsImage8 from "../../../../assets/images/newsImage8.png";
import newsImage9 from "../../../../assets/images/newsImage9.png";
import newsImage10 from "../../../../assets/images/newsImage10.png";
import newsImage11 from "../../../../assets/images/newsImage11.png";
import newsImage12 from "../../../../assets/images/newsImage12.png";
import newsImage13 from "../../../../assets/images/newsImage13.png";
import arrow1 from "../../../../assets/images/arrow1.svg";
import arrow2 from "../../../../assets/images/arrow2.svg";
import NewsMetaInfo from "../../../../ui/dateAndViewsSection";

const NewsModelEight = () => {
  // Restructured data: category as key with array of items
  const newsData = {
    منوعات: [
      {
        id: 1,
        image: newsImage5,
        title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
        description:
          "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ",
        date: "الخميس، 18 مايو 2024",
        views: "1.2k",
      },
      {
        id: 6,
        image: newsImage6,
        title: "أحدث صيحات الموضة لعام 2024",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
      {
        id: 7,
        image: newsImage7,
        title: "أحدث صيحات الموضة لعام 2024",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
      {
        id: 8,
        image: newsImage8,
        title: "أحدث صيحات الموضة لعام 2024",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
      {
        id: 9,
        image: newsImage9,
        title: "أحدث صيحات الموضة لعام 2024",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
      {
        id: 11,
        image: newsImage10,
        title: "أحدث صيحات الموضة لعام 2024",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
      {
        id: 12,
        image: newsImage11,
        title: "أحدث صيحات الموضة لعام 2024",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
      {
        id: 13,
        image: newsImage12,
        title: "أحدث صيحات الموضة لعام 2024",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
      {
        id: 14,
        image: newsImage10,
        title: "أحدث صيحات الموضة لعام 2024",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
    ],
    ثقافة: [
      {
        id: 2,
        image: newsImage6,
        title: "10 من أفضل الأفلام عن الانتخابات الرئاسية الأمريكية",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
      {
        id: 4,
        image: newsImage8,
        title: "اكتشاف أثري جديد في مصر",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
    ],
    رياضة: [
      {
        id: 3,
        image: newsImage7,
        title: "أهم المباريات اليوم في الدوري السعودي",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
    ],
    سياسة: [
      {
        id: 5,
        image: newsImage9,
        title: "نتائج الانتخابات الرئاسية الأمريكية",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
      {
        id: 7,
        image: newsImage11,
        title: "تطورات الحرب في غزة",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
    ],
    تكنولوجيا: [
      {
        id: 8,
        image: newsImage12,
        title: "تكنولوجيا الذكاء الاصطناعي",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
    ],
    صحة: [
      {
        id: 9,
        image: newsImage13,
        title: "نصائح للعناية بالصحة",
        date: "الخميس، 18 مايو 2024",
        views: "1.2K",
      },
    ],
  };

  // Get all categories
  const categories = Object.keys(newsData);
  // Set first category as default
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Get current category's news items
  const currentNews = newsData[activeCategory] || [];

  // Get first item for the main featured news
  const mainNews = currentNews[0];
  // Get remaining items (from index 1 to end) for the list
  const remainingNews = currentNews.slice(1);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(remainingNews.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedNews = remainingNews.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const leftColumnNews = paginatedNews.slice(0, 4);
  const rightColumnNews = paginatedNews.slice(4, 8);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 mb-[-0.7rem] cursor-pointer z-10 text-sm  transition-colors duration-200 ${
                activeCategory === category
                  ? "text-negative  border-b-2 border-[#BF0000] font-bold"
                  : "text-[#204A84] font-[400]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex gap-x-2">
          <div
            className={`w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] flex items-center justify-center rounded-full cursor-pointer transition`}
          >
            <img className="w-[0.6rem]" src={arrow1} alt="arrow" />
          </div>
          <div
            onClick={handleNext}
            className={`w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer transition`}
          >
            <img className="w-[0.6rem]" src={arrow2} alt="arrow" />
          </div>
        </div>
      </div>
      <div className="flex-1 relative h-[0.15rem] relative bg-[#D9E3F6] mt-2"></div>

      {currentNews.length > 0 ? (
        <div className="grid grid-cols-12 mt-[1rem]">
          <div className="col-span-8">
            <div className="grid grid-cols-2 gap-x-[1rem]">
              <div className="flex flex-col">
                <img
                  src={mainNews.image}
                  className="w-full h-[16rem] object-cover"
                  alt="news"
                />
                <h1 className="font-bold text-md text-[#333333] mt-4">
                  {mainNews.title}
                </h1>
                {mainNews.description && (
                  <p className="text-sm text-[#666666] mt-2 line-clamp-3">
                    {mainNews.description}
                  </p>
                )}
                <div className="mt-3">
                  <NewsMetaInfo
                    dateText={mainNews.date}
                    viewsText={mainNews.views}
                    textColor="text-[#363636]"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-[1rem]">
                {leftColumnNews.map((item) => (
                  <div key={item.id} className="flex gap-x-[1rem]">
                    <img
                      className="w-[7rem] h-[6rem] object-cover"
                      src={item.image}
                      alt="news"
                    />
                    <div className="flex flex-col space-y-2 justify-center">
                      <h1 className="font-bold line-clamp-2 text-md text-[#333333]">
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

          <div className="col-span-4">
            <div className="flex flex-col space-y-[1rem]">
              {rightColumnNews.map((item) => (
                <div key={item.id} className="flex gap-x-[1rem]">
                  <img
                    className="w-[7rem] h-[6rem] object-cover"
                    src={item.image}
                    alt="news"
                  />
                  <div className="flex flex-col space-y-2 justify-center">
                    <h1 className="font-bold line-clamp-2 text-md text-[#333333]">
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
      ) : (
        <div className="text-center py-8 text-gray-500">
          لا توجد أخبار في هذا القسم
        </div>
      )}
    </div>
  );
};

export default NewsModelEight;
