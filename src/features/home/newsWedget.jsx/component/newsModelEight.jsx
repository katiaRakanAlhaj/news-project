// NewsModelEight.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewsMetaInfo from "../../../../ui/dateAndViewsSection";
import arrow1 from "../../../../assets/images/arrow1.svg";
import arrow2 from "../../../../assets/images/arrow2.svg";
import {
  containerVariants,
  imageVariants,
  CenteredSquareLoader,
} from "../../../../ui/animationNews";
import { useTheme } from "../../../../context/ThemeContext";

const NewsModelEight = ({
  data,
  sectionId,
  onPageChange,
  onCategoryChange, // New prop for category tracking
  isLoading: externalIsLoading,
  categoryPages,
}) => {
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
  const { isDarkMode } = useTheme();
  // Process API data structure - items is an array of categories with their news
  const processApiData = (apiData) => {
    if (!apiData || !apiData.items || !Array.isArray(apiData.items)) {
      return {};
    }

    const newsDataMap = {};

    apiData.items.forEach((categoryItem) => {
      const categoryName = categoryItem.name;
      const categoryId = categoryItem.id;

      // news is an object with 'data' array
      const newsObject = categoryItem.news || { data: [] };
      const newsArray = newsObject.data || [];

      // Get pagination info
      const currentPage = newsObject.current_page || 1;
      const lastPage = newsObject.last_page || 1;

      newsDataMap[categoryName] = {
        id: categoryId,
        currentPage: currentPage,
        lastPage: lastPage,
        news: newsArray.map((news) => ({
          id: news.id,
          image: news.news_image,
          title: news.news_title,
          description: news.news_description || "",
          date: formatDate(news.date),
          views: news.views_count,
        })),
      };
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

  // Update active category when data changes
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
      // Notify parent about the initial category
      const categoryData = newsData[categories[0]];
      if (categoryData && onCategoryChange) {
        onCategoryChange(sectionId, categoryData.id);
      }
    }
  }, [categories, activeCategory, sectionId, onCategoryChange, newsData]);

  // Get current category news
  const currentCategoryData = newsData[activeCategory] || {
    news: [],
    id: null,
    currentPage: 1,
    lastPage: 1,
  };
  const currentNews = currentCategoryData.news || [];
  const currentCategoryId = currentCategoryData.id;

  // Get the current page for this specific category from categoryPages state
  const categoryKey = `${sectionId}-${currentCategoryId}`;
  const currentCategoryCurrentPage =
    categoryPages?.[categoryKey] || currentCategoryData.currentPage || 1;
  const currentCategoryLastPage = currentCategoryData.lastPage || 1;

  // Check if this category is currently loading
  const isLoadingCategory =
    externalIsLoading ||
    (categoryPages?.[categoryKey] &&
      categoryPages[categoryKey] !== currentCategoryData.currentPage);

  const mainNews = currentNews[0];
  const remainingNews = currentNews.slice(1);

  // Pagination settings for local category pagination (items per page)
  const itemsPerPage = 8;
  const totalLocalPages = Math.ceil(remainingNews.length / itemsPerPage);

  // Reset local page when category changes or data updates
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory, currentCategoryCurrentPage]);

  // Handle local pagination (navigating through items within the current page)
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

  // API pagination handlers with section ID and category ID
  const handlePrevApiPage = () => {
    if (currentCategoryCurrentPage > 1 && !isLoadingCategory) {
      onPageChange(
        sectionId,
        currentCategoryCurrentPage - 1,
        currentCategoryId,
      );
    }
  };

  const handleNextApiPage = () => {
    if (
      currentCategoryCurrentPage < currentCategoryLastPage &&
      !isLoadingCategory
    ) {
      onPageChange(
        sectionId,
        currentCategoryCurrentPage + 1,
        currentCategoryId,
      );
    }
  };

  const paginatedNews = remainingNews.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const leftColumnNews = paginatedNews.slice(0, 4);
  const rightColumnNews = paginatedNews.slice(4, 8);

  const handleCategoryClick = (category) => {
    const categoryData = newsData[category];
    const categoryId = categoryData?.id || null;

    setActiveCategory(category);
    setCurrentPage(0);
    setIsMobileMenuOpen(false);

    // Notify parent about category change
    if (onCategoryChange) {
      onCategoryChange(sectionId, categoryId);
    }

    // Reset to first page with new category
    onPageChange(sectionId, 1, categoryId);
  };

  // Don't render if no data or no categories
  if (!data || (!categories.length && !isLoadingCategory)) {
    return null;
  }

  // Show loading if no news and still loading
  if (isLoadingCategory && currentNews.length === 0) {
    return (
      <div className="min-h-[400px]">
        <CenteredSquareLoader key="loader" />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="container1 mx-auto mt-[2rem] px-[1rem] sm:px-[1.5rem] md:px-0"
    >
      {/* Categories Section */}
      <AnimatePresence mode="wait">
        {isLoadingCategory && currentNews.length > 0 ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <CenteredSquareLoader key="loader" />
          </div>
        ) : (
          <motion.div
            key={`${currentCategoryCurrentPage}-${activeCategory}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Desktop & Tablet Categories with Pagination Arrows */}
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

              {/* API Pagination Arrows - These call the API for category pagination */}
              <div className="flex gap-x-[0.5rem] items-center">
                <div
                  onClick={handlePrevApiPage}
                  className={`w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] flex items-center justify-center rounded-full cursor-pointer transition ${
                    currentCategoryCurrentPage <= 1 || isLoadingCategory
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-400"
                  }`}
                >
                  <img
                    className="w-[0.6rem]"
                    src={arrow1}
                    alt="previous page"
                  />
                </div>
                <div
                  onClick={handleNextApiPage}
                  className={`w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer transition ${
                    currentCategoryCurrentPage >= currentCategoryLastPage ||
                    isLoadingCategory
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-400"
                  }`}
                >
                  <img className="w-[0.6rem]" src={arrow2} alt="next page" />
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

              {/* Mobile API Pagination */}
              <div className="flex justify-between items-center mt-3 px-2">
                <span className="text-sm text-gray-500">
                  {currentCategoryCurrentPage} / {currentCategoryLastPage}
                </span>
                <div className="flex gap-x-2">
                  <div
                    onClick={handlePrevApiPage}
                    className={`w-[2rem] h-[2rem] bg-[#D9D9D9] flex items-center justify-center rounded-full cursor-pointer transition ${
                      currentCategoryCurrentPage <= 1 || isLoadingCategory
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-400"
                    }`}
                  >
                    <img className="w-[0.7rem]" src={arrow1} alt="previous" />
                  </div>
                  <div
                    onClick={handleNextApiPage}
                    className={`w-[2rem] h-[2rem] bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer transition ${
                      currentCategoryCurrentPage >= currentCategoryLastPage ||
                      isLoadingCategory
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-400"
                    }`}
                  >
                    <img className="w-[0.7rem]" src={arrow2} alt="next" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile Horizontal Scroll Categories */}
            <motion.div
              variants={imageVariants}
              className="md:hidden overflow-x-auto pb-[0.5rem] mb-[0.5rem] hide-scrollbar"
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

            {/* News Content */}
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
                        <h1
                          className={`font-bold text-xl ${isDarkMode ? "text-white" : "text-[#333333]"} mt-[1rem]`}
                        >
                          {mainNews.title}
                        </h1>
                        {mainNews.description && (
                          <p className={`text-md text-[#666666] mt-[0.5rem] line-clamp-3`}>
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

                  {/* Local pagination (items within current page) */}
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
