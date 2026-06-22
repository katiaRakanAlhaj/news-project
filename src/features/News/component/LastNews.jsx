import { useState } from "react";
import MostViewedSection from "../../../ui/MostViewedSection";
import { formatTimeAgo } from "../../../utils/dateUtils";

// If you use translation files like the second component, import i18next
import i18next from "i18next"; 

const LastNews = ({ latestNewsData, currentLang }) => {
  // Track whether the news section is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // 1. Transform all available data first
  const allTransformedData = latestNewsData?.data?.map((item) => ({
    image: item.news_image,
    title: item.news_title,
    description: item.news_description,
    time: formatTimeAgo(item.date, currentLang),
    id: item.id,
    category: item.category_id,
    date: item.date
  })) || [];

  // 2. Slice the data dynamically based on the state (4 items initially)
  const visibleData = isExpanded 
    ? allTransformedData 
    : allTransformedData.slice(0, 4);

  return (
    <div>
      <div className="flex gap-x-2 items-center">
        <h1 className="text-negative font-bold text-md text-nowrap">
          {i18next.t("Latest News")}
        </h1>
        <div className="bg-negative w-full h-[0.01rem]"></div>
      </div>
      
      <div className="mt-2">
        <MostViewedSection 
          currentLang={currentLang} 
          activeTab={null} 
          mostViewedData={visibleData} 
        />
      </div>

      {/* 3. Render the See More/See Less button conditionally if total items > 4 */}
      {allTransformedData.length > 4 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2 text-sm font-bold bg-negative text-white rounded shadow hover:bg-opacity-90 transition duration-200"
          >
            {isExpanded 
              ? (i18next.t("buttons.see_less") || "عرض أقل") 
              : (i18next.t("buttons.see_more") || "عرض المزيد")
            }
          </button>
        </div>
      )}
    </div>
  );
};

export default LastNews;