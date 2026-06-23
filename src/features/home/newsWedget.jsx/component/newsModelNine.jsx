// NewsModelNine.jsx - Using simple CSS slider with correct layout sizing & disabled arrows
import TitleSection from "../../../../ui/titleSection";
import i18next from "i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { containerVariants, CenteredSquareLoader } from "../../../../ui/animationNews";
import { IoChevronBack, IoChevronForward } from "react-icons/io5"; // Importing navigation arrow icons
import { formatDate } from "../../../../utils/dateUtils";

const NewsModelNine = ({ 
  data, 
  sectionId, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading: externalIsLoading ,
  currentLang
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  // Extract news items from API data
  const newsItems = data?.items || [];
  
  // Map API news items
  const newsData = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    title: item.news_title,
    date: formatDate(item.date , currentLang),
    views: item.views_count || "0",
    type: item.category?.name,
  }));

  // Handle responsive slides to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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
    const maxIndex = Math.max(0, newsData.length - slidesToShow);
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const isRTL = i18next.language === "ar";
  const canGoPrev = currentIndex > 0;
  const maxIndex = Math.max(0, newsData.length - slidesToShow);
  const canGoNext = currentIndex < maxIndex;

  // Calculate clean offsets. Inverting polarity when handling RTL direction values protects width calculations
  const totalMovementPercent = currentIndex * (100 / slidesToShow);
  const transformStyle = isRTL 
    ? `translateX(${totalMovementPercent}%)` 
    : `translateX(-${totalMovementPercent}%)`;

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
      {/* Title Section with pagination arrows (top) */}
      <TitleSection 
        title={data.title || i18next.t("news_wedget.reports")}
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
                    width: "100%" // Keeps track container width consistently clean
                  }}
                >
                  {newsData.map((item) => (
                    <div 
                      key={item.id} 
                      className="px-2 shrink-0 flex-none" // Prevents individual slide cards from shrinking on final index bounds
                      style={{ width: `${100 / slidesToShow}%` }}
                    >
                      <Link to={`/${currentLang}/News/${item.id}`}>
                        <div className="relative w-full lg:h-[22rem] h-[20rem]">
                          <img
                            className="w-full h-full object-cover transition-transform duration-300"
                            src={item.image}
                            alt={item.title}
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(0, 0, 0, 0) 51.55%, #000000 100%)",
                            }}
                          ></div>
                          <div
                            className={`absolute ${isRTL ? "right-[1rem]" : "left-[1rem]"} bottom-[1rem] z-10`}
                          >
                            <h1 className="text-white font-bold md:text-xl text-md line-clamp-2">
                              {item.title}
                            </h1>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Arrow Controls - Conditionally rendered if collection exceeds active columns */}
              {newsData.length > slidesToShow && (
                <>
                  {/* Left Controls */}
                  <button
                    onClick={isRTL ? handleNextSlide : handlePrevSlide}
                    disabled={isRTL ? !canGoNext : !canGoPrev}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed`}
                    aria-label="Previous Slide"
                  >
                    <IoChevronBack size={24} />
                  </button>

                  {/* Right Controls */}
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

export default NewsModelNine;