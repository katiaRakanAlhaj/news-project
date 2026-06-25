import i18next from "i18next";
import { Link } from "react-router-dom"; // Add this import

const MostViewedSection = ({ activeTab, mostViewedData, currentLang }) => { // Add currentLang prop
  // Check if mostViewedData has tabs (object with ترند/منوعات) or is a direct array
  const getDisplayData = () => {
    if (Array.isArray(mostViewedData)) {
      // Direct array - no tabs
      return mostViewedData;
    } else if (activeTab && mostViewedData[activeTab]) {
      // Has tabs - use activeTab
      return mostViewedData[activeTab];
    }
    return [];
  };

  const displayData = getDisplayData();

  return (
    <div className="space-y-[1rem]">
      {displayData?.map((newsItem, newsIndex) => (
        <Link 
          key={newsIndex}
          to={`/${currentLang}/News/${newsItem.id}`}
          className="block"
        >
          <div className="flex flex-col sm:flex-row gap-x-6 group cursor-pointer rounded-lg">
            <img
              className="w-full sm:w-[8rem] md:h-[7.75rem] h-[16rem] rounded-lg object-cover"
              src={newsItem.image}
              alt={newsItem.title}
            />
            <div className="flex-1 flex flex-col space-y-2">
              <h3 className="text-primary lg:mt-0 mt-[1rem] font-bold text-md line-clamp-1 group-hover:text-negative transition">
                {newsItem.title}
              </h3>
              <p className="text-md text-primary line-clamp-2">
                {newsItem.description}
              </p>
              <p className="text-sm text-[#6B7280]">{newsItem.time}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MostViewedSection;