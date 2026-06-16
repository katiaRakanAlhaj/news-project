import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import arrow1 from "../../../../assets/images/arrow1.svg";
import arrow2 from "../../../../assets/images/arrow2.svg";
import NewsMetaInfo from "../../../../ui/dateAndViewsSection";
import {
  containerVariants,
  imageVariants,
  CenteredSquareLoader,
} from "../../../../ui/animationNews";

const NewsModelEight = ({
  data,
  sectionId,
  currentPage: apiCurrentPage,
  totalPages: apiTotalPages,
  onPageChange,
  isLoading: externalIsLoading,
}) => {
  console.log("NewsModelEight",data)
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Process API data structure - items is an array of categories with their news
  const processApiData = (apiData) => {
    if (!apiData || !apiData.items || !Array.isArray(apiData.items)) {
      return {};
    }

    const newsDataMap = {};

    apiData.items.forEach((categoryItem) => {
      const categoryName = categoryItem.name;
      const newsArray = categoryItem.news || [];

      newsDataMap[categoryName] = newsArray.map((news) => ({
        id: news.id,
        image: news.news_image,
        title: news.news_title,
        description: news.news_description || "",
        date: formatDate(news.date),
        views: "1.2K",
      }));
    });

    return newsDataMap;
  };

  // Get news data from API
  const newsData = processApiData(data);

  // Get categories from the data
  const categories = Object.keys(newsData);

  // State management
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get current category news
  const currentNews = newsData[activeCategory] || [];
  const mainNews = currentNews[0];
  const remainingNews = currentNews.slice(1);

  // Pagination settings for local category pagination
  const itemsPerPage = 8;
  const totalLocalPages = Math.ceil(remainingNews.length / itemsPerPage);

  const handleNextLocal = () => {
    if (currentPage < totalLocalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevLocal = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // API pagination handlers
  const handlePrevApiPage = () => {
    if (apiCurrentPage > 1 && !externalIsLoading) {
      onPageChange(sectionId, apiCurrentPage - 1);
    }
  };

  const handleNextApiPage = () => {
    if (apiCurrentPage < apiTotalPages && !externalIsLoading) {
      onPageChange(sectionId, apiCurrentPage + 1);
    }
  };

  const handleApiPageClick = (page) => {
    if (page !== apiCurrentPage && !externalIsLoading) {
      onPageChange(sectionId, page);
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

  // Don't render if no data or no categories
  if (!data || (!categories.length && !externalIsLoading)) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="container1 mx-auto mt-[2rem] px-[1rem] sm:px-[1.5rem] md:px-0"
    >
      {/* API Pagination Dots at the top */}
      {apiTotalPages > 1 && (
        <motion.div
          variants={imageVariants}
          className="flex justify-end items-center gap-10 mb-4"
        >
          <button
            onClick={handlePrevApiPage}
            disabled={apiCurrentPage <= 1 || externalIsLoading}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
              apiCurrentPage <= 1 || externalIsLoading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-negative hover:text-white"
            }`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(apiTotalPages, 5) }, (_, i) => {
              let pageNumber = i + 1;
              if (apiTotalPages > 5 && apiCurrentPage > 3) {
                if (i === 0) pageNumber = 1;
                else if (i === 1)
                  return (
                    <span key="ellipsis1" className="px-1">
                      ...
                    </span>
                  );
                else if (i === 4) pageNumber = apiTotalPages;
                else pageNumber = apiCurrentPage + (i - 2);
              }
              return (
                <button
                  key={pageNumber}
                  onClick={() => handleApiPageClick(pageNumber)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    apiCurrentPage === pageNumber
                      ? "bg-negative w-4"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={handleNextApiPage}
            disabled={apiCurrentPage >= apiTotalPages || externalIsLoading}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
              apiCurrentPage >= apiTotalPages || externalIsLoading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-negative hover:text-white"
            }`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Categories Section */}
      <AnimatePresence mode="wait">
        {externalIsLoading ? (
          <div className="min-h-[400px]">
            <CenteredSquareLoader key="loader" />
          </div>
        ) : (
          <motion.div
            key={apiCurrentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Desktop & Tablet Categories (md and up) */}
            <motion.div
              variants={imageVariants}
              className="hidden md:flex justify-between items-center"
            >
              <div className="flex gap-x-[1rem] pb-[0.5rem] overflow-x-auto hide-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-[1rem] py-[0.5rem] mb-[-0.7rem] cursor-pointer z-10 text-lg transition-colors duration-200 whitespace-nowrap ${
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
                  onClick={handlePrevLocal}
                  className={`w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] flex items-center justify-center rounded-full cursor-pointer transition ${
                    currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <img className="w-[0.6rem]" src={arrow1} alt="arrow" />
                </div>
                <div
                  onClick={handleNextLocal}
                  className={`w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer transition ${
                    currentPage === totalLocalPages - 1 || totalLocalPages === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <img className="w-[0.6rem]" src={arrow2} alt="arrow" />
                </div>
              </div>
            </motion.div>

            {/* Mobile Categories Dropdown */}
            <motion.div
              variants={imageVariants}
              className="md:hidden mb-[1rem]"
            >
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex justify-between items-center px-[1rem] py-[0.75rem] bg-[#F5F5F5] rounded-[0.5rem]"
              >
                <span className="text-[#204A84] font-medium">
                  {activeCategory}
                </span>
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
            </motion.div>

            {/* Mobile Horizontal Scroll Categories */}
            <motion.div
              variants={imageVariants}
              className="md:hidden overflow-x-auto pb-[0.5rem] mb-[1rem] hide-scrollbar"
            >
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
            </motion.div>

            <div className="flex-1 relative h-[0.15rem] bg-[#D9E3F6] mt-[0.5rem] hidden md:block"></div>

            {currentNews.length > 0 ? (
              <>
                {/* Desktop Layout (lg screens) */}
                <motion.div
                  variants={containerVariants}
                  className="hidden lg:grid grid-cols-12 gap-x-[2rem] mt-[1rem]"
                >
                  <div className="col-span-8">
                    <div className="grid grid-cols-2 gap-x-[1rem]">
                      <motion.div
                        variants={imageVariants}
                        className="flex flex-col"
                      >
                        <img
                          src={mainNews.image}
                          className="w-full h-[16rem] object-cover"
                          alt="news"
                        />
                        <h1 className="font-bold text-xl text-[#333333] mt-[1rem]">
                          {mainNews.title}
                        </h1>
                        {mainNews.description && (
                          <p className="text-md text-[#666666] mt-[0.5rem] line-clamp-3">
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
                      </motion.div>

                      <motion.div
                        variants={containerVariants}
                        className="flex flex-col space-y-[1rem]"
                      >
                        {leftColumnNews.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            variants={imageVariants}
                            className="flex gap-x-[1rem]"
                          >
                            <img
                              className="w-[9rem] h-[8rem] object-cover"
                              src={item.image}
                              alt="news"
                            />
                            <div className="flex flex-col space-y-[0.5rem] justify-center">
                              <h1 className="font-bold line-clamp-2 text-lg text-[#333333]">
                                {item.title}
                              </h1>
                              <NewsMetaInfo
                                dateText={item.date}
                                viewsText={item.views}
                                textColor="text-[#363636]"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    className="col-span-4"
                  >
                    <div className="flex flex-col space-y-[1rem]">
                      {rightColumnNews.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          variants={imageVariants}
                          className="flex gap-x-[1rem]"
                        >
                          <img
                            className="w-[9rem] h-[8rem] object-cover"
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
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Tablet Layout (md screens) */}
                <motion.div
                  variants={containerVariants}
                  className="hidden md:block lg:hidden mt-[1rem]"
                >
                  <div className="grid grid-cols-2 gap-[1.5rem]">
                    <motion.div
                      variants={imageVariants}
                      className="col-span-2 mb-[1rem]"
                    >
                      <img
                        src={mainNews.image}
                        className="w-full h-[16rem] object-cover"
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
                    </motion.div>

                    <motion.div
                      variants={containerVariants}
                      className="col-span-1"
                    >
                      <div className="flex flex-col space-y-[1rem]">
                        {leftColumnNews.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            variants={imageVariants}
                            className="flex gap-x-[0.75rem]"
                          >
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
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={containerVariants}
                      className="col-span-1"
                    >
                      <div className="flex flex-col space-y-[1rem]">
                        {rightColumnNews.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            variants={imageVariants}
                            className="flex gap-x-[0.75rem]"
                          >
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
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex justify-center items-center gap-[1rem] mt-[1.5rem]">
                    <button
                      onClick={handlePrevLocal}
                      disabled={currentPage === 0}
                      className={`w-[2.5rem] h-[2.5rem] bg-[#D9D9D9] rounded-full flex items-center justify-center ${
                        currentPage === 0 ? "opacity-50" : ""
                      }`}
                    >
                      <img className="w-[0.75rem]" src={arrow1} alt="prev" />
                    </button>
                    <span className="text-[0.875rem] text-[#666666]">
                      صفحة {currentPage + 1} من {totalLocalPages || 1}
                    </span>
                    <button
                      onClick={handleNextLocal}
                      disabled={
                        currentPage === totalLocalPages - 1 ||
                        totalLocalPages === 0
                      }
                      className={`w-[2.5rem] h-[2.5rem] bg-[#D9D9D9] rounded-full flex items-center justify-center ${
                        currentPage === totalLocalPages - 1 ||
                        totalLocalPages === 0
                          ? "opacity-50"
                          : ""
                      }`}
                    >
                      <img className="w-[0.75rem]" src={arrow2} alt="next" />
                    </button>
                  </div>
                </motion.div>

                {/* Mobile Layout (small screens) */}
                <motion.div
                  variants={containerVariants}
                  className="md:hidden mt-[1rem]"
                >
                  <motion.div variants={imageVariants} className="mb-[1.5rem]">
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
                  </motion.div>

                  <div className="flex justify-between items-center mb-[1rem]">
                    <button
                      onClick={handlePrevLocal}
                      disabled={currentPage === 0}
                      className={`w-[2rem] h-[2rem] bg-[#D9D9D9] rounded-full flex items-center justify-center ${
                        currentPage === 0 ? "opacity-50" : ""
                      }`}
                    >
                      <img className="w-[0.75rem]" src={arrow1} alt="prev" />
                    </button>
                    <span className="text-[0.875rem] text-[#666666]">
                      صفحة {currentPage + 1} من {totalLocalPages || 1}
                    </span>
                    <button
                      onClick={handleNextLocal}
                      disabled={
                        currentPage === totalLocalPages - 1 ||
                        totalLocalPages === 0
                      }
                      className={`w-[2rem] h-[2rem] bg-[#D9D9D9] rounded-full flex items-center justify-center ${
                        currentPage === totalLocalPages - 1 ||
                        totalLocalPages === 0
                          ? "opacity-50"
                          : ""
                      }`}
                    >
                      <img className="w-[0.75rem]" src={arrow2} alt="next" />
                    </button>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    className="space-y-[1rem]"
                  >
                    {paginatedNews.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        variants={imageVariants}
                        className="flex gap-x-[0.75rem]"
                      >
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
                      </motion.div>
                    ))}
                  </motion.div>

                  {totalLocalPages > 1 && currentPage < totalLocalPages - 1 && (
                    <button
                      onClick={handleNextLocal}
                      className="w-full mt-[1.5rem] py-[0.75rem] bg-[#204A84] text-white rounded-[0.5rem] font-medium"
                    >
                      تحميل المزيد
                    </button>
                  )}
                </motion.div>
              </>
            ) : (
              <motion.div
                variants={imageVariants}
                className="text-center py-[2rem] text-gray-500"
              >
                لا توجد أخبار في هذا القسم
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default NewsModelEight;
