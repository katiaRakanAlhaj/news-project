// ModelThreeHero.jsx
import i18next from "i18next";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/dateUtils";

// Reusable News Card Component
const NewsCard = ({ item, currentLang, variant }) => {
  const isLarge = variant === "large";

  // Dynamic values depending on variant layout
  const cardHeight = isLarge ? "lg:h-[42rem] h-[20rem]" : "lg:h-[20.8rem] h-[20rem]";
  
  const textPosition = isLarge
    ? `absolute ${i18next.language === "ar" ? "lg:right-[2rem] right-[1rem]" : "lg:left-[2rem] left-[1rem]"} bottom-[1.5rem]`
    : "absolute right-[1.5rem] bottom-[1.5rem] left-[1rem]";

  const titleClasses = isLarge
    ? "lg:text-2xl md:text-xl text-md font-bold text-white w-full leading-relaxed mt-4"
    : "text-lg font-bold text-white w-full leading-relaxed mt-4";

  return (
    <Link to={`/${currentLang}/News/${item.id}`} className="w-full">
      <div className={`relative w-full ${cardHeight} overflow-hidden rounded-xl group cursor-pointer`}>
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

        {/* Info Box Wrapper */}
        <div className={`${textPosition} pointer-events-none`}>
          {/* Category Pill */}
          <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
            <p className="text-white font-[700] text-md mt-1">
              {item.category?.name || "عام"}
            </p>
          </div>

          {/* Title */}
          <p className={titleClasses}>
            {item.news_title}
          </p>

          {/* Date Stamp */}
          <p className="text-[#FFFFFF] text-md mt-2 opacity-70">
            {formatDate(item.date, currentLang)}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Main Component
const ModelThreeHero = ({ data, currentLang }) => {
  // Gracefully handle empty or invalid data patterns
  if (!data?.items || data.items.length === 0) return null;

  // Split items: 1 element to the main spot, 4 elements to the side grid panel
  const firstColumnItem = data.items.slice(0, 1);
  const secondColumnItems = data.items.slice(1, 5);

  return (
    <div className="container1 mx-auto h-auto">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[0.5rem] gap-y-[0.5rem] mt-[2.5rem]">
        
        {/* First Column - Single Main Focus Area (lg:col-span-5) */}
        <div className="lg:col-span-5 col-span-1">
          {firstColumnItem.map((item, index) => (
            <NewsCard 
              key={item.id || index} 
              item={item} 
              currentLang={currentLang} 
              variant="large" 
            />
          ))}
        </div>

        {/* Second Column - 2x2 Supplementary News Grid (lg:col-span-7) */}
        <div className="lg:col-span-7 col-span-1">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-[0.5rem]">
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
    </div>
  );
};

export default ModelThreeHero;