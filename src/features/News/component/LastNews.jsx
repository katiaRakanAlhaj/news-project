import MostViewedSection from "../../../ui/MostViewedSection";

const LastNews = ({ latestNewsData }) => {
  // Function to format time difference
  const getTimeAgo = (dateString) => {
    if (!dateString) return "منذ ٤ ساعات";
    
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return "الآن";
    if (diffMins < 60) return `منذ ${diffMins} دقائق`;
    if (diffHours === 1) return "منذ ساعة";
    if (diffHours < 24) return `منذ ${diffHours} ساعات`;
    if (diffDays === 1) return "منذ يوم";
    if (diffDays < 30) return `منذ ${diffDays} أيام`;
    if (diffDays < 365) return `منذ ${Math.floor(diffDays / 30)} أشهر`;
    return `منذ ${Math.floor(diffDays / 365)} سنوات`;
  };

  // Transform API data to match MostViewedSection expected format
  const transformedData = latestNewsData?.data?.map((item) => ({
    image: item.news_image,
    title: item.news_title,
    description: item.news_description,
    time: getTimeAgo(item.date),
    id: item.id,
    category: item.category_id,
    date: item.date
  })) || [];

  return (
    <div>
      <div className="flex gap-x-2 items-center">
        <h1 className="text-negative font-bold text-md text-nowrap">
          اخر الاخبار
        </h1>
        <div className="bg-negative w-full h-[0.01rem]"></div>
      </div>
      <div className="mt-2">
        <MostViewedSection activeTab={null} mostViewedData={transformedData} />
      </div>
    </div>
  );
};

export default LastNews;