import i18next from "i18next";
import TitleSection from "../../../../ui/titleSection";
import MostViewedSection from "../../../../ui/MostViewedSection";

const NewsModelThree = ({ data }) => {
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

  // Format time difference (for "منذ ٤ ساعات" style)
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "منذ أقل من ساعة";
    if (diffInHours === 1) return "منذ ساعة";
    if (diffInHours < 24) return `منذ ${diffInHours} ساعات`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "منذ يوم";
    return `منذ ${diffInDays} أيام`;
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
  
  // Map API news items to the format needed for the component
  const newsData = newsItems.map((item, index) => ({
    id: item.id,
    image: item.news_image,
    type: item.category?.name || "عام",
    title: item.news_title,
    description: item.news_description || "لا يوجد وصف متاح",
    time: formatTimeAgo(item.date),
    date: formatDate(item.date),
  }));

  // Don't render if no data
  if (!data || !newsItems.length) {
    return null;
  }

  // Get first item for main column
  const mainNewsItem = newsData[0];
  
  // Get remaining items for Most Viewed section (from index 1 onwards)
  const remainingItems = newsData.slice(1);

  // If no main item, don't render
  if (!mainNewsItem) {
    return null;
  }

  return (
    <div className="container1 mx-auto mt-[2rem] px-4">
      <TitleSection title={data.title || i18next.t("news_wedget.latest_news")} />

      <div className="grid lg:grid-cols-12 grid-cols-1 gap-[1rem] mt-[1rem]">
        {/* First column - Main News col-span-9 */}
        <div className="lg:col-span-9 col-span-1">
          <div className="relative">
            <img
              src={mainNewsItem.image}
              className="w-full h-[22.5rem] rounded-lg object-cover"
              alt={mainNewsItem.title}
            />
            <div className={`absolute bottom-[2rem] ${i18next.language == "ar" ? 'right-[2rem]' : 'left-[2rem]'}`}>
              <button className="w-[4rem] h-[1.6rem] bg-secondary rounded-full text-white text-xs">
                {mainNewsItem.type}
              </button>
              <h1 className="font-bold text-white text-md mt-3">
                {mainNewsItem.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Second column - Most Viewed col-span-3 */}
        <div className="lg:col-span-3 col-span-1">
          {/* Passing remaining items to MostViewedSection */}
          <MostViewedSection mostViewedData={remainingItems} />
        </div>
      </div>
    </div>
  );
};

export default NewsModelThree;