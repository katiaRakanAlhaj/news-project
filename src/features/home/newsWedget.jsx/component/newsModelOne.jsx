import i18next from "i18next";
import { useState } from "react";
import newsImage1 from "../../../../assets/images/newsImage1.png";
import newsImage2 from "../../../../assets/images/newsImage2.png";
import newsImage3 from "../../../../assets/images/newsImage3.png";
import newsImage4 from "../../../../assets/images/newsImage4.png";
import seeMore1 from "../../../../assets/images/seeMore1.png";
import seeMore2 from "../../../../assets/images/seeMore2.png";
import seeMore3 from "../../../../assets/images/seeMore3.png";
import NewsCard from "../../../../ui/newsCard";
import MostViewedSection from "../../../../ui/MostViewedSection";
import TitleSection from "../../../../ui/titleSection";

const NewsModelOne = () => {
  const [activeTab, setActiveTab] = useState("ترند");

  const news = [
    {
      image: newsImage1,
      title: "إنهاء الأعمال العدائية ضد إيران.. رسالة ترمب تفجر جدلا بواشنطن",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
      type: "سياسة",
    },
    {
      image: newsImage2,
      title: "شهيدان في غزة وتحذيرات من انهيار القطاع الصحي",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
      type: "سياسة",
    },
    {
      image: newsImage3,
      title:
        "أكبر شركة شحن بالعالم تطلق خطا ملاحيا بين أوروبا والشرق الأوسط عبر السعودية",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
      type: "اقتصاد",
    },
    {
      image: newsImage4,
      title: "دول الخليج تتجاوز المتوسط العالمي في مؤشر الحرية الاقتصادية 2026",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
      type: "اقتصاد",
    },
  ];

  const mostViewedData = {
    ترند: [
      {
        image: seeMore1,
        title: "الاستدامة في التصميم الداخلي",
        description:
          "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
        time: "منذ ٤ ساعات",
      },
      {
        image: seeMore2,
        title: "الذكاء الاصطناعي في الصحافة",
        description:
          "تقنيات الذكاء الاصطناعي تُحدث ثورة في مجال الإعلام والصحافة الرقمية..",
        time: "منذ ٦ ساعات",
      },
      {
        image: seeMore3,
        title: "السياحة المستدامة",
        description:
          "وجهات سياحية جديدة تتبنى مفاهيم الاستدامة البيئية في المنطقة..",
        time: "منذ ١٠ ساعات",
      },
        {
        image: seeMore1,
        title: "السياحة المستدامة",
        description:
          "وجهات سياحية جديدة تتبنى مفاهيم الاستدامة البيئية في المنطقة..",
        time: "منذ ١٠ ساعات",
      },
        {
        image: seeMore2,
        title: "السياحة المستدامة",
        description:
          "وجهات سياحية جديدة تتبنى مفاهيم الاستدامة البيئية في المنطقة..",
        time: "منذ ١٠ ساعات",
      },
    ],
    منوعات: [
      {
        image: seeMore1,
        title: "أحدث صيحات الموضة",
        description:
          "عروض الأزياء العالمية تكشف عن أحدث الصيحات لموسم الربيع والصيف..",
        time: "منذ ساعتين",
      },
      {
        image: seeMore2,
        title: "تكنولوجيا الفضاء",
        description:
          "دول عربية تطلق مشاريع طموحة لاستكشاف الفضاء خلال السنوات القادمة..",
        time: "منذ ٥ ساعات",
      },
      {
        image: seeMore3,
        title: "الرياضة الإلكترونية",
        description:
          "بطولات الرياضة الإلكترونية تشهد إقبالاً غير مسبوق من الشباب العربي..",
        time: "منذ ٨ ساعات",
      },
    ],
  };

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[2rem] gap-y-[2rem]">
        {/* first column - Main News */}
        <div className="lg:col-span-9">
          {/* title */}
          <TitleSection title={i18next.t("news_wedget.latest_news")} />

          {/* grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[0.5rem] gap-y-[2rem] mt-[1rem]">
            {news.map((item, index) => (
              <NewsCard
                key={index}
                image={item.image}
                title={item.title}
                date={item.date}
                views={item.views}
                type={item.type}
              />
            ))}
          </div>
        </div>

        {/** second column - Most Viewed */}
        <div className="lg:col-span-3">
          {/* title and tabs */}
          <div className="flex flex-wrap gap-x-2 items-center mb-[0.9rem]">
            <h1 className="font-bold text-md text-negative">
              {i18next.t("news_wedget.most_view")}
            </h1>
            <div className="w-[15%] h-[0.1rem] bg-negative"></div>

            {/* Tab buttons */}
            <button
              onClick={() => setActiveTab("ترند")}
              className={`font-bold text-md transition ${
                activeTab === "ترند"
                  ? "text-negative border-b-2 border-negative"
                  : "text-primary hover:text-negative"
              }`}
            >
              ترند
            </button>

            <div className="w-[15%] h-[0.1rem] bg-negative"></div>

            <button
              onClick={() => setActiveTab("منوعات")}
              className={`font-bold text-md transition ${
                activeTab === "منوعات"
                  ? "text-negative border-b-2 border-negative"
                  : "text-primary hover:text-negative"
              }`}
            >
              منوعات
            </button>
          </div>

          {/* Cards only - Most Viewed Content */}
          <MostViewedSection
            activeTab={activeTab}
            mostViewedData={mostViewedData}
          />
        </div>
      </div>
    </div>
  );
};
export default NewsModelOne;
