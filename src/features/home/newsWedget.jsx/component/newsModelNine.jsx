// NewsModelNine.jsx - Using simple CSS slider instead of Swiper
import TitleSection from "../../../../ui/titleSection";
import i18next from "i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, CenteredSquareLoader } from "../../../../ui/animationNews";

const NewsModelNine = ({ 
  data, 
  sectionId, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading: externalIsLoading 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

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

  // Extract news items from API data
  const newsItems = data?.items || [];
  
  // Map API news items
  const newsData = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    title: item.news_title,
    date: formatDate(item.date),
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
  }, [newsData.length]);

  // Pagination handlers (for page navigation - top arrows)
  const handlePrevPage = () => {
    if (currentPage > 1 && !externalIsLoading) {
      onPageChange(sectionId, currentPage - 1);
      setCurrentIndex(0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !externalIsLoading) {
      onPageChange(sectionId, currentPage + 1);
      setCurrentIndex(0);
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

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < newsData.length - slidesToShow;

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

      <div className="mt-[1rem] relative">
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
            >
              {/* Simple CSS Slider */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-out"
                  style={{ 
                    transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
                    width: `${(newsData.length / slidesToShow) * 100}%`
                  }}
                >
                  {newsData.map((item) => (
                    <div 
                      key={item.id} 
                      className="px-2"
                      style={{ width: `${100 / slidesToShow}%` }}
                    >
                      <div className="relative w-full h-[22rem] overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
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
                          className={`absolute ${i18next.language == "ar" ? "right-[1rem]" : "left-[1rem]"} bottom-[1rem]`}
                        >
                          <h1 className="text-white font-bold text-xl line-clamp-2">
                            {item.title}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NewsModelNine;