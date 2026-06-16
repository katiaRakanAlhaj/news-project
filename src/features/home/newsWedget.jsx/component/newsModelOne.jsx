// NewsModelOne.jsx - with shared animations
import i18next from "i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import seeMore1 from "../../../../assets/images/seeMore1.png";
import seeMore2 from "../../../../assets/images/seeMore2.png";
import seeMore3 from "../../../../assets/images/seeMore3.png";
import NewsCard from "../../../../ui/newsCard";
import MostViewedSection from "../../../../ui/MostViewedSection";
import TitleSection from "../../../../ui/titleSection";
import { containerVariants, CenteredSquareLoader } from "../../../../ui/animationNews";
import { useFetchCategories, useFetchCategoryById } from "../../../News/hook/useFetchNews";
import { useParams } from "react-router-dom";
import React from "react";

const NewsModelOne = ({ 
  data, 
  sectionId, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading: externalIsLoading,
  diffrentNewsData // This is the data for "منوعات"
}) => {
  const [activeTab, setActiveTab] = useState("ترند");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [trendCategoryId, setTrendCategoryId] = useState(null);
  const {id} = useParams();

  const {
    data: categoryData,
    isLoading: categoryDataLoading,
    error: categoryDataError,
  } = useFetchCategories();

  const {
    data: categoryByIdData,
    isLoading: categoryByIdDataLoading,
    error: categoryByIdDataError,
  } = useFetchCategoryById(selectedCategoryId);

  // Find "ترند" category from the API response
  useEffect(() => {
    if (categoryData?.data) {
      const trendCategory = categoryData.data.find(
        category => category.name === "ترند"
      );
      
      if (trendCategory) {
        setTrendCategoryId(trendCategory.id);
        setSelectedCategoryId(trendCategory.id);
      }
    }
  }, [categoryData]);

  // Format date function for Arabic
  const formatDateArabic = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format date function for English (if needed)
  const formatDateEnglish = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Extract news items from API data
  const newsItems = data?.items || [];
  
  // Map API news items to the format expected by NewsCard
  const news = newsItems.map((item) => ({
    image: item.news_image,
    title: item.news_title,
    date: formatDateArabic(item.date),
    views: item.views || "1.2k",
    type: item.category?.name,
    id: item.id
  }));

  // Pagination handlers with loading animation
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
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
  };

  // Transform category data for MostViewedSection (for "ترند")
  const getTrendCategoryNews = () => {
    if (categoryByIdData?.news) {
      return categoryByIdData.news.map((item, index) => ({
        image: item.news_image || seeMore1,
        title: item.news_title,
        description: item.news_description?.substring(0, 100) + "..." || "",
        time: formatDateArabic(item.date) || `منذ ${index + 2} ساعات`,
      }));
    }
    return [];
  };

  // Transform different news data for "منوعات" with Arabic dates
  const getDifferentNews = () => {
    if (diffrentNewsData?.data) {
      return diffrentNewsData.data.map((item, index) => ({
        image: item.news_image || seeMore1,
        title: item.news_title,
        description: item.news_description?.substring(0, 100) + "..." || "",
        time: formatDateArabic(item.date) || `منذ ${index + 2} ساعات`,
      }));
    }
    return [];
  };

  // Most viewed data from API for "ترند" and diffrentNewsData for "منوعات"
  const mostViewedData = {
    ترند: getTrendCategoryNews(),
    منوعات: getDifferentNews()
  };

  // Don't render if no data
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
          {/* title with pagination arrows */}
          <TitleSection 
            title={data.title || i18next.t("news_wedget.latest_news")}
            showArrows={true}
            currentPage={currentPage}
            lastPage={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            isLoading={externalIsLoading}
          />

          {/* Animated content with centered square loader */}
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
                    <NewsCard
                      key={item.id || index}
                      image={item.image}
                      title={item.title}
                      date={item.date}
                      views={item.views}
                      type={item.type}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/** second column - Most Viewed */}
        <div className="lg:col-span-4">
          <div className="flex flex-wrap gap-x-6 items-center mb-[0.9rem]">
            <h1 className="font-bold text-lg text-negative">
              {i18next.t("news_wedget.most_view")}
            </h1>
            <div className="w-[15%] h-[0.1rem] bg-negative"></div>

            {/* "ترند" Tab Button - from API */}
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
                  ترند
                </button>
                <div className="w-[15%] h-[0.1rem] bg-negative"></div>
              </>
            )}

            {/* "منوعات" Tab Button - from diffrentNewsData */}
            <button
              onClick={() => handleTabClick("منوعات")}
              className={`font-bold text-lg transition ${
                activeTab === "منوعات"
                  ? "text-negative border-b-2 border-negative"
                  : "text-primary hover:text-negative"
              }`}
            >
              منوعات
            </button>
          </div>

          {/* Show loading state for "ترند" data */}
          {activeTab === "ترند" && categoryByIdDataLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <CenteredSquareLoader />
            </div>
          ) : (
            <MostViewedSection
              activeTab={activeTab}
              mostViewedData={mostViewedData}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsModelOne;