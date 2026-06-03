import newsImage1 from "../../../../assets/images/newsImage1.png";
import newsImage2 from "../../../../assets/images/newsImage2.png";
import newsImage3 from "../../../../assets/images/newsImage3.png";
import newsImage4 from "../../../../assets/images/newsImage4.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import TitleSection from "../../../../ui/titleSection";
import i18next from "i18next";

const NewsModelFour = () => {
  const news = [
    {
      image: newsImage1,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage2,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage3,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage4,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage1,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage2,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage3,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage4,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
  ];

  return (
    <div className="mt-8 w-full">
      <div className="container1 mx-auto mb-[1rem]">
        <TitleSection title="سياسة" />
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
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[24rem] overflow-hidden rounded-md group cursor-pointer">
              <div className={`absolute top-2 ${i18next.language == "ar"?'right-2':'left-2'} z-10`}>
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