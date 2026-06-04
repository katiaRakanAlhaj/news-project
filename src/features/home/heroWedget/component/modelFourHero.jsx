import i18next from "i18next";

const ModelFourHero = ({ data }) => {
  // Check if data exists and has items
  if (!data || !data.items || data.items.length === 0) {
    return null; // or return a loading/empty state
  }

  // Format the date function
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

  // Split items: first 2 items in first row, next 4 items in second row
  const firstRowItems = data.items.slice(0, 2); // First 2 images
  const secondRowItems = data.items.slice(2, 6); // Next 4 images

  return (
    <div className="container1 mx-auto h-auto">
      <div className="grid grid-cols-1 gap-[0.5rem] mt-[1rem]">
        {/* First row - 2 images */}
        <div className="grid md:grid-cols-2 gap-[0.5rem]">
          {firstRowItems.map((item, index) => (
            <div
              key={item.id || index}
              className="relative w-full lg:h-[16.25rem] h-[20rem] overflow-hidden rounded-xl group cursor-pointer"
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
              <div className="absolute right-[1rem] bottom-[1rem] left-[1rem] pointer-events-none">
                <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
                  <p className="text-white font-[400] text-sm mt-1">
                    {item.category?.name || "عام"}
                  </p>
                </div>
                <p className="text-sm font-bold text-white w-full leading-relaxed mt-4">
                  {item.news_title}
                </p>
                <p className="text-[#FFFFFF] text-xs mt-2 opacity-70">
                  {formatDate(item.date)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Second row - 4 images */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[0.5rem]">
          {secondRowItems.map((item, index) => (
            <div
              key={item.id || index}
              className="relative w-full lg:h-[16.25rem] h-[20rem] overflow-hidden rounded-xl group cursor-pointer"
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
              <div className="absolute right-[1rem] bottom-[1rem] left-[1rem] pointer-events-none">
                <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
                  <p className="text-white font-[400] text-sm mt-1">
                    {item.category?.name || "عام"}
                  </p>
                </div>
                <p className="text-sm font-bold text-white w-full leading-relaxed mt-4">
                  {item.news_title}
                </p>
                <p className="text-[#FFFFFF] text-xs mt-2 opacity-70">
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

export default ModelFourHero;