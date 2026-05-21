import TitleSection from "../../../../ui/titleSection";
import NewsCard from "../../../../ui/newsCard";
import i18next from "i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

// Import images
import newsImage1 from "../../../../assets/images/newsImage1.png";
import newsImage2 from "../../../../assets/images/newsImage2.png";
import newsImage3 from "../../../../assets/images/newsImage3.png";
import newsImage4 from "../../../../assets/images/newsImage4.png";
import newsImage5 from "../../../../assets/images/newsImage1.png";
import newsImage6 from "../../../../assets/images/newsImage2.png";

const NewsModelTwo = () => {
  const newsData = [
    {
      id: 1,
      image: newsImage1,
      title: "إنهاء الأعمال العدائية ضد إيران.. رسالة ترمب تفجر جدلا بواشنطن",
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026، متجاوزة المتوسط العالمي، في دلالة على تحسن بيئة الأعمال وتعزيز الانفتاح الاقتصادي في المنطقة..",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
      type: "سياسة",
    },
    {
      id: 2,
      image: newsImage2,
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026، متجاوزة المتوسط العالمي، في دلالة على تحسن بيئة الأعمال وتعزيز الانفتاح الاقتصادي في المنطقة..",

      title: "شهيدان في غزة وتحذيرات من انهيار القطاع الصحي",
      date: "الخميس، 18 مايو 2024",
      views: "2.5k",
      type: "سياسة",
    },
    {
      id: 3,
      image: newsImage3,
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026، متجاوزة المتوسط العالمي، في دلالة على تحسن بيئة الأعمال وتعزيز الانفتاح الاقتصادي في المنطقة..",

      title:
        "أكبر شركة شحن بالعالم تطلق خطا ملاحيا بين أوروبا والشرق الأوسط عبر السعودية",
      date: "الخميس، 18 مايو 2024",
      views: "3.7k",
      type: "اقتصاد",
    },
    {
      id: 4,
      image: newsImage4,
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026، متجاوزة المتوسط العالمي، في دلالة على تحسن بيئة الأعمال وتعزيز الانفتاح الاقتصادي في المنطقة..",

      title: "دول الخليج تتجاوز المتوسط العالمي في مؤشر الحرية الاقتصادية 2026",
      date: "الخميس، 18 مايو 2024",
      views: "1.8k",
      type: "اقتصاد",
    },
    {
      id: 5,
      image: newsImage5,
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026، متجاوزة المتوسط العالمي، في دلالة على تحسن بيئة الأعمال وتعزيز الانفتاح الاقتصادي في المنطقة..",

      title: "الذكاء الاصطناعي يحدث ثورة في مجال التعليم",
      date: "الجمعة، 19 مايو 2024",
      views: "4.2k",
      type: "تكنولوجيا",
    },
    {
      id: 6,
      image: newsImage6,
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026، متجاوزة المتوسط العالمي، في دلالة على تحسن بيئة الأعمال وتعزيز الانفتاح الاقتصادي في المنطقة..",
      title: "السياحة المستدامة تفتح آفاق جديدة في المنطقة",
      date: "الجمعة، 19 مايو 2024",
      views: "2.3k",
      type: "سياحة",
    },
  ];

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <TitleSection title={"سياسة"} />

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
