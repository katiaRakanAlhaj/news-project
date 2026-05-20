import i18next from "i18next";

const MostViewedSection = ({ activeTab, mostViewedData }) => {
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
    <div className="space-y-2">
      {displayData?.map((newsItem, newsIndex) => (
        <div
          key={newsIndex}
          className="flex flex-col sm:flex-row gap-3 group cursor-pointer hover:bg-gray-50 rounded-lg transition duration-200"
        >
          <img
            className="w-full sm:w-[5rem] h-[5rem] rounded-lg object-cover"
            src={newsItem.image}
            alt={newsItem.title}
          />
          <div className="flex-1 flex flex-col space-y-2">
            <h3 className="text-secondary font-bold text-sm line-clamp-2 group-hover:text-negative transition">
              {newsItem.title}
            </h3>
            <p className="text-xs text-[#121C2A] line-clamp-2">
              {newsItem.description}
            </p>
            <p className="text-xs text-[#6B7280]">{newsItem.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MostViewedSection;