// NewsModelTen.jsx - With animation and pagination like NewsModelNine
import TitleSection from "../../../../ui/titleSection";
import i18next from "i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { containerVariants, CenteredSquareLoader } from "../../../../ui/animationNews";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { formatDate } from "../../../../utils/dateUtils";

// Import social media icons
import linkedInFooter from "../../../../assets/images/linkedInFooter.svg";
import instgramColor from "../../../../assets/images/instgramColor.svg";
import facebookFooter from "../../../../assets/images/facebookFooter.svg";
import twitterColor from "../../../../assets/images/twitterColor.svg";
import youtubeColor from "../../../../assets/images/youtubeColor.svg";
import tiktok from "../../../../assets/images/tiktok.svg";

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
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  
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

  // Handle responsive slides to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset index when data changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [data, currentPage]);

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

  // Slider navigation handlers
  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextSlide = () => {
    const maxIndex = Math.max(0, mappedData.length - slidesToShow);
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const isRTL = i18next.language === "ar";
  const canGoPrev = currentIndex > 0;
  const maxIndex = Math.max(0, mappedData.length - slidesToShow);
  const canGoNext = currentIndex < maxIndex;

  // Calculate clean offsets
  const totalMovementPercent = currentIndex * (100 / slidesToShow);
  const transformStyle = isRTL 
    ? `translateX(${totalMovementPercent}%)` 
    : `translateX(-${totalMovementPercent}%)`;

  // Don't render if no data
  if (!data || (!mappedData.length && !externalIsLoading)) {
    return null;
  }

  // Get platform icon based on platform name
  const getPlatformIcon = (platform) => {
    const platformMap = {
      x: twitterColor,
      twitter: twitterColor,
      facebook: facebookFooter,
      linkedin: linkedInFooter,
      instagram: instgramColor,
      youtube: youtubeColor,
      tiktok: tiktok,
    };
    return platformMap[platform?.toLowerCase()] || null;
  };

  // Get platform display name
  const getPlatformDisplayName = (platform) => {
    const names = {
      x: "X",
      twitter: "Twitter",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      youtube: "YouTube",
      tiktok: "TikTok",
    };
    return names[platform?.toLowerCase()] || platform;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="container1 mx-auto mt-[2rem]"
    >
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
              {/* Slider Component Frame Wrapper */}
              <div className="overflow-hidden w-full">
                <div 
                  className="flex transition-transform duration-300 ease-out style-layer"
                  style={{ 
                    transform: transformStyle,
                    width: "100%"
                  }}
                >
                  {mappedData.map((item) => (
                    <div 
                      key={item.id} 
                      className="px-2 shrink-0 flex-none"
                      style={{ width: `${100 / slidesToShow}%` }}
                    >
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
                           
                            {/* Title - Centered text */}
                            <h1 className={`text-white font-bold md:text-xl text-lg text-center line-clamp-2 mb-3 drop-shadow-lg`}>
                              {item.title}
                            </h1>
                            
                            {/* Source and Date */}
                            <div className="flex items-center justify-center gap-4 mb-3">
                           
                              {item.date && (
                                <span className="text-white/60 text-xs">
                                  {item.date}
                                </span>
                              )}
                            </div>
                            
                            {/* Social Button - Secondary color */}
                            <button className="bg-secondary hover:bg-secondary/80 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                             <img 
                                  src={getPlatformIcon(item.platform)} 
                                  alt={item.platform}
                                  className="w-4 h-4 object-contain drop-shadow-lg"
                                />
                              {item.source}
                            </button>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Arrow Controls */}
              {mappedData.length > slidesToShow && (
                <>
                  <button
                    onClick={isRTL ? handleNextSlide : handlePrevSlide}
                    disabled={isRTL ? !canGoNext : !canGoPrev}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed`}
                    aria-label="Previous Slide"
                  >
                    <IoChevronBack size={24} />
                  </button>

                  <button
                    onClick={isRTL ? handlePrevSlide : handleNextSlide}
                    disabled={isRTL ? !canGoPrev : !canGoNext}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed`}
                    aria-label="Next Slide"
                  >
                    <IoChevronForward size={24} />
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NewsModelTen;