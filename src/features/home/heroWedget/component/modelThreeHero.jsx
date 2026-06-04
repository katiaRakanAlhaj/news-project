import i18next from "i18next";

const ModelThreeHero = ({ data }) => {
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

  // Split items: first item in first column, remaining items (4) in second column as 2x2 grid
  const firstColumnItem = data.items.slice(0, 1); // First item only
  const secondColumnItems = data.items.slice(1, 5); // Next 4 items

  return (
    <div className="container1 mx-auto h-auto">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[0.5rem] gap-y-[0.5rem] mt-[1rem]">
        {/* first column - single image (col-span-5) */}
        <div className="lg:col-span-5 col-span-1">
          {firstColumnItem.map((item, index) => (
            <div
              key={item.id || index}
              className="relative w-full lg:h-[33rem] h-[20rem] overflow-hidden rounded-xl group cursor-pointer"
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
                <p className="text-md font-bold text-white w-full leading-relaxed mt-4">
                  {item.news_title}
                </p>
                <p className="text-[#FFFFFF] text-xs mt-2 opacity-70">
                  {formatDate(item.date)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* second column - 4 images in 2x2 grid (col-span-7) */}
        <div className="lg:col-span-7 col-span-1">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-[0.5rem]">
            {secondColumnItems.map((item, index) => (
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
    </div>
  );
};

export default ModelThreeHero;