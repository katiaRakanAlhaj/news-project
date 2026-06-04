import TitleSection from "../../../../ui/titleSection";
import NewsCard from "../../../../ui/newsCard";
import i18next from "i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const NewsModelTwo = ({ data }) => {
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
  const newsData = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    title: item.news_title,
    description: item.news_description || "لا يوجد وصف متاح",
    date: formatDate(item.date),
    views: "1.2k", // Default value if not provided by API
    type: item.category?.name || "عام",
  }));

  // Don't render if no data
  if (!data || !newsItems.length) {
    return null;
  }

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <TitleSection title={data.title || i18next.t("news_wedget.latest_news")} />

      <div className="mt-[1rem] relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          style={{ paddingBottom: "3rem" }}
          className="news-slider"
        >
          {newsData.map((item) => (
            <SwiperSlide key={item.id} className="px-2">
              <NewsCard
                description={item.description}
                image={item.image}
                title={item.title}
                date={item.date}
                views={item.views}
                type={item.type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          width: 0.7rem !important;
          height: 0.7rem !important;
          background: #CBD5E1 !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          background: #DC2626 !important;
          border-radius: 6px !important;
        }
        
        /* Remove margin between slides */
        .swiper-slide {
          height: auto !important;
        }
      `}</style>
    </div>
  );
};

export default NewsModelTwo;