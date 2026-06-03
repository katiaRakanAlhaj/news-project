import TitleSection from "../../../../ui/titleSection";
import NewsCard from "../../../../ui/newsCard";
import i18next from "i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import newsImage12 from "../../../../assets/images/newsImage12.png";
import newsImage13 from "../../../../assets/images/newsImage13.png";
import newsImage14 from "../../../../assets/images/newsImage14.png";
import arrow1 from "../../../../assets/images/arrow1.svg";
import arrow2 from "../../../../assets/images/arrow2.svg";
import { useRef, useState, useEffect } from "react";

const NewsModelNine = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const newsData = [
    {
      id: 1,
      image: newsImage12,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
    },
    {
      id: 2,
      image: newsImage13,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
    },
    {
      id: 3,
      image: newsImage14,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
    },
    {
      id: 4,
      image: newsImage12,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
    },
    {
      id: 5,
      image: newsImage13,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
    },
    {
      id: 6,
      image: newsImage14,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
    },
  ];

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // Update button states when swiper changes
  const updateNavButtons = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <TitleSection title={"تقارير"} />

      <div className="mt-[1rem] relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavButtons();
          }}
          onSlideChange={updateNavButtons}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
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
          className="news-slider"
        >
          {newsData.map((item) => (
            <SwiperSlide key={item.id} className="px-2">
              <div className="relative w-full h-[18rem] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 51.55%, #000000 100%)",
                  }}
                ></div>
                <div
                  className={`absolute ${i18next.language == "ar" ? "right-[1rem] " : "left-[1rem] "} bottom-[1rem]`}
                >
                  <h1 className="text-white font-bold text-md">{item.title}</h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center items-center mt-[1rem] gap-x-2">
          <div
            onClick={handlePrev}
            className={`w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full transition ${
              isBeginning
                ? "bg-[#E0E0E0] cursor-not-allowed opacity-50"
                : "bg-[#D9D9D9] cursor-pointer hover:bg-gray-400"
            }`}
          >
            <img
              className={`w-[0.6rem] ${i18next.language == "ar" ? "" : "rotate-180"}`}
              src={arrow1}
              alt="previous"
            />
          </div>
          <div
            onClick={handleNext}
            className={`w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center transition ${
              isEnd
                ? "bg-[#E0E0E0] cursor-not-allowed opacity-50"
                : "bg-[#D9D9D9] cursor-pointer hover:bg-gray-400"
            }`}
          >
            <img className={`w-[0.6rem] ${i18next.language == "ar"?'':'rotate-180'}`} src={arrow2} alt="next" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModelNine;
