import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TitleSection from "../../../../ui/titleSection";
import i18next from "i18next";

const NewsModelFour = ({ data }) => {
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
  
  // Map API news items to the format needed for the component
  const news = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    type: item.category?.name || "عام",
    title: item.news_title,
    date: formatDate(item.date),
    views: formatViews(item.views || Math.floor(Math.random() * 5000)), // Random views if not provided
  }));

  // Don't render if no data
  if (!data || !newsItems.length) {
    return null;
  }

  return (
    <div className="mt-8 w-full">
      <div className="container1 mx-auto mb-[1rem]">
        <TitleSection title={data.title || i18next.t("news_wedget.latest_news")} />
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        spaceBetween={10}
        slidesPerView={6.3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
          },
          640: {
            slidesPerView: 2.3,
          },
          768: {
            slidesPerView: 4.3,
          },
          1024: {
            slidesPerView: 6.3,
          },
        }}
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-[24rem] overflow-hidden rounded-md group cursor-pointer">
              <div className={`absolute top-2 ${i18next.language == "ar" ? 'right-2' : 'left-2'} z-10`}>
                <span className="inline-block bg-[#005BBF] text-xs px-2 py-1 rounded-full text-white">
                  {item.type}
                </span>
              </div>

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="text-sm leading-5 font-bold line-clamp-3">
                  {item.title}
                </h3>

                <div className="flex justify-between mt-2 text-[10px] text-gray-300">
                  <span>{item.date}</span>
                  <span>{item.views}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsModelFour;