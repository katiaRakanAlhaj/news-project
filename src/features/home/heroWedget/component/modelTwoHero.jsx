// src/features/home/heroWedget/component/modelTwoHero.js
import i18next from "i18next";

const ModelTwoHero = ({ data, dataKey = "data" }) => {
  // Handle different data structures
  let items = [];
  
  if (Array.isArray(data)) {
    items = data;
  } else if (data && data[dataKey] && Array.isArray(data[dataKey])) {
    items = data[dataKey];
  } else if (data && data.items && Array.isArray(data.items)) {
    items = data.items;
  }

  // Check if we have items
  if (!items || items.length === 0) {
    return null;
  }

  // Take first 3 items
  const firstColumnItem = items.slice(0, 1);
  const secondColumnItems = items.slice(1, 3);

  // Function to get category name - dynamic from API response
  const getCategoryName = (item) => {
    // If category object exists with name property
    if (item.category?.name) {
      return item.category.name;
    }

  };

  // Format the date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(i18next.language === 'ar' ? 'ar-EG' : 'en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container1 mx-auto h-auto">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[0.5rem] mt-[2.5rem] gap-y-[0.5rem]">
        {/* first column - single image */}
        <div className="lg:col-span-8 col-span-1">
          {firstColumnItem.map((item, index) => (
            <div
              key={item.id || index}
              className="relative w-full lg:h-[42rem] h-[20rem] overflow-hidden rounded-xl group cursor-pointer"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={item.news_image}
                alt={item.news_title}
              />
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.002), rgba(255, 255, 255, 0.002)), linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
                }}
              ></div>
              <div
                className={`absolute ${i18next.language == "ar" ? "right-[2rem]" : "left-[2rem]"} bottom-[2rem] pointer-events-none`}
              >
                <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
                  <p className="text-white font-[700] text-md mt-1">
                    {getCategoryName(item)}
                  </p>
                </div>
                <p className="text-2xl font-bold text-white w-[100%] leading-relaxed mt-4">
                  {item.news_title}
                </p>
                <p className="text-[#FFFFFF] text-md mt-3 opacity-70">
                  {formatDate(item.date)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* second column - 2 images stacked vertically */}
        <div className="lg:col-span-4 col-span-1 flex flex-col gap-y-[0.5rem]">
          {secondColumnItems.map((item, index) => (
            <div
              style={{ boxShadow: "0px 20px 25px -5px #0000001A" }}
              key={item.id || index}
              className="relative w-full lg:h-[20.8rem] h-[20rem] overflow-hidden rounded-xl group cursor-pointer"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={item.news_image}
                alt={item.news_title}
              />
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.002), rgba(255, 255, 255, 0.002)), linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
                }}
              ></div>
              <div className={`absolute ${i18next.language === 'ar' ? 'right-[1.5rem]' : 'left-[1.5rem]'} bottom-[1.5rem] pointer-events-none`}>
                <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
                  <p className="text-white font-[700] text-md mt-1">
                    {getCategoryName(item)}
                  </p>
                </div>
                <p className="text-lg font-bold text-white w-full leading-relaxed mt-4">
                  {item.news_title}
                </p>
                <p className="text-[#FFFFFF] text-md mt-2 opacity-70">
                  {formatDate(item.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelTwoHero;