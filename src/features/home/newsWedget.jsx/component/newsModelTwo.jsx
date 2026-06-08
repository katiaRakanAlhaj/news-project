import TitleSection from "../../../../ui/titleSection";
import NewsCard from "../../../../ui/newsCard";
import i18next from "i18next";
import { useState, useEffect } from "react";

const NewsModelTwo = ({ 
  data, 
  sectionId, 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
}) => {
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

  const getItemsArray = (items) => {
    if (Array.isArray(items)) return items;
    if (items?.data && Array.isArray(items.data)) return items.data;
    return [];
  };

  const newsItems = getItemsArray(data?.items || []);
  
  const newsData = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    title: item.news_title,
    description: item.news_description || "لا يوجد وصف متاح",
    date: formatDate(item.date),
    views: "1.2k",
    type: item.category?.name || "عام",
  }));

  // Auto-pagination effect
  useEffect(() => {
    if (totalPages <= 1) return;
    
    const interval = setInterval(() => {
      let nextPage = currentPage + 1;
      if (nextPage > totalPages) {
        nextPage = 1;
      }
      onPageChange?.(sectionId, nextPage);
    }, 2000); // Change page every 5 seconds

    return () => clearInterval(interval);
  }, [currentPage, totalPages, sectionId, onPageChange]);

  // Render pagination circles (dots)
  const renderPaginationDots = () => {
    const dots = [];
    for (let i = 1; i <= totalPages; i++) {
      dots.push(
        <button
          key={i}
          onClick={() => onPageChange?.(sectionId, i)}
          className={`transition-all duration-300 mx-1 ${
            currentPage === i
              ? 'w-3 h-3 bg-red-600 rounded-md'
              : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
          }`}
          aria-label={`Go to page ${i}`}
        />
      );
    }
    return dots;
  };

  if (!data || !newsItems.length) {
    return null;
  }

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <TitleSection showArrows={true} title={data.title || i18next.t("news_wedget.latest_news")} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {newsData.map((item) => (
          <NewsCard
            key={item.id}
            description={item.description}
            image={item.image}
            title={item.title}
            date={item.date}
            views={item.views}
            type={item.type}
          />
        ))}
      </div>

      {/* Pagination Circles */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {renderPaginationDots()}
        </div>
      )}
    </div>
  );
};

export default NewsModelTwo;