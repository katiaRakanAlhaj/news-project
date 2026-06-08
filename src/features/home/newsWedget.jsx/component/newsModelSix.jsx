import TitleSection from "../../../../ui/titleSection";
import NewsMetaInfo from "../../../../ui/dateAndViewsSection";
import i18next from "i18next";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, imageVariants, CenteredSquareLoader } from "../../../../ui/animationNews";

const NewsModelSix = ({ 
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
  
  // Get first item as main news (featured)
  const mainNewsItem = newsItems.length > 0 ? newsItems[0] : null;
  
  // Get remaining items for small cards grid
  const smallNewsItems = newsItems.slice(1, 5); // Next 4 items

  // Format main news data
  const mainNews = mainNewsItem ? {
    id: mainNewsItem.id,
    image: mainNewsItem.news_image,
    title: mainNewsItem.news_title,
    date: formatDate(mainNewsItem.date),
    views: '1.2K',
  } : null;

  // Format small news data
  const smallNews = smallNewsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    title: item.news_title,
    date: formatDate(item.date),
    views: '1.2K',
  }));

  // Pagination handlers
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
      className="container1 mx-auto mt-[2rem] px-4 md:px-0"
    >
      <TitleSection 
        title={data.title || "منوعات"}
        showArrows={true}
        currentPage={currentPage}
        lastPage={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        isLoading={externalIsLoading}
      />

      {/* Animated content with centered square loader */}
      <div className="relative min-h-[400px] mt-[1rem]">
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
              {/* first row - Main large card */}
              <motion.div variants={imageVariants}>
                <div className="relative w-full h-[17rem] md:h-[20rem] lg:h-[17rem] overflow-hidden group cursor-pointer rounded-lg">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={mainNews?.image}
                    alt={mainNews?.title}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(0deg, #000000 0%, rgba(102, 102, 102, 0) 54.46%)",
                    }}
                  />
                  <div
                    className={`absolute ${i18next.language == "ar" ? "right-[1rem] md:left-auto" : "left-[1rem] md:right-auto"} bottom-[1.5rem]`}
                  >
                    <h1 className="text-white text-base md:text-lg lg:text-xl w-full md:w-[85%] leading-relaxed font-bold line-clamp-3">
                      {mainNews?.title}
                    </h1>
                    <NewsMetaInfo
                      dateText={mainNews?.date}
                      viewsText={mainNews?.views}
                      textColor="text-[#9CA3AF]"
                    />
                  </div>
                </div>
              </motion.div>

              {/* second row - Small cards grid */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[0.5rem] gap-y-[0.5rem] mt-[0.5rem]"
              >
                {smallNews.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    variants={imageVariants}
                    className="relative w-full h-[10rem] md:h-[12rem] lg:h-[10rem] overflow-hidden group cursor-pointer rounded-lg"
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={item.image}
                      alt={item.title}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(0deg, #000000 0%, rgba(102, 102, 102, 0) 54.46%)",
                      }}
                    />
                    <div className="absolute right-[0.75rem] bottom-[0.5rem] left-[0.75rem]">
                      <h1 className="text-white text-xs md:text-sm w-full leading-relaxed font-bold line-clamp-2">
                        {item.title}
                      </h1>
                      <NewsMetaInfo
                        dateText={item.date}
                        viewsText={item.views}
                        textColor="text-[#9CA3AF]"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NewsModelSix;