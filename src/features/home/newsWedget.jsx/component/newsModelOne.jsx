// NewsModelOne.jsx - with shared animations
import i18next from "i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import seeMore1 from "../../../../assets/images/seeMore1.png";
import seeMore2 from "../../../../assets/images/seeMore2.png";
import seeMore3 from "../../../../assets/images/seeMore3.png";
import NewsCard from "../../../../ui/newsCard";
import MostViewedSection from "../../../../ui/MostViewedSection";
import TitleSection from "../../../../ui/titleSection";
import { containerVariants, CenteredSquareLoader } from "../../../../ui/animationNews";

const NewsModelOne = ({ 
  data, 
  sectionId, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading: externalIsLoading 
}) => {
  const [activeTab, setActiveTab] = useState("ترند");

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
  
  // Map API news items to the format expected by NewsCard
  const news = newsItems.map((item) => ({
    image: item.news_image,
    title: item.news_title,
    date: formatDate(item.date),
    views: item.views || "1.2k",
    type: item.category?.name,
    id: item.id
  }));

  // Pagination handlers with loading animation
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

  // Most viewed data (still static - consider making this dynamic too)
  const mostViewedData = {
    ترند: [
      {
        image: seeMore1,
        title: "الاستدامة في التصميم الداخلي",
        description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
        time: "منذ ٤ ساعات",
      },
      {
        image: seeMore2,
        title: "الذكاء الاصطناعي في الصحافة",
        description: "تقنيات الذكاء الاصطناعي تُحدث ثورة في مجال الإعلام والصحافة الرقمية..",
        time: "منذ ٦ ساعات",
      },
      {
        image: seeMore3,
        title: "السياحة المستدامة",
        description: "وجهات سياحية جديدة تتبنى مفاهيم الاستدامة البيئية في المنطقة..",
        time: "منذ ١٠ ساعات",
      },
    ],
    منوعات: [
      {
        image: seeMore1,
        title: "أحدث صيحات الموضة",
        description: "عروض الأزياء العالمية تكشف عن أحدث الصيحات لموسم الربيع والصيف..",
        time: "منذ ساعتين",
      },
      {
        image: seeMore2,
        title: "تكنولوجيا الفضاء",
        description: "دول عربية تطلق مشاريع طموحة لاستكشاف الفضاء خلال السنوات القادمة..",
        time: "منذ ٥ ساعات",
      },
      {
        image: seeMore3,
        title: "الرياضة الإلكترونية",
        description: "بطولات الرياضة الإلكترونية تشهد إقبالاً غير مسبوق من الشباب العربي..",
        time: "منذ ٨ ساعات",
      },
    ],
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[2rem] gap-y-[2rem]">
        {/* first column - Main News */}
        <div className="lg:col-span-9">
          {/* title with pagination arrows */}
          <TitleSection 
            title={data.title || i18next.t("news_wedget.latest_news")}
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-[0.5rem] gap-y-[2rem] mt-[1rem]"
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

        {/** second column - Most Viewed (no animations) */}
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-x-2 items-center mb-[0.9rem]">
            <h1 className="font-bold text-md text-negative">
              {i18next.t("news_wedget.most_view")}
            </h1>
            <div className="w-[15%] h-[0.1rem] bg-negative"></div>

            <button
              onClick={() => setActiveTab("ترند")}
              className={`font-bold text-md transition ${
                activeTab === "ترند"
                  ? "text-negative border-b-2 border-negative"
                  : "text-primary hover:text-negative"
              }`}
            >
              ترند
            </button>

            <div className="w-[15%] h-[0.1rem] bg-negative"></div>

            <button
              onClick={() => setActiveTab("منوعات")}
              className={`font-bold text-md transition ${
                activeTab === "منوعات"
                  ? "text-negative border-b-2 border-negative"
                  : "text-primary hover:text-negative"
              }`}
            >
              منوعات
            </button>
          </div>

          <MostViewedSection
            activeTab={activeTab}
            mostViewedData={mostViewedData}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default NewsModelOne;