import i18next from "i18next";
import NewsCard from "../../../../ui/newsCard";
import TitleSection from "../../../../ui/titleSection";
import { useState } from "react";
import AdvertisementSpace from "../../../../assets/images/AdvertisementSpace.png";

const NewsModelFive = ({ data }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);

  // Format date function
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

  // Format views count (e.g., 1200 -> 1.2k)
  const formatViews = (views) => {
    if (!views) return "0";
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + "k";
    }
    return views.toString();
  };

  // Get items from API (handle pagination structure)
  const getItemsArray = (items) => {
    if (Array.isArray(items)) {
      return items;
    }
    if (items && items.data && Array.isArray(items.data)) {
      return items.data;
    }
    return [];
  };

  // Extract news items from API data
  const newsItems = getItemsArray(data?.items || []);
  
  // Map API news items to the format expected by NewsCard
  const news = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    title: item.news_title,
    date: formatDate(item.date),
    views: formatViews(item.views || Math.floor(Math.random() * 5000)),
    type: item.category?.name || "عام",
  }));

  // Survey options (static for now - could come from API)
  const surveyOptions = [
    { id: 1, label: "يسير في الطريق الصحيح", value: "correct" },
    { id: 2, label: "يحتاج للمزيد من الوقت", value: "more_time" },
    { id: 3, label: "لا يزال في بداياته", value: "beginning" },
  ];

  const handleChoiceChange = (value) => {
    setSelectedChoice(value);
  };

  const handleVote = () => {
    if (selectedChoice) {
      // Handle vote submission here
      console.log("Voted for:", selectedChoice);
      // You can make an API call to submit the vote
    }
  };

  // Don't render if no data
  if (!data || !newsItems.length) {
    return null;
  }

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-[2rem]">
        {/* first column - News */}
        <div className="lg:col-span-9 col-span-1">
          <TitleSection title={data.title || "أحدث الأخبار"} />
          <div className="grid md:grid-cols-2 gap-y-[2rem] gap-x-[0.5rem] mt-[1rem]">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                image={item.image}
                title={item.title}
                date={item.date}
                views={item.views}
                type={item.type}
              />
            ))}
          </div>
        </div>

        {/* second column - Survey and Advertisement */}
        <div className="lg:col-span-3 col-span-1">
          {/* Survey Section */}
          <div
            style={{ boxShadow: "0px 1px 2px 0px #0000000D" }}
            className="w-full h-auto px-[1.5rem] py-[1rem] rounded-lg bg-white border border-[#C1C6D6]"
          >
            <h1 className="text-secondary text-sm mt-1">استبيان</h1>
            <p className="text-secondary text-sm mt-4 font-bold">
              ما هو رأيك في التحول الرقمي الحالي في المنطقة؟
            </p>

            <div className="mt-4 space-y-3">
              {surveyOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="survey"
                    value={option.value}
                    checked={selectedChoice === option.value}
                    onChange={() => handleChoiceChange(option.value)}
                    className="w-3 h-3 border border-[#C1C6D6] text-secondary focus:ring-secondary cursor-pointer"
                  />
                  <span className="text-secondary text-xs">{option.label}</span>
                </label>
              ))}
            </div>
            <button 
              onClick={handleVote}
              className="w-full h-[2.5rem] mt-4 rounded-lg bg-secondary text-sm font-bold text-white hover:bg-secondary/90 transition"
            >
              {i18next.t("news_wedget.vote_now")}
            </button>
          </div>
          
          {/* Advertisement Space */}
          <div className="w-full h-[14rem] relative bg-[#E5E7EB] border border-dashed border-gray-300 mt-[1.5rem] rounded-lg">
            <img
              src={AdvertisementSpace}
              className="h-[10rem] w-full object-cover mt-[2rem]"
              alt="Advertisement"
            />
            <p className="text-nowrap absolute left-1/4 ml-[3rem] text-[#9CA3AF] text-xs top-1/2">
              مساحة إعلانية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModelFive;