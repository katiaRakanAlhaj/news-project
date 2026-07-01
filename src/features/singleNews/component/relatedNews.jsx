// NewsModelTen.jsx - Using Swiper with pagination
import i18next from "i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { containerVariants, CenteredSquareLoader } from "../../../ui/animationNews";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import social media icons
import LinkedInColor from "../../../../assets/images/linkedInColor.svg";
import instgramColor from "../../../../assets/images/instgramColor.svg";
import facebookColor from "../../../../assets/images/facebookColor.svg";
import twitterColor from "../../../../assets/images/twitterColor.svg";
import youtubeColor from "../../../../assets/images/youtubeColor.svg";
import tiktok from "../../../../assets/images/tiktok.svg";
import { formatDate } from "../../../utils/dateUtils";
import TitleSection from "../../../ui/titleSection";

// Pagination styles
export const paginationStyles = `
  .swiper-pagination-bullet-active {
    background-color: #BF0000 !important;
  }
  .news-model-ten-swiper .swiper-pagination {
    position: relative !important;
    margin-top: 1rem !important;
  }
  .news-model-ten-swiper .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #9CA3AF;
    opacity: 1;
    transition: all 0.3s ease;
  }
  .news-model-ten-swiper .swiper-pagination-bullet-active {
    width: 24px;
    border-radius: 4px;
    background-color: #BF0000 !important;
  }
`;

const NewsModelTen = ({ 
  data, 
  sectionId, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading: externalIsLoading,
  currentLang
}) => {
  console.log("dataTen", data);
  
  // Extract items from API data
  const items = data?.items || [];
  
  // Check if items is an array or has a data property
  const itemsArray = Array.isArray(items) ? items : (items?.data || []);
  
  // Map API items
  const mappedData = itemsArray.map((item) => ({
    id: item.id,
    image: item.image || "",
    title: item.title || "",
    link: item.link || "",
    platform: item.platform || "",
    source: item.source || "",
    date: item.date ? formatDate(item.date, currentLang) : "",
  }));

  // Pagination handlers (for page navigation - top arrows)
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

  const isRTL = i18next.language === "ar";

  // Don't render if no data
  if (!data || (!mappedData.length && !externalIsLoading)) {
    return null;
  }

  // Get platform icon based on platform name
  const getPlatformIcon = (platform) => {
    const platformMap = {
      x: twitterColor,
      twitter: twitterColor,
      facebook: facebookColor,
      linkedin: LinkedInColor,
      instagram: instgramColor,
      youtube: youtubeColor,
      tiktok: tiktok,
    };
    return platformMap[platform?.toLowerCase()] || null;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="container1 mx-auto mt-[2rem]"
    >
      <style>{paginationStyles}</style>
      
      {/* Title Section with pagination arrows (top) */}
      <TitleSection 
        title={data.title || i18next.t("social_media.title") || "وسائل التواصل"}
        showArrows={true}
        currentPage={currentPage}
        lastPage={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        isLoading={externalIsLoading}
      />

      <div className="mt-[1rem] relative group">
        <AnimatePresence mode="wait">
          {externalIsLoading ? (
            <div className="flex justify-center items-center min-h-[18rem]">
              <CenteredSquareLoader />
            </div>
          ) : (
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative"
            >
              {/* Swiper Slider */}
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={10}
                dir={isRTL ? "rtl" : "ltr"}
                key={currentLang}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: false,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={mappedData.length > 4}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 4 },
                }}
                className="news-model-ten-swiper pb-12 w-full"
              >
                {mappedData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative w-full lg:h-[30rem] h-[20rem] overflow-hidden group/card rounded-2xl">
                        <img
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                          src={item.image}
                          alt={item.title}
                        />
                        
                        {/* Gradient Overlay */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.8) 100%)",
                          }}
                        />
                        
                        {/* Content Container - Centered absolutely */}
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-6 z-10">
                          {/* Platform Icon - Centered */}
                          {item.platform && getPlatformIcon(item.platform) && (
                            <div className="mb-3">
                              <img 
                                src={getPlatformIcon(item.platform)} 
                                alt={item.platform}
                                className="w-12 h-12 object-contain drop-shadow-lg"
                              />
                            </div>
                          )}
                          
                          {/* Title - Centered text */}
                          <h1 className={`text-white font-bold md:text-xl text-lg text-center line-clamp-2 mb-3 drop-shadow-lg`}>
                            {item.title}
                          </h1>
                          
                          {/* Source and Date */}
                          <div className="flex items-center justify-center gap-4 mb-3">
                            {item.source && (
                              <span className="text-white/80 text-sm font-medium">
                                {item.source}
                              </span>
                            )}
                            {item.date && (
                              <span className="text-white/60 text-xs">
                                {item.date}
                              </span>
                            )}
                          </div>
                          
                          {/* Social Button - Secondary color */}
                          <button className="bg-secondary hover:bg-secondary/80 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                            <span>🔗</span> 
                            {i18next.t("social_media.visit") || "Visit"}
                          </button>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NewsModelTen;