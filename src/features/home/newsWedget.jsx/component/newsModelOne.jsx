// NewsModelOne.jsx - with shared animations and "See More" functionality
import i18next from "i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import seeMore1 from "../../../../assets/images/seeMore1.png";
import NewsCard from "../../../../ui/newsCard";
import MostViewedSection from "../../../../ui/MostViewedSection";
import TitleSection from "../../../../ui/titleSection";
import {
  containerVariants,
  CenteredSquareLoader,
} from "../../../../ui/animationNews";
import {
  useFetchCategories,
  useFetchCategoryById,
} from "../../../News/hook/useFetchNews";
import { Link, useParams } from "react-router-dom";
import React from "react";
// Import both formatDate and formatTimeAgo from your utility file
import { formatDate, formatTimeAgo } from "../../../../utils/dateUtils";

const NewsModelOne = ({
  data,
  sectionId,
  currentPage,
  totalPages,
  onPageChange,
  isLoading: externalIsLoading,
  diffrentNewsData,
  mostViewdNewsData,
  currentLang,
}) => {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [trendCategoryId, setTrendCategoryId] = useState(null);
  const [showMostViewed, setShowMostViewed] = useState(true);

  // Track whether the side section is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  const { id } = useParams();

  const { data: categoryData } = useFetchCategories();

  const { data: categoryByIdData, isLoading: categoryByIdDataLoading } =
    useFetchCategoryById(selectedCategoryId);

  // Find "ترند" category from the API response
  useEffect(() => {
    if (categoryData?.data) {
      const trendCategory = categoryData.data.find(
        (category) => category.name === "ترند",
      );

      if (trendCategory) {
        setTrendCategoryId(trendCategory.id);
      }
    }
  }, [categoryData]);

  // Extract news items from API data
  const newsItems = data?.items || [];

  // Map API news items to the format expected by NewsCard
  const news = newsItems.map((item) => ({
    image: item.news_image,
    title: item.news_title,
    date: formatDate(item.date, currentLang),
    views: item.views_count,
    type: item.category?.name || (currentLang === "ar" ? "عام" : "General"),
    id: item.id,
  }));

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1 && !externalIsLoading) {
      onPageChange(sectionId, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !externalIsLoading) {
      onPageChange(sectionId, currentPage + 1);
    }
  };

  // Handle tab click
  const handleTabClick = (tabName, categoryId = null) => {
    setActiveTab(tabName);
    setShowMostViewed(false);
    setIsExpanded(false); // Reset to collapsed view on tab changes
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
  };

  // Handle "الأكثر مشاهدة" header click
  const handleMostViewedClick = () => {
    setShowMostViewed(true);
    setActiveTab(null);
    setIsExpanded(false); // Reset to collapsed view on header click
  };

  // Transform category data for "ترند"
  const getTrendCategoryNews = () => {
    if (categoryByIdData?.news) {
      return categoryByIdData.news.map((item) => ({
        id: item.id, 
        image: item.news_image || seeMore1,
        title: item.news_title,
        description: item.news_description?.substring(0, 100) + "..." || "",
        time: formatTimeAgo(item.date, currentLang),
      }));
    }
    return [];
  };

  // Transform different news data for "منوعات"
  const getDifferentNews = () => {
    if (diffrentNewsData?.data) {
      return diffrentNewsData.data.map((item) => ({
        id: item.id, 
        image: item.news_image || seeMore1,
        title: item.news_title,
        description: item.news_description?.substring(0, 100) + "..." || "",
        time: formatTimeAgo(item.date, currentLang),
      }));
    }
    return [];
  };

  // Transform most viewed news data
  const getMostViewedNews = () => {
    if (mostViewdNewsData?.data) {
      const sortedData = [...mostViewdNewsData.data].sort(
        (a, b) => b.views_count - a.views_count,
      );

      return sortedData.map((item) => ({
        id: item.id, 
        image: item.news_image || seeMore1,
        title: item.news_title,
        description: item.news_description?.substring(0, 100) + "..." || "",
        time: formatTimeAgo(item.date, currentLang),
        views: item.views_count || 0,
      }));
    }
    return [];
  };

  // Collect raw un-sliced objects
  const currentActiveKey = showMostViewed ? "الأكثر_مشاهدة" : activeTab;
  const completeSideList =
    currentActiveKey === "الأكثر_مشاهدة"
      ? getMostViewedNews()
      : currentActiveKey === "ترند"
        ? getTrendCategoryNews()
        : currentActiveKey === "منوعات"
          ? getDifferentNews()
          : [];

  // Slice list conditionally if not expanded
  const visibleSideList = isExpanded
    ? completeSideList
    : completeSideList.slice(0, 3);

  const mostViewedData = {
    ترند: currentActiveKey === "ترند" ? visibleSideList : [],
    منوعات: currentActiveKey === "منوعات" ? visibleSideList : [],
    الأكثر_مشاهدة: currentActiveKey === "الأكثر_مشاهدة" ? visibleSideList : [],
  };

  if (!data || (!newsItems.length && !externalIsLoading)) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="container1 mx-auto mt-[2rem]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[2rem] gap-y-[2rem]">
        {/* first column - Main News */}
        <div className="lg:col-span-8">
          <TitleSection
            title={data.title || i18next.t("news_wedget.latest_news")}
            showArrows={true}
            currentPage={currentPage}
            lastPage={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            isLoading={externalIsLoading}
          />

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {externalIsLoading ? (
                <CenteredSquareLoader key="loader" />
              ) : (
                <motion.div
                  key={currentPage}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-[0.5rem] gap-y-[2rem] mt-[1rem]"
                >
                  {news.map((item, index) => (
                    <Link key={item.id || index} to={`/${currentLang}/News/${item.id}`}>
                      <NewsCard
                        image={item.image}
                        title={item.title}
                        date={item.date}
                        views={item.views}
                        type={item.type}
                      />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/** second column - Most Viewed */}
        <div className="lg:col-span-4">
          <div className="flex flex-wrap gap-x-6 items-center mb-[0.9rem]">
            <h1
              className={`font-bold text-lg cursor-pointer transition ${
                showMostViewed
                  ? "text-negative border-b-2 border-negative"
                  : "text-negative hover:text-primary"
              }`}
              onClick={handleMostViewedClick}
            >
              {i18next.t("news_wedget.most_view")}
            </h1>
            <div className="w-[15%] h-[0.1rem] bg-negative"></div>

            {trendCategoryId && (
              <>
                <button
                  onClick={() => handleTabClick("ترند", trendCategoryId)}
                  className={`font-bold text-lg transition ${
                    activeTab === "ترند"
                      ? "text-negative border-b-2 border-negative"
                      : "text-primary hover:text-negative"
                  }`}
                >
                  {currentLang === "ar" ? "ترند" : "Trending"}
                </button>
                <div className="w-[15%] h-[0.1rem] bg-negative"></div>
              </>
            )}

            <button
              onClick={() => handleTabClick("منوعات")}
              className={`font-bold text-lg transition ${
                activeTab === "منوعات"
                  ? "text-negative border-b-2 border-negative"
                  : "text-primary hover:text-negative"
              }`}
            >
              {currentLang === "ar" ? "منوعات" : "Variety"}
            </button>
          </div>

          {activeTab === "ترند" && categoryByIdDataLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <CenteredSquareLoader />
            </div>
          ) : (
            <div>
              <MostViewedSection
                currentLang={currentLang}
                activeTab={currentActiveKey}
                mostViewedData={mostViewedData}
              />

              {/* Conditional See More / See Less Button Actions */}
              {completeSideList.length > 3 && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="px-6 py-2 text-sm font-bold bg-negative text-white rounded shadow hover:bg-opacity-90 transition duration-200"
                  >
                    {isExpanded ? i18next.t("buttons.see_less") : i18next.t("buttons.see_more")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsModelOne;