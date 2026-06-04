// ModelOneHero.jsx
import i18next from "i18next";

const ModelOneHero = ({ data }) => {
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

  // Split items into two columns (first 2 items in first column, next 2 in second column)
  const firstColumnItems = data.items.slice(0, 2);
  const secondColumnItems = data.items.slice(2, 4);

  return (
    <div className="container1 mx-auto h-auto">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[0.5rem] mt-[1rem]">
        {/* first column */}
        <div className="lg:col-span-8 col-span-1">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-[0.5rem] gap-y-[0.5rem]">
            {firstColumnItems.map((item, index) => (
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
                <div
                  className={`absolute ${i18next.language == "ar" ? "right-[2rem]" : "left-[2rem]"} bottom-[2rem] pointer-events-none`}
                >
                  <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
                    <p className="text-white font-[400] text-sm mt-1">
                      {item.category?.name || "عام"}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-white w-[90%] leading-relaxed mt-4">
                    {item.news_title}
                  </p>
                  <p className="text-[#FFFFFF] text-xs mt-3 opacity-70">
                    {formatDate(item.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* second column */}
        <div className="lg:col-span-4 col-span-1 flex flex-col gap-y-[0.5rem] lg:mt-0 mt-[0.5rem]">
          {secondColumnItems.map((item, index) => (
            <div
              style={{ boxShadow: "0px 20px 25px -5px #0000001A" }}
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
      </div>
    </div>
  );
};

export default ModelOneHero;