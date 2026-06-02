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

  const categories = Object.keys(newsData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentNews = newsData[activeCategory] || [];
  const mainNews = currentNews[0];
  const remainingNews = currentNews.slice(1);

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
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="container1 mx-auto mt-[2rem] px-[1rem] sm:px-[1.5rem] md:px-0">
      {/* Desktop & Tablet Categories (md and up) */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex gap-x-[1rem] pb-[0.5rem]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-[1rem] py-[0.5rem] mb-[-0.7rem] cursor-pointer z-10 text-[0.875rem] transition-colors duration-200 whitespace-nowrap ${
                activeCategory === category
                  ? "text-negative border-b-2 border-[#BF0000] font-bold"
                  : "text-[#204A84] font-[400]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex gap-x-[0.5rem]">
          <div
            onClick={handlePrev}
            className={`w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] flex items-center justify-center rounded-full cursor-pointer transition ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <img className="w-[0.6rem]" src={arrow1} alt="arrow" />
          </div>
          <div
            onClick={handleNext}
            className={`w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer transition ${
              currentPage === totalPages - 1 || totalPages === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <img className="w-[0.6rem]" src={arrow2} alt="arrow" />
          </div>
        </div>
      </div>

      {/* Mobile Categories Dropdown (small screens) */}
      <div className="md:hidden mb-[1rem]">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex justify-between items-center px-[1rem] py-[0.75rem] bg-[#F5F5F5] rounded-[0.5rem]"
        >
          <span className="text-[#204A84] font-medium">{activeCategory}</span>
          <svg
            className={`w-[1.25rem] h-[1.25rem] transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isMobileMenuOpen && (
          <div className="absolute z-20 w-[calc(100%-2rem)] sm:w-[calc(100%-2rem)] bg-white border border-gray-200 rounded-[0.5rem] mt-[0.25rem] shadow-lg max-h-[15rem] overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`w-full text-right px-[1rem] py-[0.75rem] hover:bg-gray-50 transition-colors ${
                  activeCategory === category
                    ? "text-[#BF0000] font-bold bg-gray-50"
                    : "text-[#204A84]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Horizontal Scroll Categories (Alternative for small screens) */}
      <div className="md:hidden overflow-x-auto pb-[0.5rem] mb-[1rem] hide-scrollbar">
        <div className="flex gap-x-[0.75rem]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-[0.75rem] py-[0.375rem] rounded-full whitespace-nowrap text-[0.875rem] transition-colors ${
                activeCategory === category
                  ? "bg-[#BF0000] text-white"
                  : "bg-[#F5F5F5] text-[#204A84]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative h-[0.15rem] bg-[#D9E3F6] mt-[0.5rem] hidden md:block"></div>

      {currentNews.length > 0 ? (
        <>
          {/* Desktop Layout (lg screens) */}
          <div className="hidden lg:grid grid-cols-12 mt-[1rem]">
            <div className="col-span-8">
              <div className="grid grid-cols-2 gap-x-[1rem]">
                <div className="flex flex-col">
                  <img
                    src={mainNews.image}
                    className="w-full h-[16rem] object-cover rounded-[0.5rem]"
                    alt="news"
                  />
                  <h1 className="font-bold text-[1rem] text-[#333333] mt-[1rem]">
                    {mainNews.title}
                  </h1>
                  {mainNews.description && (
                    <p className="text-[0.875rem] text-[#666666] mt-[0.5rem] line-clamp-3">
                      {mainNews.description}
                    </p>
                  )}
                  <div className="mt-[0.75rem]">
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
                        className="w-[7rem] h-[6rem] object-cover rounded-[0.5rem]"
                        src={item.image}
                        alt="news"
                      />
                      <div className="flex flex-col space-y-[0.5rem] justify-center">
                        <h1 className="font-bold line-clamp-2 text-[1rem] text-[#333333]">
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
                      className="w-[7rem] h-[6rem] object-cover rounded-[0.5rem]"
                      src={item.image}
                      alt="news"
                    />
                    <div className="flex flex-col space-y-[0.5rem] justify-center">
                      <h1 className="font-bold line-clamp-2 text-[1rem] text-[#333333]">
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

          {/* Tablet Layout (md screens) */}
          <div className="hidden md:block lg:hidden mt-[1rem]">
            <div className="grid grid-cols-2 gap-[1.5rem]">
              {/* Main Featured News - Full width on tablet */}
              <div className="col-span-2 mb-[1rem]">
                <img
                  src={mainNews.image}
                  className="w-full h-[16rem] object-cover rounded-[0.5rem]"
                  alt="news"
                />
                <h1 className="font-bold text-[1.25rem] text-[#333333] mt-[1rem]">
                  {mainNews.title}
                </h1>
                {mainNews.description && (
                  <p className="text-[0.875rem] text-[#666666] mt-[0.5rem] line-clamp-3">
                    {mainNews.description}
                  </p>
                )}
                <div className="mt-[0.75rem]">
                  <NewsMetaInfo
                    dateText={mainNews.date}
                    viewsText={mainNews.views}
                    textColor="text-[#363636]"
                  />
                </div>
              </div>

              {/* Left Column */}
              <div className="col-span-1">
                <div className="flex flex-col space-y-[1rem]">
                  {leftColumnNews.map((item) => (
                    <div key={item.id} className="flex gap-x-[0.75rem]">
                      <img
                        className="w-[6.25rem] h-[5.625rem] object-cover rounded-[0.5rem] flex-shrink-0"
                        src={item.image}
                        alt="news"
                      />
                      <div className="flex flex-col space-y-[0.5rem] justify-center">
                        <h1 className="font-bold line-clamp-2 text-[0.875rem] text-[#333333]">
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

              {/* Right Column */}
              <div className="col-span-1">
                <div className="flex flex-col space-y-[1rem]">
                  {rightColumnNews.map((item) => (
                    <div key={item.id} className="flex gap-x-[0.75rem]">
                      <img
                        className="w-[6.25rem] h-[5.625rem] object-cover rounded-[0.5rem] flex-shrink-0"
                        src={item.image}
                        alt="news"
                      />
                      <div className="flex flex-col space-y-[0.5rem] justify-center">
                        <h1 className="font-bold line-clamp-2 text-[0.875rem] text-[#333333]">
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

            {/* Tablet Navigation Arrows */}
            <div className="flex justify-center items-center gap-[1rem] mt-[1.5rem]">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`w-[2.5rem] h-[2.5rem] bg-[#D9D9D9] rounded-full flex items-center justify-center ${
                  currentPage === 0 ? "opacity-50" : ""
                }`}
              >
                <img className="w-[0.75rem]" src={arrow1} alt="prev" />
              </button>
              <span className="text-[0.875rem] text-[#666666]">
                صفحة {currentPage + 1} من {totalPages || 1}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1 || totalPages === 0}
                className={`w-[2.5rem] h-[2.5rem] bg-[#D9D9D9] rounded-full flex items-center justify-center ${
                  currentPage === totalPages - 1 || totalPages === 0
                    ? "opacity-50"
                    : ""
                }`}
              >
                <img className="w-[0.75rem]" src={arrow2} alt="next" />
              </button>
            </div>
          </div>

          {/* Mobile Layout (small screens) */}
          <div className="md:hidden mt-[1rem]">
            {/* Main Featured News */}
            <div className="mb-[1.5rem]">
              <img
                src={mainNews.image}
                className="w-full h-[12.5rem] object-cover rounded-[0.5rem]"
                alt="news"
              />
              <h1 className="font-bold text-[1.125rem] text-[#333333] mt-[0.75rem] line-clamp-2">
                {mainNews.title}
              </h1>
              {mainNews.description && (
                <p className="text-[0.875rem] text-[#666666] mt-[0.5rem] line-clamp-3">
                  {mainNews.description}
                </p>
              )}
              <div className="mt-[0.5rem]">
                <NewsMetaInfo
                  dateText={mainNews.date}
                  viewsText={mainNews.views}
                  textColor="text-[#363636]"
                />
              </div>
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex justify-between items-center mb-[1rem]">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`w-[2rem] h-[2rem] bg-[#D9D9D9] rounded-full flex items-center justify-center ${
                  currentPage === 0 ? "opacity-50" : ""
                }`}
              >
                <img className="w-[0.75rem]" src={arrow1} alt="prev" />
              </button>
              <span className="text-[0.875rem] text-[#666666]">
                صفحة {currentPage + 1} من {totalPages || 1}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1 || totalPages === 0}
                className={`w-[2rem] h-[2rem] bg-[#D9D9D9] rounded-full flex items-center justify-center ${
                  currentPage === totalPages - 1 || totalPages === 0
                    ? "opacity-50"
                    : ""
                }`}
              >
                <img className="w-[0.75rem]" src={arrow2} alt="next" />
              </button>
            </div>

            {/* Mobile News List */}
            <div className="space-y-[1rem]">
              {paginatedNews.map((item) => (
                <div key={item.id} className="flex gap-x-[0.75rem]">
                  <img
                    className="w-[6.25rem] h-[5rem] object-cover rounded-[0.5rem] flex-shrink-0"
                    src={item.image}
                    alt="news"
                  />
                  <div className="flex flex-col space-y-[0.25rem] flex-1">
                    <h1 className="font-bold text-[0.875rem] text-[#333333] line-clamp-2">
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

            {/* Load More Button for Mobile */}
            {totalPages > 1 && currentPage < totalPages - 1 && (
              <button
                onClick={handleNext}
                className="w-full mt-[1.5rem] py-[0.75rem] bg-[#204A84] text-white rounded-[0.5rem] font-medium"
              >
                تحميل المزيد
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-[2rem] text-gray-500">
          لا توجد أخبار في هذا القسم
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default NewsModelEight;