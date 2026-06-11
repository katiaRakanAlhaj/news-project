import i18next from "i18next";
import NewsCard from "../../../../ui/newsCard";
import TitleSection from "../../../../ui/titleSection";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdvertisementSpace from "../../../../assets/images/AdvertisementSpace.png";
import { containerVariants, CenteredSquareLoader } from "../../../../ui/animationNews";

const NewsModelFive = ({ 
  data, 
  sectionId, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading: externalIsLoading 
}) => {
  const [selectedChoice, setSelectedChoice] = useState(null);

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
  
  // Map API news items to the format expected by NewsCard
  const news = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    title: item.news_title,
    date: formatDate(item.date),
    views: '1.2K',
    type: item.category?.name || "عام",
  }));

  // Survey options (static for now - could come from API)
  const surveyOptions = [
    { id: 1, label: "يسير في الطريق الصحيح", value: "correct" },
    { id: 2, label: "يحتاج للمزيد من الوقت", value: "more_time" },
    { id: 3, label: "لا يزال في بداياته", value: "beginning" },
  ];

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

  const handleChoiceChange = (value) => {
    setSelectedChoice(value);
  };

  const handleVote = () => {
    if (selectedChoice) {
      // Handle vote submission here
      console.log("Voted for:", selectedChoice);
      // You can make an API call to submit the vote
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
      className="container1 mx-auto mt-[2rem]"
    >
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-[1rem]">
        {/* first column - News with animations */}
        <div className="lg:col-span-8 col-span-1">
          <TitleSection 
            title={data.title || "أحدث الأخبار"} 
            showArrows={true}
            currentPage={currentPage}
            lastPage={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            isLoading={externalIsLoading}
          />

          {/* Animated content with centered square loader */}
          <div className="relative min-h-[400px]">
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
                  className="grid md:grid-cols-2 gap-y-[2rem] gap-x-[0.5rem] mt-[1rem]"
                >
                  {news.map((item, index) => (
                    <NewsCard
                      key={item.id || index}
                      image={item.image}
                      title={item.title}
                      date={item.date}
                      views={item.views}
                      type={item.type}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* second column - Survey and Advertisement (no animations) */}
        <div className="lg:col-span-4 col-span-1">
          {/* Survey Section */}
          <div
            style={{ boxShadow: "0px 1px 2px 0px #0000000D" }}
            className="w-full h-auto px-[2rem] py-[2rem] rounded-lg bg-white border border-[#C1C6D6]"
          >
            <h1 className="text-secondary text-md mt-1">استبيان</h1>
            <p className="text-secondary text-xl mt-4 font-bold">
              ما هو رأيك في التحول الرقمي الحالي في المنطقة؟
            </p>

            <div className="mt-4 space-y-3">
              {surveyOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="survey"
                    value={option.value}
                    checked={selectedChoice === option.value}
                    onChange={() => handleChoiceChange(option.value)}
                    className="w-3 h-3 border border-[#C1C6D6] text-secondary focus:ring-secondary cursor-pointer"
                  />
                  <span className="text-secondary text-md">{option.label}</span>
                </label>
              ))}
            </div>
            <button 
              onClick={handleVote}
              className="w-full h-[3rem] mt-4 rounded-lg bg-secondary text-md font-bold text-white hover:bg-secondary/90 transition"
            >
              {i18next.t("news_wedget.vote_now")}
            </button>
          </div>
          
          {/* Advertisement Space */}
          <div className="w-full h-[19rem] relative bg-[#E5E7EB] border border-dashed border-gray-300 mt-[2rem] rounded-lg">
            <img
              src={AdvertisementSpace}
              className="h-[10rem] w-full object-cover mt-[2rem]"
              alt="Advertisement"
            />
            <p className="text-nowrap absolute left-1/4 ml-[3rem] text-[#9CA3AF] text-xs top-1/2">
              مساحة إعلانية
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsModelFive;