import { useState } from "react";
import NewsMetaInfo from "../../../ui/dateAndViewsSection";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

const NewsGrid = ({ categoryData }) => {
  const navigate = useNavigate();
  
  // Use API data instead of hardcoded data
  const allNewsItems = categoryData?.news || [];
  
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

  const handleNewsClick = (id) => {
    navigate(`/News/${id}`);
  };

  // Show all news items without pagination for now
  const visibleNewsItems = allNewsItems;

  if (!allNewsItems || allNewsItems.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No news found in this category
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:space-y-4 space-y-6">
        {visibleNewsItems?.map((newsItem, index) => (
          <div
            key={newsItem.id || index}
            className="grid md:grid-cols-2 gap-x-3 lg:gap-y-0 gap-y-[2rem] cursor-pointer"
            onClick={() => handleNewsClick(newsItem.id)}
          >
            <div className="relative">
              <img
                src={newsItem?.news_image}
                className="w-full h-[16rem] rounded-xl object-cover"
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
              <h1 className="text-[#333333] text-xl font-bold leading-relaxed">
                {newsItem?.news_title}
              </h1>
              <p className="text-[#666666] mt-1 text-lg leading-relaxed line-clamp-3">
                {newsItem.news_description}
              </p>
              <div className="absolute lg:bottom-[0.4rem] bottom-[-1rem] pointer-events-none">
                <NewsMetaInfo
                  dateText={formatDate(newsItem.date)}
                  viewsText={'1.2K'}
                  textColor="text-[#6B7280]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;