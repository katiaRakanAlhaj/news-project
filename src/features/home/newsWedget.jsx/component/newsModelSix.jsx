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
  
  // Get first two items as main news (featured - left and right)
  const mainNewsLeft = newsItems.length > 0 ? newsItems[0] : null;
  const mainNewsRight = newsItems.length > 1 ? newsItems[1] : null;
  
  // Get remaining items for small cards grid
  const smallNewsItems = newsItems.slice(2, 6); // Next 4 items

  // Format main news data
  const mainNewsLeftData = mainNewsLeft ? {
    id: mainNewsLeft.id,
    image: mainNewsLeft.news_image,
    title: mainNewsLeft.news_title,
    date: formatDate(mainNewsLeft.date),
    views: mainNewsLeft.views_count,
  } : null;

  const mainNewsRightData = mainNewsRight ? {
    id: mainNewsRight.id,
    image: mainNewsRight.news_image,
    title: mainNewsRight.news_title,
    date: formatDate(mainNewsRight.date),
    views: mainNewsRight.views_count,
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
      className="container1 mx-auto mt-[2rem] md:px-0"
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
              {/* first row - Grid with 2 columns (left and right cards) */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-[0.5rem]"
              >
                {/* Left Card */}
                <motion.div variants={imageVariants}>
                  <div className="relative w-full h-[17rem] md:h-[20rem] lg:h-[22rem] overflow-hidden group cursor-pointer">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={mainNewsLeftData?.image}
                      alt={mainNewsLeftData?.title}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(0deg, #000000 0%, rgba(102, 102, 102, 0) 54.46%)",
                      }}
                    />
                    <div
                      className={`absolute ${i18next.language == "ar" ? "right-[1rem]" : "left-[1rem]"} bottom-[1.5rem] left-[1rem] right-[1rem]`}
                    >
                      <h1 className="text-white text-base md:text-lg lg:text-2xl w-full leading-relaxed font-bold line-clamp-3">
                        {mainNewsLeftData?.title}
                      </h1>
                      <NewsMetaInfo
                        dateText={mainNewsLeftData?.date}
                        viewsText={mainNewsLeftData?.views}
                        textColor="text-white"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Right Card */}
                <motion.div variants={imageVariants}>
                  <div className="relative w-full h-[17rem] md:h-[20rem] lg:h-[22rem] overflow-hidden group cursor-pointer">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={mainNewsRightData?.image}
                      alt={mainNewsRightData?.title}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(0deg, #000000 0%, rgba(102, 102, 102, 0) 54.46%)",
                      }}
                    />
                    <div
                      className={`absolute ${i18next.language == "ar" ? "right-[1rem]" : "left-[1rem]"} bottom-[1.5rem] left-[1rem] right-[1rem]`}
                    >
                      <h1 className="text-white text-base md:text-lg lg:text-2xl w-full leading-relaxed font-bold line-clamp-3">
                        {mainNewsRightData?.title}
                      </h1>
                      <NewsMetaInfo
                        dateText={mainNewsRightData?.date}
                        viewsText={mainNewsRightData?.views}
                        textColor="text-white"
                      />
                    </div>
                  </div>
                </motion.div>
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
                    className="relative w-full h-[10rem] md:h-[12rem] lg:h-[15rem] overflow-hidden group cursor-pointer"
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
                      <h1 className="text-white text-xs md:text-lg w-full leading-relaxed font-bold line-clamp-2">
                        {item.title}
                      </h1>
                      <NewsMetaInfo
                        dateText={item.date}
                        viewsText={item.views}
                        textColor="text-white"
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