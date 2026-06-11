// NewsModelFour.jsx - with shared animations and pagination
import i18next from "i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import TitleSection from "../../../../ui/titleSection";
import { containerVariants, CenteredSquareLoader } from "../../../../ui/animationNews";

const NewsModelFour = ({ 
  data, 
  sectionId, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading: externalIsLoading 
}) => {
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

  // Get items from API (handle pagination structure)
  const getItemsArray = (items) => {
    if (Array.isArray(items)) {
      return items;
    }
    if (items && items.data && Array.isArray(items.data)) {
      return items.data;
    }
    return [];
  };

  // Extract news items from API data
  const newsItems = getItemsArray(data?.items || []);
  
  // Map API news items to the format needed for the component
  const news = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    type: item.category?.name || "عام",
    title: item.news_title,
    date: formatDate(item.date),
    views: '1.2K',
  }));

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page !== currentPage && !externalIsLoading) {
      onPageChange(sectionId, page);
    }
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
      className="mt-8 w-full"
    >
      <div className="container1 mx-auto mb-[1rem]">
        <TitleSection 
          title={data.title || i18next.t("news_wedget.latest_news")}
          showArrows={true}
          currentPage={currentPage}
          lastPage={totalPages}
          onPrevPage={() => handlePageChange(currentPage - 1)}
          onNextPage={() => handlePageChange(currentPage + 1)}
          isLoading={externalIsLoading}
        />
      </div>

      {/* Animated content with centered square loader */}
      <div className="relative">
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
              className="container1 mx-auto"
            >
              <Swiper
                modules={[Autoplay]}
                loop={true}
                spaceBetween={0}
                slidesPerView={5}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 0,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 0,
                  },
                  1536: {
                    slidesPerView: 6,
                    spaceBetween: 0,
                  },
                }}
              >
                {news.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="relative h-[24rem] overflow-hidden rounded-md group cursor-pointer mx-2">
                      <div className={`absolute top-2 ${i18next.language == "ar" ? 'right-2' : 'left-2'} z-10`}>
                        <span className="inline-block bg-[#005BBF] text-xs px-2 py-1 rounded-full text-white">
                          {item.type}
                        </span>
                      </div>

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="text-sm leading-5 font-bold line-clamp-3">
                          {item.title}
                        </h3>

                        <div className="flex justify-between mt-2 text-[10px] text-gray-300">
                          <span>{item.date}</span>
                          <span>{item.views}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Pagination Dots - each dot represents a page with 6 images */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-x-3 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={externalIsLoading}
                      className={`transition-all duration-300 rounded-full ${
                        currentPage === page
                          ? 'bg-negative w-3 h-3'
                          : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to page ${page}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NewsModelFour;