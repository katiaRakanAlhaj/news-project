import i18next from "i18next";
import { motion, AnimatePresence } from "framer-motion";
import TitleSection from "../../../../ui/titleSection";
import MostViewedSection from "../../../../ui/MostViewedSection";
import { containerVariants, imageVariants, CenteredSquareLoader } from "../../../../ui/animationNews";

const NewsModelThree = ({ 
  data, 
  sectionId, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading 
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

  // Format time difference (for "منذ ٤ ساعات" style)
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "منذ أقل من ساعة";
    if (diffInHours === 1) return "منذ ساعة";
    if (diffInHours < 24) return `منذ ${diffInHours} ساعات`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "منذ يوم";
    return `منذ ${diffInDays} أيام`;
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
  const newsData = newsItems.map((item, index) => ({
    id: item.id,
    image: item.news_image,
    type: item.category?.name || "عام",
    title: item.news_title,
    description: item.news_description || "لا يوجد وصف متاح",
    time: formatTimeAgo(item.date),
    date: formatDate(item.date),
  }));

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(sectionId, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(sectionId, currentPage + 1);
    }
  };

  // Don't render if no data
  if (!data || (!newsItems.length && !isLoading)) {
    return null;
  }

  // Get first item for main column
  const mainNewsItem = newsData[0];
  
  // Get remaining items for Most Viewed section (from index 1 onwards)
  const remainingItems = newsData.slice(1);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="container1 mx-auto mt-[2rem] px-4"
    >
      <TitleSection 
        title={data.title || i18next.t("news_wedget.latest_news")}
        showArrows={true}
        currentPage={currentPage}
        lastPage={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        isLoading={isLoading}
      />

      {/* Single Loader for entire content */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="min-h-[400px]">
            <CenteredSquareLoader key="loader" />
          </div>
        ) : (
          <motion.div
            key={currentPage}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="grid lg:grid-cols-12 grid-cols-1 gap-[1rem] mt-[1rem]"
          >
            {/* First column - Main News col-span-9 */}
            <motion.div 
              variants={imageVariants}
              className="lg:col-span-8 col-span-1"
            >
              {mainNewsItem && (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={mainNewsItem.image}
                    className="w-full h-[34rem] object-cover"
                    alt={mainNewsItem.title}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
                  <div className={`absolute bottom-[3rem] ${i18next.language == "ar" ? 'right-[3rem]' : 'left-[3rem]'} z-10`}>
                    <button className="w-[5rem] h-[1.8rem] bg-secondary rounded-full text-white text-md">
                      {mainNewsItem.type}
                    </button>
                    <h1 className="font-bold text-white text-2xl mt-3">
                      {mainNewsItem.title}
                    </h1>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Second column - Most Viewed col-span-3 */}
            <motion.div 
              variants={imageVariants}
              className="lg:col-span-4 col-span-1"
            >
              <MostViewedSection mostViewedData={remainingItems} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NewsModelThree;