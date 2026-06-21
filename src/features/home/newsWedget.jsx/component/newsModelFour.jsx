// NewsModelFour.jsx

import i18next from "i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import TitleSection from "../../../../ui/titleSection";
import {
  containerVariants,
  CenteredSquareLoader,
} from "../../../../ui/animationNews";
import { Link } from "react-router-dom";

const NewsModelFour = ({
  data,
  sectionId,
  currentPage,
  totalPages,
  onPageChange,
  isLoading: externalIsLoading,
  currentLang,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getItemsArray = (items) => {
    if (Array.isArray(items)) return items;

    if (items?.data && Array.isArray(items.data)) {
      return items.data;
    }

    return [];
  };

  const newsItems = getItemsArray(data?.items || []);

  const news = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    type: item.category?.name || "عام",
    title: item.news_title,
    date: formatDate(item.date),
    views: item.views_count,
  }));

  const handlePageChange = (page) => {
    if (page !== currentPage && !externalIsLoading) {
      onPageChange(sectionId, page);
    }
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
      className="w-full mt-8"
    >
      <div className="container1 mx-auto mb-5">
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

      <div className="relative overflow-hidden">
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
            >
              <Swiper
                modules={[Autoplay]}
                loop={true}
                centeredSlides={
                  false
                } /* Fixed: Changed from true to false so slides start from the left edge */
                initialSlide={
                  0
                } /* Fixed: Forces Swiper to load starting from the very first slide */
                slidesPerGroup={1}
                speed={800}
                spaceBetween={8}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                className="news-slider"
                breakpoints={{
                  320: {
                    slidesPerView: 1.15,
                  },
                  480: {
                    slidesPerView: 1.4,
                  },
                  640: {
                    slidesPerView: 2.2,
                  },
                  768: {
                    slidesPerView: 3.2,
                  },
                  1024: {
                    slidesPerView: 4.2,
                  },
                  1280: {
                    slidesPerView: 5.2,
                  },
                }}
              >
                {news.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Link to={`/${currentLang}/News/${item.id}`}>
                      <div className="group relative h-[28rem] overflow-hidden rounded-2xl cursor-pointer">
                        {/* Image */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                        {/* Category */}
                        <div
                          className={`absolute top-4 z-20 ${
                            i18next.language === "ar" ? "right-4" : "left-4"
                          }`}
                        >
                          <span className="bg-[#005BBF] text-white text-xs px-3 py-1 rounded-full">
                            {item.type}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                          <h3 className="text-white text-lg font-bold leading-7 line-clamp-3">
                            {item.title}
                          </h3>

                          <div className="flex items-center justify-between mt-4 text-xs text-gray-300">
                            <span>{item.views}</span>
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-3">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        disabled={externalIsLoading}
                        onClick={() => handlePageChange(page)}
                        className={`transition-all duration-300 rounded-full ${
                          currentPage === page
                            ? "w-3 h-3 bg-negative"
                            : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ),
                  )}
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
