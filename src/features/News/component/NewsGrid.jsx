import { useState, useEffect } from "react";
import NewsMetaInfo from "../../../ui/dateAndViewsSection";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import i18next from "i18next";
import { useFetchCategoryById } from "../hook/useFetchNews";
import { formatDate } from "../../../utils/dateUtils";

const NewsGrid = ({ categoryData, categoryId }) => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const getCurrentLang = () => {
    return lang || "ar";
  };
  const currentLang = getCurrentLang();

  const [currentPage, setCurrentPage] = useState(1);
  const [allNewsItems, setAllNewsItems] = useState(categoryData?.news || []);
  const [paginationInfo, setPaginationInfo] = useState(
    categoryData?.pagination || null,
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch data for specific page
  const {
    data: pageData,
    refetch,
    isFetching,
  } = useFetchCategoryById(categoryId, currentPage);

  // Update news items when page data changes
  useEffect(() => {
    if (pageData && currentPage > 1) {
      // Append new news to existing ones
      setAllNewsItems((prev) => [...prev, ...(pageData.news || [])]);
      setPaginationInfo(pageData.pagination);
      setIsLoadingMore(false);
    } else if (pageData && currentPage === 1) {
      setAllNewsItems(pageData.news || []);
      setPaginationInfo(pageData.pagination);
    }
  }, [pageData, currentPage]);

  // Reset state when category changes
  useEffect(() => {
    setCurrentPage(1);
    setAllNewsItems(categoryData?.news || []);
    setPaginationInfo(categoryData?.pagination || null);
  }, [categoryId, categoryData]);

  const handleNewsClick = (id) => {
    navigate(`/${currentLang}/News/${id}`); // Added leading '/'
  };

  const handleLoadMore = async () => {
    if (paginationInfo && currentPage < paginationInfo.last_page) {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      // Refetch data for next page
      await refetch();
    }
  };

  // Empty state with better UI
  if (!allNewsItems || allNewsItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 rounded-xl bg-gray-50/50 text-center px-4">
        <img 
          src="https://www.gstatic.com/images/branding/product/2x/news_96dp.png" 
          alt={i18next.t("category.empty_alt")} 
          className="w-20 h-20 opacity-50 mb-4"
        />
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          {i18next.t("category.empty_title")}
        </h2>
        <p className="text-gray-400 max-w-sm text-md">
          {i18next.t("category.empty_description")}
        </p>
      </div>
    );
  }

  const hasMorePages = paginationInfo && currentPage < paginationInfo.last_page;

  return (
    <div>
      <div className="flex flex-col lg:space-y-4 space-y-6">
        {allNewsItems?.map((newsItem, index) => (
          <div
            key={`${newsItem.id}-${index}`}
            className="grid md:grid-cols-2 gap-x-3 lg:gap-y-0 gap-y-[2rem] cursor-pointer"
            onClick={() => handleNewsClick(newsItem.id)}
          >
            <div className="relative">
              <img
                src={newsItem?.news_image}
                className="w-full lg:h-[16rem] h-[20rem] rounded-xl object-cover"
                alt={newsItem.news_title}
              />
              <div
                className={`absolute ${i18next.language == "ar" ? "right-[0.5rem]" : "left-[0.5rem]"} top-[0.5rem] pointer-events-none`}
              >
                <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
                  <p className="text-white font-[700] text-md mt-1">
                    {newsItem.category?.name || categoryData?.name || "اخبار"}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <h1 className="text-[#333333] md:text-xl text-lg font-bold leading-relaxed line-clamp-2">
                {newsItem?.news_title}
              </h1>
              <p className="text-[#666666] mt-1 md:text-lg text-md leading-relaxed line-clamp-3">
                {newsItem.news_description}
              </p>
              <div className="absolute lg:bottom-[0.4rem] bottom-[-1.5rem] pointer-events-none">
                <NewsMetaInfo
                  dateText={formatDate(newsItem.date , currentLang)}
                  viewsText={newsItem.views_count}
                  textColor="text-[#6B7280]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMorePages && (
        <div className="flex flex-col items-center mt-8 space-y-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore || isFetching}
            className="px-8 py-3 bg-[#005BBF] text-white rounded-lg hover:bg-[#004a9f] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium min-w-[200px]"
          >
            {isLoadingMore || isFetching ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري التحميل...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {i18next.t("buttons.see_more")}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;