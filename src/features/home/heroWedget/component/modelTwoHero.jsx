// src/features/home/heroWedget/component/modelTwoHero.js
import i18next from "i18next";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/dateUtils";

// Reusable Inner Card Component
const NewsCard = ({ item, currentLang, variant }) => {
  const isLarge = variant === "large";

  // Configuration sets depending on layout variation
  const cardHeight = isLarge ? "lg:h-[42rem] h-[20rem]" : "lg:h-[20.8rem] h-[20rem]";
  const shadowStyle = isLarge ? {} : { boxShadow: "0px 20px 25px -5px #0000001A" };
  
  // RTL positioning adjustments
  const textPosition = isLarge
    ? `absolute ${i18next.language === "ar" ? "right-[2rem]" : "left-[2rem]"} bottom-[2rem]`
    : `absolute ${i18next.language === "ar" ? "lg:right-[1.5rem] right-[1rem]" : "lg:left-[1.5rem] left-[1rem]"} bottom-[1.5rem]`;

  const titleClasses = isLarge
    ? "lg:text-2xl md:text-xl text-md font-bold text-white w-[100%] leading-relaxed mt-4"
    : "text-lg font-bold text-white w-full leading-relaxed mt-4";

  return (
    <Link to={`/${currentLang}/News/${item.id}`} className="w-full">
      <div
        style={shadowStyle}
        className={`relative w-full ${cardHeight} overflow-hidden rounded-xl group cursor-pointer`}
      >
        {/* News Image */}
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={item.news_image}
          alt={item.news_title}
        />
        
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, 0.002), rgba(255, 255, 255, 0.002)), linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />

        {/* Content Details */}
        <div className={`${textPosition} pointer-events-none`}>
          {/* Category Pill */}
          <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-secondary rounded-full">
            <p className="text-white font-[700] text-md mt-1">
              {item.category?.name || "عام"}
            </p>
          </div>

          {/* Title */}
          <p className={titleClasses}>
            {item.news_title}
          </p>

          {/* Date Label */}
          <p className={`text-[#FFFFFF] text-md opacity-70 ${isLarge ? "mt-3" : "mt-2"}`}>
            {formatDate(item.date, currentLang)}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Main Component
const ModelTwoHero = ({ data, dataKey = "data", currentLang }) => {
  // Normalize and catch varying dynamic API data shapes safely
  let items = [];
  if (Array.isArray(data)) {
    items = data;
  } else if (data?.[dataKey] && Array.isArray(data[dataKey])) {
    items = data[dataKey];
  } else if (data?.items && Array.isArray(data.items)) {
    items = data.items;
  }

  // Fallback early exit if arrays are missing or empty
  if (!items || items.length === 0) {
    return null;
  }

  // Segment items into grid structure slots
  const firstColumnItems = items.slice(0, 1);
  const secondColumnItems = items.slice(1, 3);

  return (
    <div className="container1 mx-auto h-auto">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[0.5rem] mt-[2.5rem] gap-y-[0.5rem]">
        
        {/* First Column - Main Hero Spotlight */}
        <div className="lg:col-span-8 col-span-1">
          {firstColumnItems.map((item, index) => (
            <NewsCard 
              key={item.id || index}
              item={item} 
              currentLang={currentLang} 
              variant="large" 
            />
          ))}
        </div>

        {/* Second Column - Sidebar Pair Layout */}
        <div className="lg:col-span-4 col-span-1 flex flex-col gap-y-[0.5rem]">
          {secondColumnItems.map((item, index) => (
            <NewsCard 
              key={item.id || index}
              item={item} 
              currentLang={currentLang} 
              variant="small" 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ModelTwoHero;