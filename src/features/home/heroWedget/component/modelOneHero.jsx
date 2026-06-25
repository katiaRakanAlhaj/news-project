// ModelOneHero.jsx
import i18next from "i18next";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/dateUtils";

// Reusable News Card Component
const NewsCard = ({ item, currentLang, variant }) => {
  const isFirstCol = variant === "large";

  // Dynamic styles based on which column it lives in
  const cardHeight = isFirstCol ? "lg:h-[42rem] h-[20rem]" : "lg:h-[20.8rem] h-[20rem]";
  const shadowStyle = isFirstCol ? {} : { boxShadow: "0px 20px 25px -5px #0000001A" };
  
  const textPosition = isFirstCol
    ? `absolute ${i18next.language === "ar" ? "lg:right-[2rem] right-[1rem]" : "lg:left-[2rem] left-[1rem]"} bottom-[2rem]`
    : "absolute right-[1.5rem] bottom-[1.5rem] left-[1rem]";

  const titleClasses = isFirstCol
    ? "lg:text-2xl md:text-xl text-md font-bold text-white lg:w-[90%] leading-relaxed mt-4"
    : "text-lg font-bold text-white w-full leading-relaxed mt-4";

  return (
    <Link to={`/${currentLang}/News/${item.id}`} className="w-full">
      <div
        style={shadowStyle}
        className={`relative w-full ${cardHeight} overflow-hidden rounded-xl group cursor-pointer`}
      >
        {/* Background Image */}
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

        {/* Content Wrapper */}
        <div className={`${textPosition} pointer-events-none`}>
          {/* Category Tag */}
          <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-secondary rounded-full">
            <p className="text-white font-bold text-md mt-1">
              {item.category?.name || "عام"}
            </p>
          </div>

          {/* Title */}
          <p className={titleClasses}>
            {item.news_title}
          </p>

          {/* Date */}
          <p className={`text-[#FFFFFF] text-md opacity-70 ${isFirstCol ? "mt-3" : "mt-2"}`}>
            {formatDate(item.date, currentLang)}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Main Component
const ModelOneHero = ({ data, currentLang }) => {
  // Early return if no valid data
  if (!data?.items || data.items.length === 0) return null;

  const firstColumnItems = data.items.slice(0, 2);
  const secondColumnItems = data.items.slice(2, 4);

  return (
    <div className="container1 mx-auto h-auto">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[0.5rem] mt-[2.5rem]">
        
        {/* First Column (Large Grid/Cards) */}
        <div className="lg:col-span-8 col-span-1">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-[0.5rem] gap-y-[0.5rem]">
            {firstColumnItems.map((item, index) => (
              <NewsCard 
                key={item.id || index} 
                item={item} 
                currentLang={currentLang} 
                variant="large" 
              />
            ))}
          </div>
        </div>

        {/* Second Column (Small Stacked Cards) */}
        <div className="lg:col-span-4 col-span-1 flex flex-col gap-y-[0.5rem] lg:mt-0 mt-[0.5rem]">
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

export default ModelOneHero;